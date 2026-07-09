// ============================================================================
//  PoC realtime на ЧИСТИХ WebSocket
//  ----------------------------------------------------------------------------
//  Мета: показати, що під капотом немає магії. Тут лише:
//    1) звичайний HTTP-сервер, який віддає index.html
//    2) WebSocket-сервер (бібліотека `ws`) — єдина залежність
//    3) in-memory "store" у ролі бази даних
//
//  Модель гри:
//    - у гравця B і гравця C — СВОЯ таблиця; редагувати її може лише власник
//    - є СПІЛЬНА таблиця подій — туди пишуть обидва гравці
//    - ВЕДУЧИЙ (host) нічого не редагує: бачить усі три таблиці,
//      з атрибуцією "змінив гравець X" і підсвіткою "що змінилось з візиту"
//
//  Три задачі, які доводить цей PoC:
//    (A) жива трансляція  — гравець змінив → ведучий бачить за мить
//    (B) персист          — стан живе у store і переживає reconnect
//    (C) diff-від-візиту  — поле підсвічене, поки ведучий не натисне "переглянуто"
// ============================================================================

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { WebSocketServer } from 'ws';

const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ----------------------------------------------------------------------------
//  STORE — роль "бази даних". Живе в пам'яті процесу, тому переживає
//  reconnect клієнтів: сокет розірвався — стан тут лишився.
//  У фінальній версії сюди стане Postgres + Drizzle, логіка не зміниться.
// ----------------------------------------------------------------------------

// Фабрика поля: значення + коли і ким востаннє змінене (для атрибуції та diff).
const field = (value) => ({ value, updatedAt: 0, updatedBy: null });

const store = {
  // Таблиці гравців. owner — хто має право редагувати.
  tables: {
    B: {
      owner: 'B',
      title: 'Бланк гравця B',
      fields: {
        cash: field(10000), // готівка
        income: field(0), // дохід / місяць
        expenses: field(0), // видатки / місяць
        freeFunds: field(0), // вільні кошти
      },
    },
    C: {
      owner: 'C',
      title: 'Бланк гравця C',
      fields: {
        cash: field(10000),
        income: field(0),
        expenses: field(0),
        freeFunds: field(0),
      },
    },
    // Спільна таблиця подій: owner === null означає "редагують усі гравці".
    shared: {
      owner: null,
      title: 'Спільні події (news)',
      events: [], // { text, by, at }
    },
  },
  // Коли ведучий востаннє "переглянув" кожну таблицю (для diff-підсвітки).
  hostLastSeen: { B: 0, C: 0, shared: 0 },
};

// ----------------------------------------------------------------------------
//  КІМНАТА. У реальному застосунку ключ — sessionId, і кімнат багато.
//  Для PoC одна кімната: тримаємо множину активних з'єднань.
// ----------------------------------------------------------------------------
const clients = new Set(); // кожен елемент: { ws, role, playerId }

const now = () => Date.now();

// Надіслати одному клієнту
function send(ws, msg) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
}

// Розіслати всім у кімнаті (це і є "broadcast" — серце realtime)
function broadcast(msg) {
  const data = JSON.stringify(msg);
  for (const c of clients) {
    if (c.ws.readyState === c.ws.OPEN) c.ws.send(data);
  }
}

// Хто зараз онлайн — для presence
function presence() {
  const online = [...clients].map((c) =>
    c.role === 'host' ? 'Ведучий' : `Гравець ${c.playerId}`,
  );
  broadcast({ type: 'presence', online });
}

// Повний знімок стану — віддаємо при підключенні/reconnect.
// Саме завдяки цьому "нічого не губиться": клієнт малює правду зі store.
function snapshot(ws) {
  send(ws, { type: 'snapshot', tables: store.tables, hostLastSeen: store.hostLastSeen });
}

// ----------------------------------------------------------------------------
//  HTTP-сервер: віддає статичний index.html
// ----------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  try {
    const html = await readFile(path.join(__dirname, 'public', 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch {
    res.writeHead(500);
    res.end('index.html не знайдено');
  }
});

// ----------------------------------------------------------------------------
//  WebSocket-сервер: чіпляється на той самий HTTP-сервер
// ----------------------------------------------------------------------------
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  // Клієнт ще не представився — поки без ролі.
  const client = { ws, role: null, playerId: null };
  clients.add(client);

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    // --- JOIN: клієнт каже, хто він (host / player B / player C) ---
    if (msg.type === 'join') {
      client.role = msg.role; // 'host' | 'player'
      client.playerId = msg.playerId ?? null; // 'B' | 'C' | null
      snapshot(ws); // одразу віддаємо повний стан
      presence();
      return;
    }

    // --- UPDATE: гравець змінив поле у СВОЇЙ таблиці ---
    if (msg.type === 'update') {
      const table = store.tables[msg.tableId];
      if (!table || table.owner === null) return;

      // ENFORCEMENT прав на запис: лише власник таблиці.
      if (client.role !== 'player' || client.playerId !== table.owner) {
        send(ws, { type: 'error', message: `Тільки гравець ${table.owner} може це редагувати` });
        return;
      }

      const f = table.fields[msg.field];
      if (!f) return;

      // (B) Персист: записали у store
      f.value = Number(msg.value) || 0;
      f.updatedAt = now();
      f.updatedBy = table.owner;

      // (A) Жива трансляція: розіслали всім патч зі змінами
      broadcast({
        type: 'patch',
        tableId: msg.tableId,
        field: msg.field,
        value: f.value,
        updatedAt: f.updatedAt,
        updatedBy: f.updatedBy,
      });
      return;
    }

    // --- ADD EVENT: гравець додав подію у СПІЛЬНУ таблицю ---
    if (msg.type === 'addEvent') {
      if (client.role !== 'player') return; // події спавнять гравці
      const event = { text: String(msg.text).slice(0, 120), by: client.playerId, at: now() };
      store.tables.shared.events.push(event);
      broadcast({ type: 'event', event });
      return;
    }

    // --- MARK SEEN: ведучий натиснув "переглянуто" по таблиці ---
    if (msg.type === 'markSeen') {
      if (client.role !== 'host') return;
      store.hostLastSeen[msg.tableId] = now();
      // Повідомляємо ведучого, від якого моменту рахувати "нове".
      send(ws, { type: 'seen', tableId: msg.tableId, at: store.hostLastSeen[msg.tableId] });
      return;
    }
  });

  ws.on('close', () => {
    clients.delete(client);
    presence();
  });
});

server.listen(PORT, () => {
  console.log(`\n  PoC realtime запущено:  http://localhost:${PORT}\n`);
  console.log('  Відкрий у 3 вкладках:');
  console.log(`    Ведучий →  http://localhost:${PORT}/?role=host`);
  console.log(`    Гравець B → http://localhost:${PORT}/?role=player&id=B`);
  console.log(`    Гравець C → http://localhost:${PORT}/?role=player&id=C\n`);
});

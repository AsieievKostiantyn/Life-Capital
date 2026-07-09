## Commands

```bash
npm run dev        # start dev server
npm run build      # type-check + build for production
```

## Architecture

React 19 + TypeScript + Vite SPA. Backend is Supabase (auth, Postgres, realtime).

### Layered modular architecture

Four layers, strictly ordered — upper layers consume lower ones, never the reverse:

```
app        ← providers, global config, router
pages      ← UI composition only; no business logic
features   ← domain modules (logic, types, API, stores, components per entity)
shared     ← cross-cutting utilities, constants, UI primitives, Supabase client
```

**Import rules:**
- `shared` — no imports from other layers
- `features` — imports from `shared` only; cross-feature imports are a smell
- `pages` — imports from `features` and `shared`
- `app` — may import from all layers

**Path aliases**:
- `@/app` → `src/app`
- `@/features` → `src/features`
- `@/pages` → `src/pages`
- `@/shared` → `src/shared`
- `@/static` → `src/static`

### UI

Mantine v8 (dark theme by default) + Tailwind CSS v4.

### Supabase

Migrations, edge functions and all supabase stuff are in `supabase/`.

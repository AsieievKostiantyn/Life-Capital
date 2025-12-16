import { corsHeaders } from '../_shared/cors.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';

export const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { hostId, sessionName, participantIds } = await req.json();

    if (!hostId || !sessionName || !Array.isArray(participantIds)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { data: session, error: sessionErr } = await supabaseAdmin
      .from('game_sessions')
      .insert({
        host_id: hostId,
        session_name: sessionName,
      })
      .select()
      .single();

    if (sessionErr) {
      console.error(sessionErr);
      return new Response(JSON.stringify({ error: sessionErr.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const { error: deckStateError } = await supabaseAdmin.rpc(
      'init_deck_state_for_session',
      {
        p_game_session_id: session.id,
      }
    );

    if (deckStateError) {
      console.error(deckStateError);
      return new Response(JSON.stringify({ error: deckStateError.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const rows = participantIds.map((id: string) => ({
      user_id: id,
      game_session_id: session.id,
    }));

    const { data: gameSessionPlayers, error: playersErr } = await supabaseAdmin
      .from('game_session_users')
      .insert(rows)
      .select();

    if (playersErr || !gameSessionPlayers) {
      console.error(playersErr);
      return new Response(JSON.stringify({ error: playersErr.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const playerStateRows = gameSessionPlayers
      .filter((row) => row.user_id !== hostId)
      .map((row) => ({
        game_session_users_id: row.id,
      }));

    const { error: playerStatesError } = await supabaseAdmin
      .from('player_state')
      .insert(playerStateRows);

    if (playerStatesError) {
      console.error(playerStatesError);
      return new Response(
        JSON.stringify({ error: playerStatesError.message }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

Deno.serve(handler);

// Gintaras push: sends one new message (from gintaras_notes) to every phone that player turned notifications on for.
// Called by the database when a message is added. Each message is sent once: it is marked "pushed" before sending,
// so calling this again (or by anyone else) does nothing. Phones that have switched notifications off are removed.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
let ready = false;

async function setup() {
  if (ready) return;
  const { data, error } = await sb.rpc("gintaras_vapid");
  if (error || !data?.public || !data?.private) throw new Error("Notification keys missing: " + (error?.message ?? ""));
  webpush.setVapidDetails("https://n00bin.github.io/gintaras/", data.public, data.private);
  ready = true;
}

Deno.serve(async (req) => {
  try {
    const { note_id } = await req.json();
    await setup();
    const { data: note } = await sb.from("gintaras_notes").update({ pushed: true })
      .eq("id", note_id).eq("pushed", false).select().maybeSingle();
    if (!note) return new Response("already sent");
    const { data: subs } = await sb.from("gintaras_push_subs").select("*").eq("user_id", note.user_id);
    const payload = JSON.stringify({ title: note.title, body: note.body, tag: note.kind, id: note.id });
    let sent = 0;
    await Promise.all((subs ?? []).map(async (s) => {
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { TTL: 6 * 3600 });
        sent++;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) await sb.from("gintaras_push_subs").delete().eq("endpoint", s.endpoint);
      }
    }));
    return new Response("sent to " + sent);
  } catch (e) {
    return new Response(String(e), { status: 500 });
  }
});

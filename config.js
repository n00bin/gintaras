// Supabase project for accounts and the leaderboard (tables are named gintaras_*).
// The publishable key is safe to publish: it only allows what the database policies allow.
window.GINTARAS_CONFIG = {
  SUPABASE_URL: "https://jwafxaaaadojafquvhrw.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_6o-DhCADvScV1OfXqR5Seg_d2sdOrHB",
  GOOGLE_CLIENT_ID: "871724296247-b1km904n6fdqkk8f8eok0a2u6ueirta0.apps.googleusercontent.com",
  GOOGLE: true, // Google sign-in (Google Cloud project "gintaras-512908", client "Gintaras web")
  // Google Cloud Translation key for the face-to-face translator. Restricted to n00bin.github.io and the
  // Translation API, with a daily cap inside the free tier. Empty = use the free MyMemory service.
  GOOGLE_TRANSLATE_KEY: "",
};

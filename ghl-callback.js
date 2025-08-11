export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code");

  const params = new URLSearchParams({
    client_id: process.env.GHL_CLIENT_ID,
    client_secret: process.env.GHL_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: "https://app.e3events.io/api/ghl-callback"
  });

  const r = await fetch("https://services.leadconnectorhq.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await r.json();
  if (!r.ok) return res.status(r.status).json(data);

  // For a quick demo we just show the tokens on screen.
  // In production you would store refresh_token etc.
  return res.status(200).json({ message: "Connected!", tokens: data });
}

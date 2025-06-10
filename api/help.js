// /api/help.js
export default function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket?.remoteAddress ||
    'unknown';

  res.status(200).send(`도움 IP: ${ip}`);
}

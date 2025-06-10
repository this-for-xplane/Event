export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  console.log(`${new Date().toISOString()} - 도움 IP: ${ip}`);
  res.status(200).send('옛다 도움 투척!');
}

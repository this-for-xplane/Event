import fs from 'fs/promises';

const LOG_FILE = './help.log';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const log = `${new Date().toISOString()} - 도움 IP: ${ip}\n`;

  try {
    await fs.appendFile(LOG_FILE, log);
    res.status(200).send('기록 완료');
  } catch (e) {
    console.error(e);
    res.status(500).send('기록 실패');
  }
}

// /api/help.js
import fs from 'fs/promises';
import path from 'path';

const LOG_FILE = path.resolve('./help.json');

export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const time = new Date().toISOString();
  const agent = req.headers['user-agent'] || 'unknown';

  try {
    let logs = [];
    try {
      const raw = await fs.readFile(LOG_FILE, 'utf8');
      logs = JSON.parse(raw);
    } catch (err) {
      // 파일이 없거나 JSON 파싱 실패하면 무시하고 빈 배열 유지
    }

    logs.push({ time, ip, agent });

    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
    res.status(200).send('도움 요청 기록됨!');
  } catch (e) {
    console.error(e);
    res.status(500).send('기록 실패');
  }
}

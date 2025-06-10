import fs from 'fs/promises';

const LOG_FILE = './help.log';
const ADMIN_PASSWORD = '내비번123'; // 원하는 비번으로 바꾸기

export default async function handler(req, res) {
  const pass = req.headers['x-admin-pass'];
  if (pass !== ADMIN_PASSWORD) {
    return res.status(403).send('권한 없음');
  }

  try {
    const data = await fs.readFile(LOG_FILE, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('로그 읽기 실패');
  }
}

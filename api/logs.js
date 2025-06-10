// /api/logs.js

import fs from 'fs/promises';

const LOG_FILE = './help.log';
const ADMIN_PASSWORD = '1234'; // 원하는 비밀번호

export default async function handler(req, res) {
  const pass = req.headers['x-admin-pass']; // 헤더에서 비번 추출

  // 비번 확인
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

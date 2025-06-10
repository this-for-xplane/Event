import fs from 'fs/promises';

const LOG_FILE = './help.log'; // 기존 로그 파일 경로
const ADMIN_PASSWORD = '1234'; // 원하는 비밀번호

export default async function handler(req, res) {
  const pass = req.headers['x-admin-pass']; // 헤더에서 비밀번호 추출

  if (pass !== ADMIN_PASSWORD) {
    return res.status(403).send('권한 없음');
  }

  try {
    const raw = await fs.readFile(LOG_FILE, 'utf8');

    // 로그 파일이 JSON 형식이라 가정 (아니면 아래 파싱 수정 필요)
    let logs;
    try {
      logs = JSON.parse(raw);
    } catch {
      // JSON 파싱 실패 시 그냥 원본 텍스트 그대로 보여줌
      logs = null;
    }

    if (logs && Array.isArray(logs)) {
      // JSON 배열이면 포맷팅해서 출력
      const formatted = logs
        .map(log => `[${log.time}] IP: ${log.ip} / UA: ${log.agent}`)
        .reverse() // 최근 로그 먼저
        .join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(formatted);
    } else {
      // JSON 배열 아니면 그냥 원본 텍스트 전달
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(raw);
    }

  } catch (e) {
    console.error(e);
    res.status(500).send('로그 읽기 실패');
  }
}

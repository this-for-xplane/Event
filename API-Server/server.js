const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

const LOG_FILE = 'help.log';

app.get('/help', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const log = `${new Date().toISOString()} - 도움 주는 사람 IP: ${ip}\n`;
  fs.appendFile(LOG_FILE, log, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('기록 실패');
    }
    res.send('도움 기록 완료');
  });
});

app.get('/logs', (req, res) => {
  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('로그 읽기 실패');
    }
    res.type('text/plain').send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API 서버 실행 중 http://localhost:${PORT}`);
});

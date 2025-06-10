const helpBtn = document.getElementById('helpBtn');
const message = document.getElementById('message');
const devBtn = document.getElementById('devBtn');
const adminPanel = document.getElementById('adminPanel');
const adminPass = document.getElementById('adminPass');
const loginBtn = document.getElementById('loginBtn');
const logArea = document.getElementById('logArea');

const API_BASE = 'https://내서버주소';  // 실제 API 서버 주소로 변경
const ADMIN_PASSWORD = '비번1234';       // 원하는 비밀번호로 변경

helpBtn.addEventListener('click', async () => {
  message.textContent = '기록 중... 잠시만요!';
  try {
    const res = await fetch(`${API_BASE}/help`);
    if (!res.ok) throw new Error('서버 오류');
    const text = await res.text();
    alert('옛다 도움 투척!');
    message.textContent = '도움 고마워요! 이제 자유롭게 나가도 됩니다.';
  } catch (e) {
    message.textContent = '오류 발생! 다시 시도해 주세요.';
    console.error(e);
  }
});

devBtn.addEventListener('click', () => {
  if (adminPanel.classList.contains('hidden')) {
    adminPanel.classList.remove('hidden');
  } else {
    adminPanel.classList.add('hidden');
    adminPass.value = '';
    logArea.textContent = '';
  }
});

loginBtn.addEventListener('click', async () => {
  if (adminPass.value !== ADMIN_PASSWORD) {
    alert('비밀번호가 틀렸습니다!');
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/logs`);
    if (!res.ok) throw new Error('로그 조회 실패');
    const logs = await res.text();
    logArea.textContent = logs;
  } catch (e) {
    alert('로그 불러오기 실패');
    console.error(e);
  }
});

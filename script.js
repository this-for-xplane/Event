const helpBtn = document.getElementById('helpBtn');
const message = document.getElementById('message');
const devBtn = document.getElementById('devBtn');
const adminPanel = document.getElementById('adminPanel');
const adminPass = document.getElementById('adminPass');
const loginBtn = document.getElementById('loginBtn');
const logArea = document.getElementById('logArea');

const API_BASE = 'https://event-eight-zeta.vercel.app';  // 실제 배포된 API 주소
const ADMIN_PASSWORD = '1234';  // 관리자 비밀번호

// 도움 요청 버튼
helpBtn.addEventListener('click', async () => {
  message.textContent = '기록 중...';
  try {
    const res = await fetch(`${API_BASE}/help`);
    if (!res.ok) throw new Error('서버 오류');
    const text = await res.text();
    alert('옛다 도움 투척!');
    message.textContent = '기록되었습니다. 이제 나가도 됩니다.';
  } catch (e) {
    message.textContent = '오류 발생, 다시 시도해 주세요.';
    console.error(e);
  }
});

// 개발자 모드 버튼 (패널 열기/닫기)
devBtn.addEventListener('click', () => {
  if (adminPanel.classList.contains('hidden')) {
    adminPanel.classList.remove('hidden');
  } else {
    adminPanel.classList.add('hidden');
    adminPass.value = '';
    logArea.textContent = '';
  }
});

// 로그인 및 로그 불러오기
loginBtn.addEventListener('click', async () => {
  if (adminPass.value !== ADMIN_PASSWORD) {
    alert('비밀번호 틀림');
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/logs`, {
      headers: {
        'x-admin-pass': ADMIN_PASSWORD
      }
    });
    if (!res.ok) throw new Error('로그 조회 실패');
    const logs = await res.text();
    logArea.textContent = logs;
  } catch (e) {
    alert('로그 불러오기 실패');
    console.error(e);
  }
});

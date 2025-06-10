// DOM이 완전히 로드된 후 실행되도록 함
document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.getElementById('help-btn');

  if (!helpButton) {
    console.error('help-btn 버튼을 찾을 수 없습니다.');
    return;
  }

  helpButton.addEventListener('click', () => {
    fetch('/api/help') // 또는 '/help' - rewrite 설정 여부에 따라
      .then(response => {
        if (!response.ok) throw new Error('응답이 실패했습니다.');
        return response.text();
      })
      .then(text => {
        alert(text); // 서버에서 받은 "도움 IP: ..." 메시지 표시
      })
      .catch(err => {
        console.error('요청 중 오류 발생:', err);
        alert('문제 발생'); // 사용자에게 보여줄 메시지
      });
  });
});

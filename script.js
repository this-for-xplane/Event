document.getElementById('help-btn').addEventListener('click', () => {
  fetch('/api/help')  // 또는 /help (rewrite 확실할 때)
    .then(response => {
      if (!response.ok) throw new Error();
      return response.text();
    })
    .then(text => alert(text))
    .catch(err => {
      console.error(err);
      alert('문제 발생');
    });
});


// 메시지 관련 기능
function copyToClipboard(elementId) {
  const textarea = document.getElementById(elementId);
  textarea.select();
  document.execCommand('copy');
  alert('메시지가 클립보드에 복사되었습니다!');
}

function saveMessage(elementId) {
  const textarea = document.getElementById(elementId);
  const message = textarea.value;
  localStorage.setItem(elementId, message);
  alert('저장되었습니다!');
}

// 페이지 로드 시 저장된 메시지 불러오기
window.addEventListener('DOMContentLoaded', function() {
  const bossMessage = localStorage.getItem('bossMessage');
  const teamMessage = localStorage.getItem('teamMessage');
  
  if (bossMessage) {
    document.getElementById('bossMessage').value = bossMessage;
  }
  
  if (teamMessage) {
    document.getElementById('teamMessage').value = teamMessage;
  }
});


const guideTopics = [
  {
    id: 'pad-usage',
    title: '생리대 사용법',
    content: '1. 패키지에서 생리대를 꺼내세요. 2. 뒷면의 접착 테이프를 떼어내세요. 3. 속옷의 가운데에 부착하세요.',
    image: 'images/guide1.jpg'
  },
  // Add other topics similarly
];

document.addEventListener('DOMContentLoaded', function() {
  const topicList = document.getElementById('guideTopicList');
  const cardContainer = document.getElementById('cardContainer');
  
  // 주제 목록 렌더링
  guideTopics.forEach(topic => {
    const topicElement = document.createElement('div');
    topicElement.className = 'guide-topic-item';
    topicElement.onclick = () => showTopicContent(topic.id);
    topicElement.innerHTML = `
      <div class="guide-topic-content">
        <div class="guide-topic-title">${topic.title}</div>
      </div>
    `;
    topicList.appendChild(topicElement);
  });

  // 뒤로 가기 버튼 이벤트
  document.getElementById('backToTopics').addEventListener('click', () => {
    topicList.style.display = 'flex';
    cardContainer.style.display = 'none';
    document.querySelector('.card-navigation').style.display = 'none';
  });
});

function showTopicContent(topicId) {
  const topic = guideTopics.find(t => t.id === topicId);
  if (!topic) return;

  const topicList = document.getElementById('guideTopicList');
  const cardContainer = document.getElementById('cardContainer');
  
  topicList.style.display = 'none';
  cardContainer.style.display = 'block';
  cardContainer.innerHTML = `
    <div class="card">
      <h3 class="card-title">${topic.title}</h3>
      <img src="${topic.image}" alt="${topic.title}" class="card-image">
      <p class="card-content">${topic.content}</p>
    </div>
  `;
  
  document.querySelector('.card-navigation').style.display = 'flex';
}

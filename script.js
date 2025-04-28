// 페이지 전환 함수
function showPage(pageId) {
  // 모든 페이지 숨기기
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // 선택한 페이지만 표시
  document.getElementById(pageId).classList.add('active');

  // 페이지별 초기화
  if (pageId === 'painkillers') {
    // 통증 수준 기본값을 1로 설정
    painSlider.value = 1;
    painValue.textContent = 1;
    showMedicineResult(1);
  } else if (pageId === 'guide') {
    initCards();
  } else if (pageId === 'workplace') {
    // 저장된 메시지 불러오기
    loadSavedMessages();
  }
}

// 생리통약 관련 기능
document.addEventListener('DOMContentLoaded', function() {
  // 요소 가져오기 
  const painSlider = document.getElementById('painSlider');
  const painLevel = document.getElementById('painLevel');
  const sliderProgress = document.querySelector('.slider-progress');
  const recommendationTitle = document.querySelector('.recommendation-title');
  const recommendationList = document.querySelector('.recommendation-list');
  const actionButton = document.querySelector('.action-button');
  
  // 설명을 리스트 내에 저장 
  const painLevels = [
    { // Level 0
      title: "통증 없음 (단계 0/10)",
      symptoms: [
        "• 특별한 통증이 없어요",
        "• 평소와 같은 컨디션이에요",
        "• 약을 복용할 필요가 없어요"
      ]
    },
    { // Level 1-3
      title: "약한 통증 (단계 1-3/10)",
      symptoms: [
        "• 허리가 약간 뻐근해요",
        "• 배가 살짝 콕콕거려요",
        "• 일상생활에 지장은 없어요",
        "• 간혹 피곤함을 느껴요"
      ]
    },
    { // Level 4-6
      title: "중간 통증 (단계 4-6/10)",
      symptoms: [
        "• 허리가 뻐근해요",
        "• 배가 살짝 콕콕거려요",
        "• 일상생활이 약간 불편해요",
        "• 피로감이 느껴져요",
        "• 진통제가 필요할 수 있어요"
      ]
    },
    { // Level 7-10
      title: "심한 통증 (단계 7-10/10)",
      symptoms: [
        "• 허리와 아랫배가 매우 아파요",
        "• 움직이기 어려워요",
        "• 일상생활이 힘들어요",
        "• 메스꺼움이나 구토가 있을 수 있어요",
        "• 처방된 진통제가 필요해요"
      ]
    }
  ];

  // 텍스트 업데이트 
  function updateRecommendation(value) {
    //값 가져오기 
    painLevel.textContent = value;

    // Progress 업데이트 
    const percentage = (value / 10) * 100;
    sliderProgress.style.width = `${percentage}%`; 

    // 카테고리 바꾸기 
    let levelIndex;
    if (value == 0) {
      levelIndex = 0;
    } else if (value >= 1 && value <= 3) {
      levelIndex = 1;
    } else if (value >= 4 && value <= 6) {
      levelIndex = 2;
    } else {
      levelIndex = 3;
    }

    // 텍스트 바꾸기 
    const level = painLevels[levelIndex];
    recommendationTitle.innerHTML = level.title.replace(/단계\s\d+(-\d+)?\/10/, `단계 <span id="painLevel">${value}</span>/10`);
  
    //리스트 값 변경
    recommendationList.innerHTML = '';
    level.symptoms.forEach(symptom => {
      const li = document.createElement('li');
      li.textContent = symptom;
      recommendationList.appendChild(li);
    });
  }

  //슬라이더 값 업데이트 
  updateRecommendation(painSlider.value);

  // 이벤트 리스너 추가
  painSlider.addEventListener('input', function() {
    updateRecommendation(this.value);
  });

  actionButton.addEventListener('click', function() {
    const painValue = parseInt(painSlider.value);
    let message;

    if (painValue === 0) {
      message = "통증이 없어서 다행이네요! 약이 필요하지 않습니다.";
    } else if (painValue >= 1 && painValue <= 3) {
      message = "약한 통증이군요. 따뜻한 물을 마시고 쉬는 것이 좋습니다. 필요하다면 이부프로펜이나 아세트아미노펜과 같은 약한 진통제가 도움이 될 수 있어요.";
    } else if (painValue >= 4 && painValue <= 6) {
      message = "중간 정도의 통증이네요. 이부프로펜(예: 애드빌)이나 나프록센(예: 알레브)과, 같은 비스테로이드성 항염증제(NSAIDs)가 효과적일 수 있습니다. 따뜻한 찜질도 도움이 됩니다.";
    } else {
      message = "심한 통증을 겪고 계시는군요. 처방된 강한 진통제나 복합 진통제가 필요할 수 있습니다. 증상이 지속되면 의사와 상담하는 것이 좋습니다.";
    }

    alert(message);
  });
});

// 메시지 관련 기능
function copyToClipboard(elementId) {
  const textarea = document.getElementById(elementId);
  textarea.select();
  document.execCommand('copy');

  // 복사 성공 알림
  alert('메시지가 클립보드에 복사되었습니다!');
}

function editMessage(elementId) {
  const textarea = document.getElementById(elementId);
  textarea.focus();
}

function saveMessage(elementId) {
  const textarea = document.getElementById(elementId);
  const message = textarea.value;
  
  // 해당 ID의 메시지를 localStorage에 저장
  localStorage.setItem(elementId, message);
  
  // 저장 완료 알림 (alert 형식으로 변경)
  alert('저장되었습니다!');
}

function loadSavedMessages() {
  // 각 텍스트 영역에 저장된 메시지 로드
  const bossMessage = localStorage.getItem('bossMessage');
  const teamMessage = localStorage.getItem('teamMessage');
  
  if (bossMessage) {
    document.getElementById('bossMessage').value = bossMessage;
  }
  
  if (teamMessage) {
    document.getElementById('teamMessage').value = teamMessage;
  }
}

// 생리대 추천 관련 기능
function showPadRecommendation(type) {
  const resultContainer = document.getElementById('padResult');
  let recommendation = '';
  let hashtags = '';

  switch(type) {
    case 'absorption':
      hashtags = '<span class="hashtag">#직접 써봤어요!</span> <span class="hashtag">#흡수량</span>';
      recommendation = `
        <h3>${hashtags}</h3>
        <div class="product-list">
          <div class="product-item">
            <span class="product-name">01. 화이트 울트라 슬림 오버나이트</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 85%; background-color: #4e97ff;"></div>
            </div>
            <span class="percentage" style="background-color: #4e97ff;">85%</span>
          </div>
          <div class="product-item">
            <span class="product-name">02. 내추럴 코튼 울트라 롱</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 72%; background-color: #4ecbff;"></div>
            </div>
            <span class="percentage" style="background-color: #4ecbff;">72%</span>
          </div>
          <div class="product-item">
            <span class="product-name">03. 쏘피 한결 수퍼롱</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 65%; background-color: #aa86ff;"></div>
            </div>
            <span class="percentage" style="background-color: #aa86ff;">65%</span>
          </div>
          <div class="product-item">
            <span class="product-name">04. 릴리안 오버나이트</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 60%; background-color: #ff9e6d;"></div>
            </div>
            <span class="percentage" style="background-color: #ff9e6d;">60%</span>
          </div>
        </div>
      `;
      break;
    case 'smell':
      hashtags = '<span class="hashtag">#직접 써봤어요!</span> <span class="hashtag">#냄새</span>';
      recommendation = `
        <h3>${hashtags}</h3>
        <div class="product-list">
          <div class="product-item">
            <span class="product-name">01. 화이트 탈취 기능성</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 88%; background-color: #4e97ff;"></div>
            </div>
            <span class="percentage" style="background-color: #4e97ff;">88%</span>
          </div>
          <div class="product-item">
            <span class="product-name">02. 유기농 순면 생리대</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 75%; background-color: #4ecbff;"></div>
            </div>
            <span class="percentage" style="background-color: #4ecbff;">75%</span>
          </div>
          <div class="product-item">
            <span class="product-name">03. 허브 코튼 오버나이트</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 62%; background-color: #aa86ff;"></div>
            </div>
            <span class="percentage" style="background-color: #aa86ff;">62%</span>
          </div>
          <div class="product-item">
            <span class="product-name">04. 라네이처 소취 기능</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 54%; background-color: #ff9e6d;"></div>
            </div>
            <span class="percentage" style="background-color: #ff9e6d;">54%</span>
          </div>
        </div>
      `;
      break;
    case 'comfort':
      hashtags = '<span class="hashtag">#직접 써봤어요!</span> <span class="hashtag">#착용감</span>';
      recommendation = `
        <h3>${hashtags}</h3>
        <div class="product-list">
          <div class="product-item">
            <span class="product-name">01. 유기농 순면 소프트</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 92%; background-color: #4e97ff;"></div>
            </div>
            <span class="percentage" style="background-color: #4e97ff;">92%</span>
          </div>
          <div class="product-item">
            <span class="product-name">02. 쏘피 실크 초슬림</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 78%; background-color: #4ecbff;"></div>
            </div>
            <span class="percentage" style="background-color: #4ecbff;">78%</span>
          </div>
          <div class="product-item">
            <span class="product-name">03. 내추럴 코튼 에어핏</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 71%; background-color: #aa86ff;"></div>
            </div>
            <span class="percentage" style="background-color: #aa86ff;">71%</span>
          </div>
          <div class="product-item">
            <span class="product-name">04. 좋은느낌 에어슬림</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 65%; background-color: #ff9e6d;"></div>
            </div>
            <span class="percentage" style="background-color: #ff9e6d;">65%</span>
          </div>
        </div>
      `;
      break;
    case 'size':
      hashtags = '<span class="hashtag">#직접 써봤어요!</span> <span class="hashtag">#사이즈</span>';
      recommendation = `
        <h3>${hashtags}</h3>
        <div class="product-list">
          <div class="product-item">
            <span class="product-name">01. 대형 오버나이트 롱패드</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 90%; background-color: #4e97ff;"></div>
            </div>
            <span class="percentage" style="background-color: #4e97ff;">90%</span>
          </div>
          <div class="product-item">
            <span class="product-name">02. 중형 데이타임 패드</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 82%; background-color: #4ecbff;"></div>
            </div>
            <span class="percentage" style="background-color: #4ecbff;">82%</span>
          </div>
          <div class="product-item">
            <span class="product-name">03. 소형 라이너</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 75%; background-color: #aa86ff;"></div>
            </div>
            <span class="percentage" style="background-color: #aa86ff;">75%</span>
          </div>
          <div class="product-item">
            <span class="product-name">04. 탐폰 레귤러</span>
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: 58%; background-color: #ff9e6d;"></div>
            </div>
            <span class="percentage" style="background-color: #ff9e6d;">58%</span>
          </div>
        </div>
      `;
      break;
  }

  resultContainer.innerHTML = recommendation;
  resultContainer.style.display = 'block';
}

// 초경 전/남자들을 위한 기본 백서 관련 기능
const guideTopics = [
  {
    id: 'pad-usage',
    title: '생리대 사용법',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/4379/4379428.png',
    content: '1. 패키지에서 생리대를 꺼내세요. 2. 뒷면의 접착 테이프를 떼어내세요. 3. 속옷의 가운데에 부착하세요. 4. 날개가 있다면 속옷 아래로 접어 고정하세요. 5. 3-4시간마다 교체하는 것이 좋습니다.',
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'pad-types',
    title: '생리대 종류',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/4379/4379428.png',
    content: '생리대에는 다양한 종류가 있습니다: 일반 생리대, 오버나이트 패드(밤용), 팬티라이너(얇은 생리대), 탐폰(체내 삽입형), 생리컵 등이 있습니다. 자신의 몸과 상황에 맞는 제품을 선택하는 것이 중요합니다.',
    image: 'https://images.unsplash.com/photo-1628935750028-13d0f1dc8424?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'brands',
    title: '무난한 브랜드',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png',
    content: '처음 사용하는 경우 좋은느낌, 쏘피, 화이트와 같은 대중적인 브랜드가 좋습니다. 특히 피부가 민감한 경우에는 순면 제품이나 유기농 제품을 고려해보세요.',
    image: 'https://images.unsplash.com/photo-1628935750028-13d0f1dc8424?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'emergency',
    title: '급하게 필요할 때?',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
    content: '갑자기 생리가 시작되었을 때: 1. 화장실 휴지를 접어서 임시로 사용하세요. 2. 주변 편의점, 약국에서 구매하세요. 3. 여성 화장실의 자판기를 이용하세요. 4. 여성 동료나 선생님께 도움을 요청하세요.',
    image: 'https://images.unsplash.com/photo-1577460551100-d3f84b6e4bf7?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'pms',
    title: '생리전 증후군(PMS)',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/4320/4320377.png',
    content: '생리 시작 7-10일 전부터 나타나는 신체적, 정서적 증상으로 복통, 두통, 피로감, 짜증, 우울감 등이 있습니다. 규칙적인 운동, 충분한 수면, 균형 잡힌 식단이 증상 완화에 도움이 됩니다.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'period-duration',
    title: '생리는 일주일?',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/3588/3588614.png',
    content: '일반적으로 생리 기간은 3-7일 정도이며, 주기는 21-35일이 정상 범위입니다. 그러나 개인차가 있으므로 자신의 주기를 파악하는 것이 중요합니다. 생리 주기가 너무 짧거나 길다면 산부인과 상담을 권장합니다.',
    image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'blood-amount',
    title: '월경혈의 양',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/3588/3588614.png',
    content: '일반적으로 한 번의 생리 기간 동안 30-80ml의 혈액이 배출됩니다. 생리양이 너무 많거나(150ml 이상) 적다면 건강 문제일 수 있으니 의사와 상담하세요.',
    image: 'https://images.unsplash.com/photo-1573049556381-48c0ef5bb15f?q=80&w=1288&auto=format&fit=crop'
  },
  {
    id: 'exercise',
    title: '운동과 생리',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png',
    content: '생리 중에도 가벼운 운동은 괜찮습니다. 오히려 적당한 운동은 혈액 순환을 돕고 생리통을 완화시킬 수 있습니다. 단, 무리한 운동은 피하고 자신의 몸 상태에 맞게 조절하세요.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'hygiene',
    title: '위생 관리',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/4320/4320377.png',
    content: '생리 중에는 특히 개인 위생에 신경 써야 합니다. 하루에 2번 이상 샤워를 하고, 생리대는 3-4시간마다 교체하는 것이 좋습니다. 향이 강한 비누나 세정제는 피하는 것이 좋습니다.',
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'conversation',
    title: '올바른 대화 방법',
    description: '내용~~',
    icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
    content: '생리에 관한 대화는 자연스럽고 편안하게 이루어져야 합니다. 생리는 정상적인 생리현상이므로 부끄러워하거나, 불필요하게 강조할 필요 없이 존중과 이해를 바탕으로 대화하세요.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1287&auto=format&fit=crop'
  }
];

function initCards() {
  const topicList = document.getElementById('guideTopicList');
  const cardContainer = document.getElementById('cardContainer');

  // 주제 목록 렌더링
  topicList.innerHTML = '';
  guideTopics.forEach(topic => {
    const topicElement = document.createElement('div');
    topicElement.className = 'guide-topic-item';
    topicElement.onclick = () => showTopicContent(topic.id);
    topicElement.innerHTML = `
      <div class="guide-topic-content">
        <div class="guide-topic-title">${topic.title}</div>
        <div class="guide-topic-desc">${topic.description}</div>
      </div>
      <div class="guide-topic-icon">
        <img src="${topic.icon}" alt="${topic.title}">
      </div>
    `;
    topicList.appendChild(topicElement);
  });

  // 뒤로 가기 버튼 이벤트 리스너
  document.getElementById('backToTopics').addEventListener('click', showTopicList);
}

function showTopicContent(topicId) {
  const topic = guideTopics.find(t => t.id === topicId);
  if (!topic) return;

  // 주제 목록 숨기기
  document.getElementById('guideTopicList').style.display = 'none';

  // 카드 컨테이너 표시
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.style.display = 'block';

  // 선택한 주제의 컨텐츠 렌더링
  cardContainer.innerHTML = `
    <div class="card">
      <h3 class="card-title">${topic.title}</h3>
      <img src="${topic.image}" alt="${topic.title}" class="card-image">
      <p class="card-content">${topic.content}</p>
    </div>
  `;

  // 네비게이션 표시
  document.querySelector('.card-navigation').style.display = 'flex';
  document.getElementById('cardIndicator').textContent = '1 / 1';
}

function showTopicList() {
  // 주제 목록 표시
  document.getElementById('guideTopicList').style.display = 'flex';

  // 카드 컨테이너 숨기기
  document.getElementById('cardContainer').style.display = 'none';

  // 네비게이션 숨기기
  document.querySelector('.card-navigation').style.display = 'none';
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 메인 페이지 표시
  showPage('main');
});
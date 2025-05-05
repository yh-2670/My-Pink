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
  if (pageId === 'recommend') {
    // 통증 수준 기본값을 1로 설정
    painSlider.value = 1;
    painLevel.textContent = 1;
    showMedicineResult(1);
  } else if ((pageId === 'guide') || (pageId === 'policy')) {
    initCards();
  } else if (pageId === 'workplace') {
    // 저장된 메시지 불러오기
    loadSavedMessages();
  }
}

// 생리통약 관련 기능
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

// 슬라이더 값 변경 시 표시 및 결과 즉시 업데이트
if (painSlider) {
  painSlider.addEventListener('input', function() {
    const level = parseInt(this.value);
    painLevel.textContent = level;
    showMedicineResult(level);
  });

  // 페이지 로드 시 기본값 표시
  window.addEventListener('DOMContentLoaded', function() {
    const initialLevel = parseInt(painSlider.value);
    showMedicineResult(initialLevel);
  });
}

// 생리통약 결과 표시
function showMedicineResult(value) {
  //값 가져오기 
  painLevel.textContent = value;

  // Progress 업데이트 
  const percentage = (value / 10) * 100;
  sliderProgress.style.width = `${percentage}%`;

  // 카테고리 바꾸기 
  // !! value가 0 이면, levelIndex 도 0
  // 1~ 3 사이면 1, 
  // 4 ~ 6 사이면 2
  // 그 외 3 
  if (value == 0) {
    levelIndex = 0
  }
  else if (value >= 1 && value <= 3) {
    levelIndex = 1
  }
  else if (value >= 4 && value <= 6) {
    levelIndex = 2
  }
  else {
    levelIndex = 3
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

  switch (type) {
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

// 초경 전/남자들을 위한 기본 백서, 정책 관련 기능
function initCards() {
  // Select all cards
  const cards = document.querySelectorAll('.card');

  // Add click event to each card
  cards.forEach(card => {
    const header = card.querySelector('.card-header');

    header.addEventListener('click', () => {
      // Check if this card is already expanded
      const isExpanded = card.classList.contains('expanded');

      // First close all cards
      closeAllCards();

      // If the clicked card wasn't expanded before, expand it
      // Otherwise, it will remain closed (toggle behavior)
      if (!isExpanded) {
        expandCard(card);
        // Update layout to accommodate the expanded card
        updateCardGrid();
      }
    });
  });

  // Function to expand a card
  function expandCard(card) {
    card.classList.add('expanded');

    // 카드 바디 요소 가져오기
    const cardBody = card.querySelector('.card-body');

    // 카드 바디 스타일 설정
    if (cardBody) {
      // 컨텐츠 높이 계산
      const cardContent = card.querySelector('.card-content');
      if (cardContent) {
        const contentHeight = cardContent.scrollHeight;
        cardBody.style.height = 'auto';
        cardBody.style.maxHeight = contentHeight + 80 + 'px';
        cardBody.style.padding = '20px';
      }
    }

    // Apply smooth scrolling to the expanded card if not in view
    setTimeout(() => {
      const cardRect = card.getBoundingClientRect();
      const isFullyVisible =
        cardRect.top >= 0 &&
        cardRect.bottom <= window.innerHeight;

      if (!isFullyVisible) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Function to close all cards
  function closeAllCards() {
    cards.forEach(card => {
      // 카드의 expanded 클래스 제거
      card.classList.remove('expanded');

      // 카드 바디 요소 가져오기
      const cardBody = card.querySelector('.card-body');

      // 카드 바디 스타일 초기화
      if (cardBody) {
        cardBody.style.maxHeight = '0';
        cardBody.style.height = '0';
        cardBody.style.padding = '0';
      }
    });
  }

  // 카드 상태 업데이트 함수 (더 이상 그리드 컨트롤이 필요하지 않음)
  function updateCardGrid() {
    // 이제 모든 카드 상태는 expandCard와 closeAllCards 함수에서 직접 처리됨
    // 필요한 경우 여기에 추가 로직 구현 가능
  }

  // Close cards when clicking outside
  document.addEventListener('click', function(event) {
    // If click is not on a card or card content
    if (!event.target.closest('.card')) {
      closeAllCards();
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    // Update layout for expanded cards
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard) {
      updateCardGrid();
    }
  });

  // Add smooth transitions when cards change states
  cards.forEach(card => {
    card.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'max-height' && card.classList.contains('expanded')) {
        updateCardGrid();
      }
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 메인 페이지 표시
  showPage('main');
});
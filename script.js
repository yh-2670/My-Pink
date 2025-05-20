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
  } else if (pageId === 'guide') {
    loadCards('guide');
  } else if (pageId === 'policy') {
    loadCards('policy');
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
  painLevel.textContent = value;
  const percentage = (value / 10) * 100;
  sliderProgress.style.width = `${percentage}%`;

  let prescription = {};

  if (value >= 0 && value <= 3) {
    prescription = {
      name: "아세트아미노펜 325-500mg",
      effect: "효능: 경미한 생리통 완화, 가벼운 근육통 완화",
      ingredient: "성분: 아세트아미노펜 325-500mg",
      brands: "대표 약: 타이레놀, 써스펜, 펜잘",
      dosage: [
        "충분한 물과 함께 복용하세요",
        "1회 1-2정, 하루 최대 4000mg(8정)을 초과하지 마세요.",
        "간 손상 위험이 있으므로 술을 마신 후 복용을 피하세요.",
        "황달, 피부 발진, 가려움증 등이 나타나면 즉시 복용을 중단하세요.",
        "다른 아세트아미노펜 함유 제품(감기약 등)과 동시 복용 시 과다 복용 위험이 있습니다.",
        "공복보다는 식후에 복용하는 것이 좋습니다."
      ],
      image: "images/acetaminophen.png"
    };
  } else if (value >= 4 && value <= 6) {
    prescription = {
      name: "이부프로펜 200mg",
      effect: "효능: 생리통 완화, 근육통 및 관절통 완화",
      ingredient: "성분: 이부프로펜 200mg",
      brands: "대표 약: 부루펜, 애드빌, 이지엔6",
      dosage: [
        "식사 직후 또는 우유와 함께 복용하여 위장 자극을 줄이세요.",
        "성인은 4-6시간 간격으로 1-2정, 하루 최대 6정까지 복용 가능합니다.",
        "위장 출혈 위험이 있으니 위장 질환자는 복용 전 의사와 상담하세요.",
        "고혈압, 심장질환, 신장질환이 있는 경우 복용 전 의사와 상담하세요.",
        "임신 3기(임신 7개월 이후)에는 절대 복용하지 마세요.",
        "아스피린이나 다른 NSAIDs 계열 약물과 함께 복용하지 마세요."

      ],
      image: "images/ibuprofen.png"
    };
  } else if (value >= 7) {
    prescription = {
      name: "나프록센 나트륨 250-500mg",
      effect: "효능: 강한 생리통 완화, 심한 근육통 및 관절통 완화, 염증 억제",
      ingredient: "성분: 나프록센 나트륨 250-500mg",
      brands: "대표 약: 낙센, 탁센",
      dosage: [
        "반드시 식사와 함께 복용하여 위장 보호에 신경 쓰세요.",
        "효과가 오래 지속되므로 8-12시간 간격으로 복용하세요.",
        "심혈관계 부작용(심장마비, 뇌졸중) 위험이 있으니 장기 복용은 피하세요.",
        "위장 출혈 위험이 높으므로 위염, 위궤양 환자는 복용을 피하세요.",
        "부종이나 체중 증가가 나타날 수 있으니 주의하세요.",
        "아스피린 알레르기가 있는 경우 사용하지 마세요."

      ],
      image: "images/naproxen.png"
    };
  }

  // Update prescription page content
  document.getElementById('medicineName').textContent = prescription.name;
  document.getElementById('medicineEffect').textContent = prescription.effect;
  document.getElementById('medicineIngredient').textContent = prescription.ingredient;
  document.getElementById('medicineBrands').textContent = prescription.brands;
  document.getElementById('medicineImage').src = prescription.image;


  const dosageList = document.getElementById('dosageList');
  dosageList.innerHTML = '';
  prescription.dosage.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    dosageList.appendChild(li);
  });

  // 진단 결과 업데이트 
  const level = painLevels[value >= 7 ? 3 : value >= 4 ? 2 : value >= 1 ? 1 : 0];
  recommendationTitle.innerHTML = level.title.replace(/단계\s\d+(-\d+)?\/10/, `단계 <span id="painLevel">${value}</span>/10`);

  recommendationList.innerHTML = '';
  level.symptoms.forEach(symptom => {
    const li = document.createElement('li');
    li.textContent = symptom;
    recommendationList.appendChild(li);
  });

  // 레벨 0일 경우 버튼 없애기 
  const actionButtonContainer = document.querySelector('.action-button-container');
  if (actionButtonContainer) {
    actionButtonContainer.style.display = value === 0 ? 'none' : 'flex';
  }
}

// 메시지 관련 기능
const btn_copy_boss = document.getElementById("btn_copy_boss");
const btn_save_boss = document.getElementById("btn_save_boss");
const btn_copy_team = document.getElementById("btn_copy_team");
const btn_save_team = document.getElementById("btn_save_team");
btn_copy_boss.addEventListener('click', () => copyToClipboard("bossMessage"));
btn_save_boss.addEventListener('click', () => saveMessage("bossMessage"));
btn_copy_team.addEventListener('click', () => copyToClipboard("teamMessage"));
btn_save_team.addEventListener('click', () => saveMessage("teamMessage"));



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
  console.log(localStorage);

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
const btn_regular = document.getElementById("btn_regular");
const btn_overnight = document.getElementById("btn_overnight");

btn_regular.addEventListener('click', () => showPadRecommendation('regular'));
btn_overnight.addEventListener('click', () => showPadRecommendation('overnight'));


function showPadRecommendation(type) {
  const resultContainer = document.getElementById('padResult');
  let recommendation = '';

  if (type === 'regular') {
    recommendation = `
      <h2>일반 생리대</h2>
      <table class="pad-table">
        <thead>
          <tr>
            <th>브랜드관</th>
            <th>제품 이름</th>
            <th>별점</th>
            <th>해시태그</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>암웨이</td>
            <td>후아 내추럴 순면커버 생리대 대형</td>
            <td><div class="pad-rating"><span>★</span>4.65 (252명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#32ea</span><span class="pad-hashtag">#12,000원</span><span class="pad-hashtag">#대형생리대</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">3위</span></div></td>
          </tr>
          <tr>
            <td>라엘</td>
            <td>유기농 순면커버 생리대 중형</td>
            <td><div class="pad-rating"><span>★</span>4.52 (378명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#10ea</span><span class="pad-hashtag">#8,500원</span><span class="pad-hashtag">#중형생리대</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">2위</span></div></td>
          </tr>
          <tr>
            <td>치유비</td>
            <td>유기농 순면 생리대 대형</td>
            <td><div class="pad-rating"><span>★</span>4.42 (83명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#4ea</span><span class="pad-hashtag">#7,900원</span><span class="pad-hashtag">#대형생리대</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">1위</span></div></td>
          </tr>
          <tr>
            <td>질경이</td>
            <td>마음 생리대 중형</td>
            <td><div class="pad-rating"><span>★</span>4.36 (85명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#8ea</span><span class="pad-hashtag">#7,900원</span></div></td>
          </tr>
          <tr>
            <td>치유비</td>
            <td>유기농 순면 생리대 중형</td>
            <td><div class="pad-rating"><span>★</span>4.32 (95명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#12ea</span><span class="pad-hashtag">#9,900원</span></div></td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (type === 'overnight') {
    recommendation = `
      <h2>오버나이트 / 입는 생리대</h2>
      <table class="pad-table">
        <thead>
          <tr>
            <th>브랜드관</th>
            <th>제품 이름</th>
            <th>별점</th>
            <th>해시태그</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>시크릿데이</td>
            <td>입는 오버나이트</td>
            <td><div class="pad-rating"><span>★</span>4.8 (805명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#4ea</span><span class="pad-hashtag">#5,900원</span><span class="pad-hashtag">#오버나이트</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">1위</span></div></td>
          </tr>
          <tr>
            <td>좋은 느낌</td>
            <td>입는 오버나이트</td>
            <td><div class="pad-rating"><span>★</span>4.69 (1,299명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#8ea</span><span class="pad-hashtag">#12,700원</span><span class="pad-hashtag">#오버나이트</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">2위</span></div></td>
          </tr>
          <tr>
            <td>순수한면</td>
            <td>100% 유기농 순면 입는 오버나이트</td>
            <td><div class="pad-rating"><span>★</span>4.77 (155명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#4ea</span><span class="pad-hashtag">#7,900원</span></div></td>
          </tr>
          <tr>
            <td>디어스킨</td>
            <td>리얼모달 입는 오버나이트</td>
            <td><div class="pad-rating"><span>★</span>4.75 (205명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#8ea</span><span class="pad-hashtag">#7,900원</span><span class="pad-hashtag">#오버나이트</span><span class="pad-hashtag">부문</span><span class="pad-hashtag">3위</span></div></td>
          </tr>
          <tr>
            <td>순수한면</td>
            <td>제로 입는 오버나이트</td>
            <td><div class="pad-rating"><span>★</span>4.68 (101명)</div></td>
            <td><div class="pad-hashtags"><span class="pad-hashtag">#4ea</span><span class="pad-hashtag">#7,900원</span></div></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  resultContainer.innerHTML = recommendation;
  resultContainer.style.display = 'block';
}

function loadCards(type) {
  fetch('cards.json')
    .then(res => res.json())
    .then(data => {
      const containerId = type === 'guide' ? 'guideCardContainer' : 'policyCardContainer';
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      if (type === 'policy') {
        data.policy.forEach(card => {
          const html = `
            <div class="card">
              <div class="card-header">
                <h2>${card.title}</h2>
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M12 8v8m-4-4h8" class="plus-icon" />
                    <path d="M12 8v8" class="minus-icon" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                <div class="card-content">
                  <div class="content-section">
                    <p>${card.content}</p>
                    <br>
                  </div>
                </div>
              </div>
            </div>`;
          container.insertAdjacentHTML('beforeend', html);
        });
      } else if (type === 'guide') {
        data.guide.forEach(card => {
          const introHtml = card.intro.split('\n').map(p => `<p>${p}</p>`).join('');
          const listHtml = card.list.map(item => `<li>${item}</li>`).join('');
          const tipHtml = card.tip ? `<p class="guide-tip">${card.tip}</p>` : '';

          const html = `
            <div class="card">
              <div class="card-header">
                <h2>${card.title}</h2>
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M12 8v8m-4-4h8" class="plus-icon" />
                    <path d="M12 8v8" class="minus-icon" />
                  </svg>
                </div>
              </div>
              <div class="card-body">
                ${introHtml}
                <div class="card-content">
                  <div class="content-section">
                    <h3>${card.sectionTitle}</h3>
                    <ul>${listHtml}</ul>
                    ${tipHtml}
                    <br>
                  </div>
                </div>
              </div>
            </div>`;
          container.insertAdjacentHTML('beforeend', html);
        });
      }

      initCards(); // 카드 토글 기능 다시 적용
    });
}


// 초경 전/남자들을 위한 기본 백서, 정책 관련 기능
function initCards() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const header = card.querySelector('.card-header');

    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      closeAllCards();

      if (!isExpanded) {
        expandCard(card);
        updateCardGrid();
      }
    });
  });

  // 카드 펼친 경우 
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

  // 카드 접기 
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


  document.addEventListener('click', function(event) {
    if (!event.target.closest('.card')) {
      closeAllCards();
    }
  });

  window.addEventListener('resize', function() {
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard) {
      updateCardGrid();
    }
  });

  cards.forEach(card => {
    card.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'max-height' && card.classList.contains('expanded')) {
        updateCardGrid();
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {
  showPage('main'); // 초기 페이지

  // 페이지 이동 버튼 바인딩
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      showPage(targetPage);
    });
  });
});
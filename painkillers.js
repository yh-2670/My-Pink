
// 생리통약 관련 기능
const painSlider = document.getElementById('painLevel');
const painValue = document.getElementById('painValue');
const resultContainer = document.getElementById('medicineResult');

// 슬라이더 값 변경 시 표시 및 결과 즉시 업데이트
painSlider.addEventListener('input', function() {
  const level = parseInt(this.value);
  painValue.textContent = level;
  showMedicineResult(level);
});

// 페이지 로드 시 기본값 표시
window.addEventListener('DOMContentLoaded', function() {
  const initialLevel = parseInt(painSlider.value);
  showMedicineResult(initialLevel);
});

function showMedicineResult(level) {
  let recommendation = '';

  if (level >= 1 && level <= 3) {
    recommendation = `
      <h3>약한 통증 (단계 ${level}/10)</h3>
      <p><strong>추천 약물:</strong> 아세트아미노펜 계열(타이레놀 등)</p>
      <p><strong>복용 시간:</strong> 식후 또는 식간에 복용하세요.</p>
      <p><strong>효과 시작:</strong> 복용 후 약 30분~1시간 내 효과가 나타납니다.</p>
      <p><strong>TIP:</strong> 핫팩이나 따뜻한 물로 하복부를 데워주면 효과적입니다.</p>
    `;
  } else if (level >= 4 && level <= 6) {
    recommendation = `
      <h3>중간 통증 (단계 ${level}/10)</h3>
      <p><strong>추천 약물:</strong> 이부프로펜 계열(이지엔, 펜잘, 브루펜 등)</p>
      <p><strong>복용 시간:</strong> 가능하면 식후에 복용하세요. 공복 시 위장 장애가 생길 수 있습니다.</p>
      <p><strong>효과 시작:</strong> 복용 후 약 20~30분 내 효과가 나타납니다.</p>
      <p><strong>TIP:</strong> 통증이 시작되기 전, 생리 시작 직후 복용하면 더 효과적입니다.</p>
    `;
  } else {
    recommendation = `
      <h3>심한 통증 (단계 ${level}/10)</h3>
      <p><strong>추천 약물:</strong> 나프록센 계열(나프록센, 알레베) 또는 진통제 복합제(게보린 등)</p>
      <p><strong>복용 시간:</strong> 반드시 식후에 복용하세요.</p>
      <p><strong>효과 시작:</strong> 복용 후 약 30분~1시간 내 효과가 나타납니다.</p>
      <p><strong>TIP:</strong> 통증이 심각하면 산부인과 방문을 고려하세요. 내복약 외에도 진통 주사나 다른 치료법을 고려할 수 있습니다.</p>
      <p><strong>주의:</strong> 심한 통증이 지속되면 자궁내막증 등의 질환일 수 있으니 반드시 산부인과 검진을 받으세요.</p>
    `;
  }

  resultContainer.innerHTML = recommendation;
  resultContainer.style.display = 'block';
}

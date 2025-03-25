
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
        </div>
      `;
      break;
    // Add other cases (smell, comfort, size) similarly
  }

  resultContainer.innerHTML = recommendation;
  resultContainer.style.display = 'block';
}

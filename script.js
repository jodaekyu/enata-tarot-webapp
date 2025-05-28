const cardNames = [
  "The Fool", "The Lovers", "The Star"
]; // 임시 카드명 (선택된 3장만)

// 중복 클릭 방지
let selected = false;

function selectCard(cardElement, index) {
  if (selected) return;
  selected = true;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.classList.add('clicked');
    if (i === index) {
      // 카드 앞면 이미지 설정
      const cardName = cardNames[index].replaceAll(" ", "_") + ".png";
      const frontImg = card.querySelector(".card-front img");
      frontImg.src = "images/universal_tarot_images/" + cardName;

      card.classList.add('glow');
      setTimeout(() => {
        card.classList.add('flip');
        setTimeout(() => {
          callAPI(index);
        }, 800);
      }, 300);
    } else {
      // 선택되지 않은 카드 흐림 처리
      card.classList.add('blurred');
    }
  });
}

function callAPI(index) {
  const question = document.getElementById('userQuestion').value;
  const spinner = document.getElementById('spinner');
  const resultArea = document.getElementById('resultArea');

  spinner.style.display = 'block';
  resultArea.innerText = '';

  fetch('https://enata-tarot-api-1.onrender.com/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      cards: [cardNames[index]]
    })
  })
    .then(res => res.json())
    .then(data => {
      spinner.style.display = 'none';
      resultArea.innerText = data.result;
    })
    .catch(err => {
      spinner.style.display = 'none';
      resultArea.innerText = "문제가 발생했어요. 다시 시도해 주세요.";
    });
}

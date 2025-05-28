// 카드 이름 (임시: 3장만)
const cardNames = [
  "The Fool", "The Lovers", "The Star"
];

// 중복 클릭 방지
let selected = false;

// 완료 버튼 누름 여부
let selectionEnabled = false;

// ✅ "완료" 버튼 클릭 시 실행
function enableSelection() {
  const question = document.getElementById('userQuestion').value.trim();
  if (!question) {
    alert("질문을 먼저 입력해주세요.");
    return;
  }
  selectionEnabled = true;
  alert("이제 카드를 선택할 수 있습니다.");
}

// ✅ 카드 선택 함수
function selectCard(cardElement, index) {
  const question = document.getElementById('userQuestion').value.trim();

  // ✅ 완료 버튼을 누르지 않았으면 카드 선택 불가
  if (!selectionEnabled) {
    alert("먼저 질문을 입력하고 '완료' 버튼을 눌러주세요.");
    return;
  }

  if (!question) {
    alert("질문을 먼저 작성해주세요!");
    return;
  }

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

// ✅ AI 응답 처리 함수
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

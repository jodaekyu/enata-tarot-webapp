import cardList from './cardList.js';

const questionInput = document.getElementById("userQuestion");
const cards = document.querySelectorAll(".card");
const spinner = document.getElementById("spinner");
const resultArea = document.getElementById("resultArea");
const guideArea = document.getElementById("guideArea");
let cardSelected = false;

const randomThreeCards = [...cardList].sort(() => Math.random() - 0.5).slice(0, 3);

// 카드 이미지 삽입
document.addEventListener("DOMContentLoaded", function () {
  cards.forEach((card, index) => {
    const frontImg = card.querySelector(".card-front img");
    frontImg.src = `images/universal_tarot_images/${randomThreeCards[index].name.replaceAll(" ", "_")}.png`;
  });
});

// 카드 선택 처리 함수
function selectCard(cardElement, index) {
  const question = questionInput.value.trim();
  if (!question) {
    alert("질문을 먼저 작성해주세요.");
    return;
  }
  if (cardSelected) return;

  cardSelected = true;
  if (guideArea) guideArea.style.display = "none";

  cards.forEach((c, i) => {
    if (i !== index) c.classList.add("blurred");
  });

  cardElement.classList.add("glow");
  setTimeout(() => {
    cardElement.classList.add("flip");
    setTimeout(() => {
      showResult(randomThreeCards[index]);
    }, 800);
  }, 300);
}

// AI 응답 결과 출력 함수
function showResult(card) {
  spinner.style.display = "block";
  resultArea.innerText = "";
  resultArea.style.display = "block";

  fetch("https://enata-tarot-api-v2.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: questionInput.value,
      cards: [card]
    })
  })
    .then(res => res.json())
    .then(data => {
      spinner.style.display = "none";
      const cleaned = data.result.replace(/^\[조언\]\s*/, "").trim();
      resultArea.innerText = cleaned;
    })
    .catch(err => {
      spinner.style.display = "none";
      resultArea.innerText = "문제가 생겼어. 다시 해봐!";
      console.error("🔥 API 오류:", err);
    });
}

// HTML onclick에서 사용할 수 있도록 전역에 등록
window.selectCard = selectCard;

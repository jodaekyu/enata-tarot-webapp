document.addEventListener("DOMContentLoaded", function () {
  const questionInput = document.getElementById("userQuestion");
  const cards = document.querySelectorAll(".card");
  const spinner = document.getElementById("spinner");
  const resultArea = document.getElementById("resultArea");
  const usageGuide = document.getElementById("usageGuide");
  const consultBtn = document.getElementById("consultBtn");
  let cardSelected = false;

  const cardList = [
    { name: "The Fool", position: "정방향", meaning: "새 출발과 자유" },
    { name: "The Magician", position: "정방향", meaning: "능력과 기회" },
    { name: "The High Priestess", position: "정방향", meaning: "직관과 비밀" },
    { name: "The Empress", position: "정방향", meaning: "풍요와 안정감" },
    { name: "The Emperor", position: "정방향", meaning: "권위와 책임감" },
    { name: "The Lovers", position: "정방향", meaning: "사랑과 관계" },
    { name: "The Chariot", position: "정방향", meaning: "전진과 결단력" },
    { name: "Strength", position: "정방향", meaning: "인내와 용기" },
    { name: "The Hermit", position: "정방향", meaning: "고독과 성찰" },
    { name: "The Wheel of Fortune", position: "정방향", meaning: "운명의 전환" },
    { name: "Justice", position: "정방향", meaning: "공정함과 판단" },
    { name: "The Hanged Man", position: "정방향", meaning: "희생과 관점 변화" },
    { name: "Death", position: "정방향", meaning: "끝과 새로운 시작" },
    { name: "Temperance", position: "정방향", meaning: "조화와 치유" },
    { name: "The Devil", position: "정방향", meaning: "유혹과 집착" },
    { name: "The Tower", position: "정방향", meaning: "예기치 못한 변화" },
    { name: "The Star", position: "정방향", meaning: "희망과 영감" },
    { name: "The Moon", position: "정방향", meaning: "혼란과 불확실성" },
    { name: "The Sun", position: "정방향", meaning: "성공과 기쁨" },
    { name: "Judgement", position: "정방향", meaning: "깨달음과 재탄생" },
    { name: "The World", position: "정방향", meaning: "완성과 성취" }
  ];

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const question = questionInput.value.trim();
      if (!question) {
        alert("질문을 먼저 작성해주세요.");
        return;
      }
      if (cardSelected) return;

      cardSelected = true;

      // 다른 카드 흐리게 처리
      cards.forEach((c, i) => {
        if (i !== index) {
          c.classList.add("blurred");
        }
      });

      // 카드 이미지 설정
      const selectedCard = cardList[Math.floor(Math.random() * cardList.length)];
      const frontImg = card.querySelector(".card-front img");
      frontImg.src = `images/universal_tarot_images/${selectedCard.name.replaceAll(" ", "_")}.png`;

      // 카드 뒤집기 + 리딩 실행
      card.classList.add("glow");
      setTimeout(() => {
        card.classList.add("flip");
        setTimeout(() => {
          showResult(selectedCard);
        }, 800);
      }, 300);
    });
  });

  function showResult(card) {
    spinner.style.display = "block";
    resultArea.innerText = "";
    resultArea.style.display = "block";

    // 이용 방법 숨기기
    if (usageGuide) usageGuide.style.display = "none";

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
        const trimmed = cleaned.replace(/\s+/g, " ").slice(0, 150);
        resultArea.innerText = trimmed + (cleaned.length > 150 ? "…" : "");

        // 상담 버튼 보이기
        if (consultBtn) consultBtn.style.display = "inline-block";
      })
      .catch(err => {
        spinner.style.display = "none";
        resultArea.innerText = "문제가 생겼어. 다시 해봐!";
        console.error("🔥 API 오류:", err);
      });
  }
});

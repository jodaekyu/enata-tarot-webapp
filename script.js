console.log("✅ script.js 로드됨");

document.addEventListener("DOMContentLoaded", function () {
  const questionInput = document.getElementById("userQuestion");
  const cards = document.querySelectorAll(".card");
  const resultArea = document.getElementById("resultArea");
  const drawButton = document.getElementById("drawButton");

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
    { name: "The World", position: "정방향", meaning: "완성과 성취" },
  ];

  drawButton.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (!question) {
      alert("질문을 입력해주세요!");
      return;
    }

    // 카드 3장 중 1장 무작위 선택
    const selectedCard = cardList[Math.floor(Math.random() * cardList.length)];

    // 카드에 이미지 설정 및 뒤집기
    cards.forEach((card, index) => {
      const cardInner = card.querySelector(".card-inner");
      const frontImg = card.querySelector(".card-front img");

      // 이미지 경로 설정
      frontImg.src = `images/universal_tarot_images/${selectedCard.name.replaceAll(" ", "_")}.png`;

      // 뒤집기 효과 적용
      if (index === 1) {
        setTimeout(() => {
          cardInner.classList.add("flip");
        }, 300);
      }
    });

    // GPT 요청 및 결과 표시
    fetch("https://enata-tarot-api-v2.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        cards: [selectedCard],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.result.replace(/^\[조언\]\s*/, "").trim();
        const trimmed = cleaned.length > 150 ? cleaned.slice(0, 150) + "…" : cleaned;
        resultArea.innerText = trimmed;
      })
      .catch((err) => {
        console.error("❌ API 오류:", err);
        resultArea.innerText = "문제가 발생했어요. 다시 시도해 주세요.";
      });
  });
});

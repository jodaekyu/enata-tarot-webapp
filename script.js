import cardList from './cardList.js';

const questionInput = document.getElementById("userQuestion");
const cards = document.querySelectorAll(".card");
const spinner = document.getElementById("spinner");
const resultArea = document.getElementById("resultArea");
const guideArea = document.getElementById("guideArea");
const actionButtons = document.getElementById("actionButtons");
let cardSelected = false;

// 카드 3장 무작위 선택
const randomThreeCards = [...cardList].sort(() => Math.random() - 0.5).slice(0, 3);

// 카드 이미지 삽입
document.addEventListener("DOMContentLoaded", () => {
  cards.forEach((card, index) => {
    const frontImg = card.querySelector(".card-front img");
    frontImg.src = `images/universal_tarot_images/${randomThreeCards[index].name.replaceAll(" ", "_")}.png`;
  });

  // 카드 클릭 이벤트 연결
  cards.forEach((card, index) => {
    card.addEventListener("click", () => selectCard(card, index));
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
  saveToSheet({
    question,
    answer: "",
    teacher: "",
    consultClicked: false
  });

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

// AI 응답 출력
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

      if (actionButtons) {
        actionButtons.style.display = "flex";
      }
    })
    .catch(err => {
      spinner.style.display = "none";
      resultArea.innerText = "문제가 생겼어. 다시 해봐!";
      console.error("🔥 API 오류:", err);
    });
}

// 리트라이 버튼
document.getElementById("retryBtn").addEventListener("click", () => {
  location.reload();
});

// 상담 예약 버튼 클릭 이벤트
document.getElementById("consultBtn").addEventListener("click", handleConsultClick);

async function handleConsultClick() {
  const today = new Date();
  let targetDate = today;

  if (today.getHours() >= 22 && today.getMinutes() >= 30) {
    targetDate = new Date(today.getTime() + 86400000);
  }

  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
  const dd = String(targetDate.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwH279bLKJYoI_GQVpSm_Y5yIVt04h4RHsl9-D2U4C1h37ERHp8moLZ5d5HCCyLbUeFCTylWXOvh8A/pub?gid=0&single=true&output=csv";

  try {
    const res = await fetch(csvUrl);
    const text = await res.text();
    const rows = text.split("\n").map(row => row.split(","));
    const header = rows[0].slice(1);
    const todayRow = rows.find(row => row[0].trim() === `${yyyy}/${mm}/${dd}`);

    if (!todayRow) {
      alert("오늘은 예약 가능한 선생님 정보가 없습니다.");
      return;
    }

    const available = header
      .map((name, idx) => ({ name, idx }))
      .filter(({ idx }) => todayRow[idx + 1]?.trim().toUpperCase() === "O");

    if (available.length === 0) {
      alert("오늘 예약 가능한 선생님이 없습니다.");
      return;
    }

    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    const selected = available[0].name;

    saveToSheet({
      question: questionInput.value.trim(),
      answer: resultArea.innerText.trim(),
      teacher: selected,
      consultClicked: true
    });

    const rawLinks = {
      "1호점-안나": "https://booking.naver.com/booking/13/bizes/198330/items/2929928",
      "1호점-카라": "https://booking.naver.com/booking/13/bizes/198330/items/5914454",
      "1호점-경희": "https://booking.naver.com/booking/13/bizes/198330/items/3466827",
      "1호점-키르케": "https://booking.naver.com/booking/13/bizes/198330/items/3932140",
      "2호점-태연": "https://booking.naver.com/booking/13/bizes/362605/items/3450917",
      "2호점-안나": "https://booking.naver.com/booking/13/bizes/362605/items/5293030"
    };

    const baseQuery = `?area=pll&entry=pll&lang=ko&startDate=${formattedDate}`;
    const links = Object.fromEntries(
      Object.entries(rawLinks).map(([name, url]) => [name, `${url}${baseQuery}`])
    );

    const link = links[selected];
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("예약 링크를 찾을 수 없습니다.");
    }
  } catch (e) {
    console.error(e);
    alert("예약 정보를 불러오지 못했습니다.");
  }
}

function saveToSheet({ question, answer, teacher, consultClicked }) {
 fetch("https://enata-tarot-api-v2.onrender.com/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question,
    answer,
    teacher,
    consultClicked
  })
});
}

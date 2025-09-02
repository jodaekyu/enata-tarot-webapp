import cardList from './cardList.js';

const questionInput = document.getElementById("userQuestion");
const cards = document.querySelectorAll(".card");
const spinner = document.getElementById("spinner");
const resultArea = document.getElementById("resultArea");
const guideArea = document.getElementById("guideArea");
const actionButtons = document.getElementById("actionButtons");
const retryBtn = document.getElementById("retryBtn");
const consultBtn = document.getElementById("consultBtn");
let cardSelected = false;
let autoSaveTimer = null;
let savedOnce = false;
let selectedTeacher = ""; // 👈 새로 추가됨

// 카드 3장 무작위 선택
const randomThreeCards = [...cardList].sort(() => Math.random() - 0.5).slice(0, 3);

// 카드 이미지 삽입
document.addEventListener("DOMContentLoaded", () => {
  cards.forEach((card, index) => {
    const frontImg = card.querySelector(".card-front img");
    frontImg.src = `images/universal_tarot_images/${randomThreeCards[index].name.replaceAll(" ", "_")}.png`;
  });

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

// AI 응답 출력 + 선생님 자동 선정
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
document.getElementById("extraMessage").style.display = "block";
      if (actionButtons) actionButtons.style.display = "flex";

      // 선생님 선택 로직
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");

      const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwH279bLKJYoI_GQVpSm_Y5yIVt04h4RHsl9-D2U4C1h37ERHp8moLZ5d5HCCyLbUeFCTylWXOvh8A/pub?gid=0&single=true&output=csv";

      fetch(csvUrl)
        .then(res => res.text())
        .then(text => {
          const rows = text.split("\n").map(row => row.split(","));
          const header = rows[0].slice(1);
          const todayRow = rows.find(row => row[0].trim() === `${yyyy}/${mm}/${dd}`);
          if (!todayRow) return;

          const available = header
            .map((name, idx) => ({ name, idx }))
            .filter(({ idx }) => todayRow[idx + 1]?.trim().toUpperCase() === "O");

          if (available.length > 0) {
            const shuffled = available.sort(() => Math.random() - 0.5);
            selectedTeacher = shuffled[0].name;
          }
        });

      autoSaveTimer = setTimeout(() => {
        if (!savedOnce) {
          saveToSheet({
            question: questionInput.value.trim(),
            answer: resultArea.innerText.trim(),
            teacher: selectedTeacher,
            consultClicked: false,
            trigger: "60초 대기 자동 저장"
          });
        }
      }, 60000);
    })
    .catch(err => {
      spinner.style.display = "none";
      resultArea.innerText = "문제가 생겼어. 다시 해봐!";
      console.error("🔥 API 오류:", err);
    });
}

// 상담 예약 버튼 클릭 이벤트
consultBtn.addEventListener("click", () => {
  if (!selectedTeacher) {
    alert("상담 가능한 선생님을 찾을 수 없습니다.");
    return;
  }

  saveToSheet({
    question: questionInput.value.trim(),
    answer: resultArea.innerText.trim(),
    teacher: selectedTeacher,
    consultClicked: true,
    trigger: "예약시도"
  });

  const link = "https://https://m.booking.naver.com/booking/13/bizes/198330?theme=place&entry=pll&lang=ko&area=pll";
  window.open(link, "_blank");
});

  const links = Object.fromEntries(
    Object.entries(rawLinks).map(([name, url]) => [name, `${url}${baseQuery}`])
  );

  const link = links[selectedTeacher];
  if (link) window.open(link, "_blank");
  else alert("예약 링크를 찾을 수 없습니다.");
});

// 다른 질문 버튼 클릭 시 저장 (수정된 부분)
document.getElementById("anotherBtn")?.addEventListener("click", () => {
  const btn = document.getElementById("anotherBtn");
  if (!savedOnce) {
    btn.disabled = true; // 버튼 즉시 비활성화

    saveToSheet({
      question: questionInput.value.trim(),
      answer: resultArea.innerText.trim(),
      teacher: selectedTeacher,
      consultClicked: false,
      trigger: "다른질문"
    }, () => {
      location.reload(); // 저장 완료 후 새로고침
    });
  } else {
    location.reload(); // 이미 저장된 경우 바로 새로고침
  }
});

// 저장 함수 (timestamp 자동 생성)
function saveToSheet({ question, answer, teacher, consultClicked, trigger }, callback) {
  const clean = (text) =>
    text
      ?.replace(/\+/g, " ")
      .replace(/\\n/g, "\n")
      .trim();

  const timestamp = new Date().toISOString();
  fetch("https://enata-sheets-proxy.onrender.com/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp,
      question: clean(question),
      answer: clean(answer),
      teacher: clean(teacher),
      consultClicked,
      trigger: clean(trigger)
    })
  })
    .then(() => {
      savedOnce = true;
      if (callback) callback(); // 저장 후 콜백 실행
    });
}


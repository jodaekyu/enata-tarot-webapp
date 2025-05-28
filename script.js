<!-- ... (생략된 head 및 body 앞부분은 그대로 유지) -->

<script>
  const cardList = [
    {
      name: "The Fool",
      position: "정방향",
      meaning: "새로운 시작, 자유로움"
    },
    {
      name: "The Lovers",
      position: "정방향",
      meaning: "사랑, 조화"
    },
    {
      name: "The Star",
      position: "정방향",
      meaning: "희망, 영감, 치유"
    }
  ];

  let selected = false;
  let selectionEnabled = false;

  function enableSelection() {
    const question = document.getElementById('userQuestion').value.trim();
    if (!question) {
      alert("질문을 먼저 입력해주세요.");
      return;
    }
    selectionEnabled = true;
    alert("이제 카드를 선택할 수 있습니다.");
  }

  function selectCard(cardElement, index) {
    const question = document.getElementById('userQuestion').value.trim();
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
        const cardName = cardList[index].name.replaceAll(" ", "_") + ".png";
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
        card.classList.add('blurred');
      }
    });
  }

  async function callAPI(index) {
    const question = document.getElementById('userQuestion').value;
    const spinner = document.getElementById('spinner');
    const resultArea = document.getElementById('resultArea');

    spinner.style.display = 'block';
    resultArea.innerText = '';
    resultArea.style.display = 'block';

    const selectedCard = cardList[index];

    try {
      const response = await fetch('https://enata-tarot-api-v2.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          cards: [{
            name: selectedCard.name,
            position: selectedCard.position,
            meaning: selectedCard.meaning
          }]
        })
      });

      const data = await response.json();
      spinner.style.display = 'none';
      resultArea.innerText = data.result;
    } catch (err) {
      spinner.style.display = 'none';
      resultArea.innerText = "문제가 발생했어요. 다시 시도해 주세요.";
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
</script>

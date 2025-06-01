const questionInput = document.getElementById("userQuestion");
const cards = document.querySelectorAll(".card");
const spinner = document.getElementById("spinner");
const resultArea = document.getElementById("resultArea");
const guideArea = document.getElementById("guideArea");
let cardSelected = false;

const cardList = [
 [
  {
    "name": "The Fool",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "새 출발과 자유"
  },
  {
    "name": "The Fool",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "충동적 선택, 방향 상실"
  },
  {
    "name": "The Magician",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "능력과 기회"
  },
  {
    "name": "The Magician",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "속임수와 오만함"
  },
  {
    "name": "The High Priestess",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "직관과 비밀"
  },
  {
    "name": "The High Priestess",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "비밀 누설, 내면 혼란"
  },
  {
    "name": "The Empress",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "풍요와 안정감"
  },
  {
    "name": "The Empress",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "과잉 의존, 게으름"
  },
  {
    "name": "The Emperor",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "권위와 책임감"
  },
  {
    "name": "The Emperor",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "독단과 통제욕"
  },
  {
    "name": "The Hierophant",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "전통과 신뢰"
  },
  {
    "name": "The Hierophant",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "고집과 경직성"
  },
  {
    "name": "The Lovers",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "사랑과 관계"
  },
  {
    "name": "The Lovers",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "갈등과 유혹"
  },
  {
    "name": "The Chariot",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "전진과 결단력"
  },
  {
    "name": "The Chariot",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "방향 상실, 무모함"
  },
  {
    "name": "Strength",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "인내와 용기"
  },
  {
    "name": "Strength",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "두려움과 자기 회의"
  },
  {
    "name": "The Hermit",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "고독과 성찰"
  },
  {
    "name": "The Hermit",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "고립과 외로움"
  },
  {
    "name": "Wheel of Fortune",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "운명의 전환"
  },
  {
    "name": "Wheel of Fortune",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "불운과 통제 불가"
  },
  {
    "name": "Justice",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "공정함과 판단"
  },
  {
    "name": "Justice",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "불균형, 편견"
  },
  {
    "name": "The Hanged Man",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "희생과 관점 변화"
  },
  {
    "name": "The Hanged Man",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "희생 강요, 정체됨"
  },
  {
    "name": "Death",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "끝과 새로운 시작"
  },
  {
    "name": "Death",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "거부, 미련"
  },
  {
    "name": "Temperance",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "조화와 치유"
  },
  {
    "name": "Temperance",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "불균형, 조절 실패"
  },
  {
    "name": "The Devil",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "유혹과 집착"
  },
  {
    "name": "The Devil",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "자각, 해방의 가능성"
  },
  {
    "name": "The Tower",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "예기치 못한 변화"
  },
  {
    "name": "The Tower",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "붕괴의 위기, 진실의 순간"
  },
  {
    "name": "The Star",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "희망과 영감"
  },
  {
    "name": "The Star",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "환상, 실망"
  },
  {
    "name": "The Moon",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "혼란과 불확실성"
  },
  {
    "name": "The Moon",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "진실 드러남, 착각 해소"
  },
  {
    "name": "The Sun",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "성공과 기쁨"
  },
  {
    "name": "The Sun",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "자만과 피로"
  },
  {
    "name": "Judgement",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "깨달음과 재탄생"
  },
  {
    "name": "Judgement",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "자책과 후회"
  },
  {
    "name": "The World",
    "arcana": "Major",
    "position": "정방향",
    "meaning": "완성과 성취"
  },
  {
    "name": "The World",
    "arcana": "Major",
    "position": "역방향",
    "meaning": "미완성, 종결 지연"
  },
  {
    "name": "Ace of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 새로운 시작"
  },
  {
    "name": "Ace of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 기회 부족"
  },
  {
    "name": "Two of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 균형과 선택"
  },
  {
    "name": "Two of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 우유부단함"
  },
  {
    "name": "Three of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 협력과 성장"
  },
  {
    "name": "Three of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 계획 부족"
  },
  {
    "name": "Four of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 안정과 휴식"
  },
  {
    "name": "Four of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 권태와 지연"
  },
  {
    "name": "Five of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 갈등과 변화"
  },
  {
    "name": "Five of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 혼란과 손실"
  },
  {
    "name": "Six of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 성취와 인정"
  },
  {
    "name": "Six of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 불공정, 자만심"
  },
  {
    "name": "Seven of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 도전과 방어"
  },
  {
    "name": "Seven of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 혼란과 불안"
  },
  {
    "name": "Eight of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 빠른 전개"
  },
  {
    "name": "Eight of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 장애와 지연"
  },
  {
    "name": "Nine of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 회복과 인내"
  },
  {
    "name": "Nine of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 불신과 지침"
  },
  {
    "name": "Ten of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 책임과 부담"
  },
  {
    "name": "Ten of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 과중한 짐"
  },
  {
    "name": "Page of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 소식과 가능성"
  },
  {
    "name": "Page of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 미숙함"
  },
  {
    "name": "Knight of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 추진력과 행동"
  },
  {
    "name": "Knight of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 무모함"
  },
  {
    "name": "Queen of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 양육과 통찰"
  },
  {
    "name": "Queen of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 감정 과잉"
  },
  {
    "name": "King of Wands",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "열정과 행동 - 통제와 리더십"
  },
  {
    "name": "King of Wands",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "열정과 행동 - 권위적 태도"
  },
  {
    "name": "Ace of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 새로운 시작"
  },
  {
    "name": "Ace of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 기회 부족"
  },
  {
    "name": "Two of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 균형과 선택"
  },
  {
    "name": "Two of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 우유부단함"
  },
  {
    "name": "Three of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 협력과 성장"
  },
  {
    "name": "Three of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 계획 부족"
  },
  {
    "name": "Four of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 안정과 휴식"
  },
  {
    "name": "Four of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 권태와 지연"
  },
  {
    "name": "Five of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 갈등과 변화"
  },
  {
    "name": "Five of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 혼란과 손실"
  },
  {
    "name": "Six of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 성취와 인정"
  },
  {
    "name": "Six of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 불공정, 자만심"
  },
  {
    "name": "Seven of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 도전과 방어"
  },
  {
    "name": "Seven of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 혼란과 불안"
  },
  {
    "name": "Eight of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 빠른 전개"
  },
  {
    "name": "Eight of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 장애와 지연"
  },
  {
    "name": "Nine of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 회복과 인내"
  },
  {
    "name": "Nine of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 불신과 지침"
  },
  {
    "name": "Ten of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 책임과 부담"
  },
  {
    "name": "Ten of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 과중한 짐"
  },
  {
    "name": "Page of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 소식과 가능성"
  },
  {
    "name": "Page of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 미숙함"
  },
  {
    "name": "Knight of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 추진력과 행동"
  },
  {
    "name": "Knight of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 무모함"
  },
  {
    "name": "Queen of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 양육과 통찰"
  },
  {
    "name": "Queen of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 감정 과잉"
  },
  {
    "name": "King of Cups",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "감정과 관계 - 통제와 리더십"
  },
  {
    "name": "King of Cups",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "감정과 관계 - 권위적 태도"
  },
  {
    "name": "Ace of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 새로운 시작"
  },
  {
    "name": "Ace of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 기회 부족"
  },
  {
    "name": "Two of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 균형과 선택"
  },
  {
    "name": "Two of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 우유부단함"
  },
  {
    "name": "Three of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 협력과 성장"
  },
  {
    "name": "Three of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 계획 부족"
  },
  {
    "name": "Four of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 안정과 휴식"
  },
  {
    "name": "Four of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 권태와 지연"
  },
  {
    "name": "Five of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 갈등과 변화"
  },
  {
    "name": "Five of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 혼란과 손실"
  },
  {
    "name": "Six of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 성취와 인정"
  },
  {
    "name": "Six of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 불공정, 자만심"
  },
  {
    "name": "Seven of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 도전과 방어"
  },
  {
    "name": "Seven of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 혼란과 불안"
  },
  {
    "name": "Eight of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 빠른 전개"
  },
  {
    "name": "Eight of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 장애와 지연"
  },
  {
    "name": "Nine of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 회복과 인내"
  },
  {
    "name": "Nine of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 불신과 지침"
  },
  {
    "name": "Ten of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 책임과 부담"
  },
  {
    "name": "Ten of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 과중한 짐"
  },
  {
    "name": "Page of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 소식과 가능성"
  },
  {
    "name": "Page of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 미숙함"
  },
  {
    "name": "Knight of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 추진력과 행동"
  },
  {
    "name": "Knight of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 무모함"
  },
  {
    "name": "Queen of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 양육과 통찰"
  },
  {
    "name": "Queen of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 감정 과잉"
  },
  {
    "name": "King of Swords",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "지성 및 갈등 - 통제와 리더십"
  },
  {
    "name": "King of Swords",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "지성 및 갈등 - 권위적 태도"
  },
  {
    "name": "Ace of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 새로운 시작"
  },
  {
    "name": "Ace of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 기회 부족"
  },
  {
    "name": "Two of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 균형과 선택"
  },
  {
    "name": "Two of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 우유부단함"
  },
  {
    "name": "Three of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 협력과 성장"
  },
  {
    "name": "Three of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 계획 부족"
  },
  {
    "name": "Four of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 안정과 휴식"
  },
  {
    "name": "Four of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 권태와 지연"
  },
  {
    "name": "Five of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 갈등과 변화"
  },
  {
    "name": "Five of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 혼란과 손실"
  },
  {
    "name": "Six of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 성취와 인정"
  },
  {
    "name": "Six of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 불공정, 자만심"
  },
  {
    "name": "Seven of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 도전과 방어"
  },
  {
    "name": "Seven of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 혼란과 불안"
  },
  {
    "name": "Eight of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 빠른 전개"
  },
  {
    "name": "Eight of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 장애와 지연"
  },
  {
    "name": "Nine of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 회복과 인내"
  },
  {
    "name": "Nine of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 불신과 지침"
  },
  {
    "name": "Ten of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 책임과 부담"
  },
  {
    "name": "Ten of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 과중한 짐"
  },
  {
    "name": "Page of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 소식과 가능성"
  },
  {
    "name": "Page of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 미숙함"
  },
  {
    "name": "Knight of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 추진력과 행동"
  },
  {
    "name": "Knight of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 무모함"
  },
  {
    "name": "Queen of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 양육과 통찰"
  },
  {
    "name": "Queen of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 감정 과잉"
  },
  {
    "name": "King of Pentacles",
    "arcana": "Minor",
    "position": "정방향",
    "meaning": "물질과 현실 - 통제와 리더십"
  },
  {
    "name": "King of Pentacles",
    "arcana": "Minor",
    "position": "역방향",
    "meaning": "물질과 현실 - 권위적 태도"
  }
]

const randomThreeCards = [...cardList].sort(() => Math.random() - 0.5).slice(0, 3);

// 카드 이미지 삽입
document.addEventListener("DOMContentLoaded", function () {
  cards.forEach((card, index) => {
    const frontImg = card.querySelector(".card-front img");
    frontImg.src = `images/universal_tarot_images/${randomThreeCards[index].name.replaceAll(" ", "_")}.png`;
  });
});

// ✅ 전역 정의된 selectCard 함수
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

// ✅ 그대로 유지: 결과 보여주기
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
 resultArea.innerText = cleaned;  // ✅ 잘리지 않고 전체 응답 표시
    })
    .catch(err => {
      spinner.style.display = "none";
      resultArea.innerText = "문제가 생겼어. 다시 해봐!";
      console.error("🔥 API 오류:", err);
    });
}

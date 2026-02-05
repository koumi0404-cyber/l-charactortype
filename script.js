// ========================
// 設定
// ========================
const defaultConfig = {
  main_title: 'Lキャラタイプ診断',
  subtitle: '16タイプの中からあなたのキャラタイプを診断します',
  start_button_text: '診断スタート！',
  primary_color: '#e91e63',
  secondary_color: '#ab47bc',
  background_color: '#fce4ec',
  text_color: '#424242',
  accent_color: '#ec407a'
};

// ========================
// 質問データ
// ========================
const questions = [
  { text: '夜のポジションにおいて攻めたい?攻められたい?', optionA: '攻めたい', optionB: '攻められたい', dimension: 'TC' },
  { text: '自分の容姿に関係なく下着姿を見られる方が好き?見る方が好き?', optionA: '見る方が好き', optionB: '見られる方が好き', dimension: 'TC' },
  { text: '自分はドS or ドM?', optionA: 'ドS', optionB: 'ドM', dimension: 'TC' },
  { text: '恋人といる時の荷物は？', optionA: '持ってもらうのが嬉しい', optionB: '持つのが嬉しい', dimension: 'PK' },
  { text: '理想の恋人像は？', optionA: '守ってくれる、受け止めてくれる', optionB: '守りたくなる、頼ってくれる', dimension: 'PK' },
  { text: '「好き」って言葉は？', optionA: '言われたい', optionB: '言いたい', dimension: 'PK' },
  { text: '自分のセクシャリティを隠している？', optionA: '隠していない', optionB: '隠している', dimension: 'OS' },
  { text: '自分に対して他者評価が気になる？', optionA: '気にならない', optionB: '気になる', dimension: 'OS' },
  { text: '恋人が付き合っていることを公表することに後ろめたさを感じる？', optionA: '感じない', optionB: '感じる', dimension: 'OS' },
  { text: 'フォーマルな場でドレスとセットアップどちらを着たいか', optionA: 'セットアップ', optionB: 'ドレス', dimension: 'GL' },
  { text: '胸を強調しない服を選びがちか', optionA: '選びがち', optionB: '選ばない', dimension: 'GL' },
  { text: '初対面で「かっこいい」「かわいい」どっちが嬉しいか', optionA: 'かっこいい', optionB: 'かわいい', dimension: 'GL' }
];

// ========================
// キャラクタータイプデータ
// ========================
const characterTypes = {
  'TPLO': { name: 'ダーククイーン', suit: '♥️', group: 'PL型', image: './images/TPLO.png', description: '恋愛では強気でリードすることが多く、自分のルールに従って動くことを好みます。相手を引きつけるカリスマ性がありますが、時に独占的になりすぎることも。感情表現は豊かで、情熱的に恋に向き合います。支配的でありながらも、信頼関係を大切にする一途な一面があります。', goodMatch: 'CKLS', badMatch: 'CPLO' },
  'TPLS': { name: 'キャリアウーマン', suit: '♥️', group: 'PL型', description: '恋愛は効率重視で計画的に動くタイプです。自立心が強く、相手に頼るより自分で解決することを好みます。しかし心の奥では甘えたい気持ちも持っており、信頼できる相手には見せることも。恋の駆け引きよりも、着実な関係を築くことを大切にします。', goodMatch: 'CKGO', badMatch: 'TPGS' },
  'CPLO': { name: 'ファッションリーダー', suit: '♥️', group: 'PL型', description: '直感で判断することが多く、自分のスタイルを貫くタイプです。しかし、自信がないところもあるため他者に認められることを実は望んでいます。自由である雰囲気を持ち、他者と打ち解けることができます。恋愛では自分の個性を大切にしつつ、ストレスのない関係を好みます。', goodMatch: 'TKLO', badMatch: 'TPLO' },
  'CPLS': { name: 'トレンドライダー', suit: '♥️', group: 'PL型', description: '流行や冒険を楽しむタイプで、恋愛にも自由なスタンスを持ちます。縛られるよりも軽やかで柔軟な関係を好みます。新しいことに挑戦する勇気があり、恋も自分らしく楽しむことができます。心の奥では誠実さを持っており、大切な人には真摯に向き合います。', goodMatch: 'TKLS', badMatch: 'TKGS' }
  // 省略可能なタイプも同じ形式で追加
};

// ========================
// 状態管理
// ========================
let currentQuestionIndex = 0;
let scores = { TC: 0, PK: 0, OS: 0, GL: 0 };

// ========================
// DOM要素
// ========================
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const optionALabel = document.getElementById('option-a-label');
const optionBLabel = document.getElementById('option-b-label');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultType = document.getElementById('result-type');
const resultDescription = document.getElementById('result-description');
const characterIllustration = document.getElementById('character-illustration');

// ========================
// 関数
// ========================
function startDiagnosis() {
  startScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  currentQuestionIndex = 0;
  updateQuestion();
}

function updateQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.text;
  questionNumber.textContent = `Q${currentQuestionIndex + 1}`;
  optionALabel.textContent = q.optionA;
  optionBLabel.textContent = q.optionB;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
}

function selectAnswer(option) {
  const dimension = questions[currentQuestionIndex].dimension;
  if (option === 0) scores[dimension] += 1;
  if (option === 1) scores[dimension] -= 1;

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestion();
  }
}

function showResult() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  // シンプルにスコアでタイプ判定（例）
  const typeKey = 'TPLO'; // 仮：今は固定。スコアで判定ロジック追加可能
  const type = characterTypes[typeKey];

  resultType.textContent = type.name;
  resultDescription.textContent = type.description;

  characterIllustration.innerHTML = `<img src="${type.image}" alt="${type.name}" class="w-48 h-48 object-contain">`;
}

function restartDiagnosis() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  scores = { TC: 0, PK: 0, OS: 0, GL: 0 };
}

// ========================
// モーダル
// ========================
const shareModal = document.getElementById('shareModal');
function toggleShareModal() {
  if (shareModal.style.display === 'none') {
    shareModal.style.display = 'flex';
  } else {
    shareModal.style.display = 'none';
  }
}

function copyUrl() {
  navigator.clipboard.writeText(window.location.href);
  alert('URLをコピーしました！');
}

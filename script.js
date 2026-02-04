// ========================
// 設定
// ========================
console.log('🔥 script.js 読まれてます');


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
  { text: '夜のポジションにおいて攻めたい?攻められたい?', optionA: '攻めたい', optionB: '攻められたい', dimension: 'TC', scoreA: 1, scoreB: -1 },
  { text: '自分の容姿に関係なく下着姿を見られる方が好き?見る方が好き?', optionA: '見る方が好き', optionB: '見られる方が好き', dimension: 'TC', scoreA: -1, scoreB: 1 },
  { text: '自分はドS or ドM?', optionA: 'ドS', optionB: 'ドM', dimension: 'TC', scoreA: 1, scoreB: -1 },

  // PK質問
  { text: '恋人といる時の荷物は？', optionA: '持ってもらうのが嬉しい', optionB: '持つのが嬉しい', dimension: 'PK', scoreA: -1, scoreB: 1 },
  { text: '理想の恋人像は？', optionA: '受け止めてくれる', optionB: '頼ってくれる', dimension: 'PK', scoreA: -1, scoreB: 1 },
  { text: '「好き」って言葉は？', optionA: '言われたい', optionB: '言いたい', dimension: 'PK', scoreA: -1, scoreB: 1 },

  // GL質問
  { text: 'フォーマルな場でどちらを着たい？', optionA: 'セットアップ', optionB: 'ドレス', dimension: 'GL', scoreA: 1, scoreB: -1 },
  { text: '身体のラインを強調しない服を選びがちか', optionA: '選びがち', optionB: '選ばない', dimension: 'GL', scoreA: 1, scoreB: -1 },
  { text: '初対面で言われて嬉しいのは？', optionA: 'かっこいい', optionB: 'かわいい', dimension: 'GL', scoreA: 1, scoreB: -1 },

  // OS質問
  { text: '自分のセクシャリティを隠している？', optionA: '特に隠していない', optionB: '隠している', dimension: 'OS', scoreA: 1, scoreB: -1 },
  { text: '自分に対して他者評価が気になる？', optionA: '気にならない', optionB: '気になる', dimension: 'OS', scoreA: 1, scoreB: -1 },
  { text: '同性(男性以外)の恋人がいることを公表するのに後ろめたさを感じる？', optionA: '感じない', optionB: '感じる', dimension: 'OS', scoreA: 1, scoreB: -1 },
];


// ========================
// キャラクタータイプデータ
// ========================
const characterTypes = {
  // ❤️ PL型
  TPLO: {
    name: 'ダーククイーン',
    suit: '♥️',
    group: 'PL型',
    image: './images/TPLO.png',
    description: '恋愛では強気でリードすることが多く、自分のルールに従って動くことを好みます。相手を引きつけるカリスマ性がありますが、ときに独占的になりすぎることも。感情表現は豊かで、情熱的に恋に向き合います。支配的でありながらも、信頼関係を大切にする一途な一面があります。',
    goodMatch: ['CKGO', 'CKGS'],
    badMatch: 'TPGS'
  },

  TPLS: {
    name: 'キャリアウーマン',
    suit: '♥️',
    group: 'PL型',
    image: './images/TPLS.png',
    description: '恋愛は効率重視で計画的に動くタイプです。自立心が強く、相手に頼るよりも自分で解決することを好みます。しかし心の奥では甘えたい気持ちも持っており、信頼できる相手には見せることも。恋の駆け引きよりも、着実な関係を築くことを大切にします。',
    goodMatch: ['CKGO', 'CKGS'],
    badMatch: 'TPGO'
  },

  CPLO: {
    name: 'ファッションリーダー',
    suit: '♥️',
    group: 'PL型',
    image: './images/CPLO.png',
    description: '感覚で判断することが多く自分のスタイルを貫くタイプです。しかし、自信がないところもあるため他者に認められることを実は望んでいます。自由で明るい雰囲気を持ち、他者と打ち解けることができます。恋愛では自分の個性を大切にしつつ、ストレスのない関係を好みます。',
    goodMatch: ['TKGO', 'TKGS'],
    badMatch: 'CPGS'
  },

  CPLS: {
    name: 'トレンドライダー',
    suit: '♥️',
    group: 'PL型',
    image: './images/CPLS.png',
    description: '流行や冒険を楽しむタイプで、恋愛にも自由なスタンスを持ちます。縛られるよりも軽やかで柔軟な関係を好みます。新しいことに挑戦する勇気があり、恋も自分らしく楽しむことができます。心の奥では誠実さを持っており、大切な人には真摯に向き合います。',
    goodMatch: ['TKGO', 'TKGS'],
    badMatch: 'CPGO'
  },

  // 🟡 PG型
  TPGO: {
    name: 'ヒーローラビット',
    suit: '🟡',
    group: 'PG型',
    image: './images/TPGO.png',
    description: '恋愛では積極的に行動し、相手を引っ張ることを好むタイプです。自分の思いを素直に表現し、オープンに恋愛を楽しむことができます。スポーティーな一面もあり、相手にワクワクや情熱を与えます。周囲を巻き込みながら、明るく前向きな関係を築くのが理想です。',
    goodMatch: ['CKLO', 'CKLS'],
    badMatch: 'TPLO'
  },

  TPGS: {
    name: 'ガラスプリンス',
    suit: '🟡',
    group: 'PG型',
    image: './images/TPGS.png',
    description: '外見は自信に満ちていますが、内面では慎重で控えめな面をお持ちです。恋愛では秘密主義で、相手に全てをさらけ出すことは少ないでしょう。ロマンチックな性格であり、甘えることを許してくれる相手を望みます。その繊細さやミステリアスな雰囲気が、周囲の興味を引きつけます。',
    goodMatch: ['CKLO', 'CKLS'],
    badMatch: 'TPGO'
  },

  CPGO: {
    name: 'リトルブラザー',
    suit: '🟡',
    group: 'PG型',
    image: './images/CPGO.png',
    description: '恋愛では甘え上手で可愛らしい印象を与えられるタイプです。自分軸な面もあり、自分の今の思いや感情を大切にします。オープンな性格で、人懐っこく周囲とすぐに打ち解けることができます。柔らかく愛される魅力があり、守ってあげたくなる存在となるでしょう。',
    goodMatch: ['TKLO', 'TKLS'],
    badMatch: 'CPLO'
  },

  CPGS: {
    name: 'オフィスDJ',
    suit: '🟡',
    group: 'PG型',
    image: './images/CPGS.png',
    description: '控えめで内向的ですが、恋愛では相手を大切に思う優しさがあります。秘密主義な面があり、全てをすぐに見せるわけではありません。慎重派な性格ですが、時々周りを驚かせる行動や言動があります。静かで落ち着いた魅力があり、隠れた魅力で相手を惹きつけられます。',
    goodMatch: ['TKLO', 'TKLS'],
    badMatch: 'CPLS'
  },

  // ☘️ KL型
  TKLO: {
    name: 'キングマム',
    suit: '☘️',
    group: 'KL型',
    image: './images/TKLO.png',
    description: '恋愛では頼れる存在として、相手を包み込み支えることを好まれるタイプです。強さと優しさを兼ね備え、恋人に安心感を与えることができます。相手の気持ちに寄り添いながら、自分も時に甘えるバランス感覚を持たれています。安定感と包容力のある性格が、恋愛においても信頼を生むでしょう。',
    goodMatch: ['CPGO', 'CPGS'],
    badMatch: 'TKGO'
  },

  TKLS: {
    name: 'スカーレットスパイ',
    suit: '☘️',
    group: 'KL型',
    image: './images/TKLS.png',
    description: '恋愛では刺激的でミステリアスな魅力を放たれるタイプです。好奇心が旺盛で、恋人をドキドキさせる行動を好まれます。一見慎重に見えますが、内面では情熱に溢れていることもあります。恋愛における駆け引きや冒険心が、関係をより深く魅力的にします。',
    goodMatch: ['CPGO', 'CPGS'],
    badMatch: 'TKGS'
  },

  CKLO: {
    name: 'マリンミューズ',
    suit: '☘️',
    group: 'KL型',
    image: './images/CKLO.png',
    description: '控えめで静かな雰囲気を持たれ、穏やかな恋愛を好まれるタイプです。相手の気持ちを観察しながら、慎重に距離を縮められます。内面には秘めた情熱があり、信頼関係が深まると自然に表現されます。優しさと落ち着きのある性格が、恋愛において信頼できる存在となるでしょう。',
    goodMatch: ['TPGO', 'TPGS'],
    badMatch: 'CKGO'
  },

  CKLS: {
    name: 'ピクシーエルフ',
    suit: '☘️',
    group: 'KL型',
    image: './images/CKLS.png',
    description: '可愛らしく、恋愛そのものに対する理想が明確にあるタイプです。相手のために献身的に行動する姿が、相手の恋心を育てます。自分自身を後回しにしがちなため、相手も同じくらいの熱量で向き合ってくれているかを重視します。軽やかで愛らしい魅力が、恋愛関係において独特の魅力を生みます。',
    goodMatch: ['TPGO', 'TPGS'],
    badMatch: 'CKGS'
  },

  // ♠️ KG型
  TKGO: {
    name: 'エリートバトラー',
    suit: '♠️',
    group: 'KG型',
    image: './images/TKGO.png',
    description: '恋愛では相手を陰で支えることに幸福を感じるタイプです。一見控えめで礼儀正しく、安定感と安心感を提供されます。自分を前面に出しませんが、内面ではしっかりと考えています。誠実で真面目な性格が、信頼関係を深める大きな魅力となります。',
    goodMatch: ['CPLO', 'CPLS'],
    badMatch: 'TKLO'
  },

  TKGS: {
    name: 'ラブボム',
    suit: '♠️',
    group: 'KG型',
    image: './images/TKGS.png',
    description: 'ミステリアスで初めは不思議な印象です。関わっていくほどに魅力が増していき、恋人の特権と言われる一面をたまに見せてくれます。相手を喜ばせることに熱心で二面性があり、刺激的な関係を作られることが多いでしょう。恋愛においては、率直で分かりやすいアプローチを好みます。',
    goodMatch: ['CPLO', 'CPLS'],
    badMatch: 'TKLS'
  },

  CKGO: {
    name: 'ソフトガーディアン',
    suit: '♠️',
    group: 'KG型',
    image: './images/CKGO.png',
    description: '穏やかで優しく、恋愛では相手を安心させることを大切にされます。守りながらも強要せず、自然な距離感で関係を築かれるタイプです。柔らかく落ち着いた性格が、相手に癒しや安らぎを提供します。情熱的な一瞬よりも、長く暖かい関係に憧れています。',
    goodMatch: ['TPLO', 'TPLS'],
    badMatch: 'CKLO'
  },

  CKGS: {
    name: 'シャイラム',
    suit: '♠️',
    group: 'KG型',
    image: './images/CKGS.png',
    description: '恋愛において非積極的ですが、その性格を面白いと感じてくれる人を好きになりがちです。恋愛では自分から行動することは少ないかもしれません。相手の好意を感じるたびに自身の気持ちに気づき、愛を育てていきます。その純粋さや守ってあげたくなる雰囲気が、恋愛において愛される要素となります。',
    goodMatch: ['TPLO', 'TPLS'],
    badMatch: 'CKLS'
  }
};

// ========================
// 状態管理
// ========================
let currentQuestionIndex = 0;
let scores = { TC: 0, PK: 0, GL: 0, OS: 0 };

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

// 診断結果の分岐
function showResult() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

const tc = scores.TC > 0 ? 'T' : 'C';
const pk = scores.PK > 0 ? 'P' : 'K';
const gl = scores.GL > 0 ? 'G' : 'L';
const os = scores.OS > 0 ? 'O' : 'S';

  const typeKey = `${tc}${pk}${gl}${os}`;

  console.log('typeKey:', typeKey);

  const type = characterTypes[typeKey];

  if (!type) {
    resultType.textContent = '診断エラー';
    resultDescription.textContent = `タイプデータが見つかりませんでした（${typeKey}）`;
    return;
  }

  resultType.textContent = `${type.suit} ${type.name}`;
  resultDescription.textContent = type.description;

  characterIllustration.innerHTML = `
    <img src="${type.image}" alt="${type.name}" class="w-48 h-48 object-contain mb-4">
  `;
}


// 診断結果の分岐ここまで

function restartDiagnosis() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  scores = { TC: 0, PK: 0, GL: 0, OS: 0 };
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


window.startDiagnosis = startDiagnosis;
window.selectAnswer = selectAnswer;
window.restartDiagnosis = restartDiagnosis;

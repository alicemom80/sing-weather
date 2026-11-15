// 단어 데이터: [그림 파일 이름, 영어, 한글]
// 출처: 앱/씽씽바깥세상/기획서.md 3장 (테마와 단어), 5장 (테마별 게임 배정)
// 한 줄이 묶음 하나(5개)다. 주제 하나에 단어 5의 배수를 넣는 것이 원칙이다. 지금은 주제 6개 × 20개 = 120개.
// games: 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (기획서 5장).
// mission: 놀이 끝에 보여 주는 화면 밖 미션 (기획서 6장).
window.A = window.A || {};

// 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (카드는 맨 위, 묻고 답하기는 맨 아래 가로 한 줄)
const ALL_GAMES = [
  ['card', 1], ['pick', 1], ['balloon', 1], ['match', 1],
  ['ox', 2], ['scratch', 2], ['maze', 3], ['qa', 3],
];

// 복수형 단어: "These are ..." 로 말한다 (기획서 4-3장)
const PLURAL_IDS = new Set(['goggles', 'sparkles']);

// 관사(a/an)를 붙이지 않는 단어: 셀 수 없는 말 ("This is rain.")
const NO_ART_IDS = new Set(['rain', 'snow', 'ice', 'lightning', 'wind']);
// 관사 대신 다른 말을 붙이는 단어 ("This is the earth.")
const ART_OVERRIDE = { earth: 'the' };

const TRANSPORT_MISSION = '오늘 밖에서 본 탈것 이름을 영어로 말해 보기';
const WEATHER_MISSION = '오늘 본 날씨를 영어로 말해 보기';
const NATURE_MISSION = '오늘 밖에서 본 나무나 꽃 이름을 영어로 말해 보기';
const JOBS_MISSION = '오늘 본 사람이 하는 일을 영어로 말해 보기';
const TOWN_MISSION = '오늘 간 곳 이름을 영어로 말해 보기';

A.THEMES = [
  { id: 'weather', ko: '하늘·날씨', en: 'Sky & Weather', icon: '☀️', cover: 'sun', color: '#e3d1ff',
    games: ALL_GAMES,
    mission: WEATHER_MISSION,
    words: [
      ['sun', 'sun', '해'], ['moon', 'moon', '달'], ['cloud', 'cloud', '구름'], ['rain', 'rain', '비'], ['snow', 'snow', '눈송이'],
      ['snowman', 'snowman', '눈사람'], ['rainbow', 'rainbow', '무지개'], ['thermometer', 'thermometer', '온도계'], ['waterwave', 'water wave', '파도'], ['lightning', 'lightning', '번개'],
      ['droplet', 'water drop', '물방울'], ['planet', 'planet', '행성'], ['ice', 'ice', '얼음'], ['tornado', 'tornado', '회오리바람'], ['comet', 'comet', '혜성'],
      ['snowcloud', 'snow cloud', '눈구름'], ['wind', 'wind', '바람'], ['earth', 'earth', '지구'], ['telescope', 'telescope', '망원경'], ['sparkles', 'sparkles', '반짝임'],
    ] },
];

// 5개씩 묶음으로 나누기 (기획서: 주제 하나는 묶음 4개)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko]) => ({
    id, en, ko, say: en,
    art: NO_ART_IDS.has(id) ? '' : (ART_OVERRIDE[id] ?? (/^[aeiou]/i.test(en) ? 'an' : 'a')),
    plural: PLURAL_IDS.has(id),
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});

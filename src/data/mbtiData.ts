export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1; // 1: Agree means E/S/T/J, -1: Agree means I/N/F/P
}

export interface MbtiProfile {
  type: string;
  name: string;
  englishName: string;
  summary: string;
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  bestMatch: { type: string; name: string };
  worstMatch: { type: string; name: string };
  gradient: string; // Tailwind gradient classes (pastel background)
  textColor: string; // Theme accent text color
  badgeColor: string; // Soft badge color background
  borderColor: string; // Accent border color
}

export const questions: Question[] = [
  // E vs I (Extraversion vs Introversion) - 6 Questions
  {
    id: 1,
    text: "낯선 사람들로 가득 찬 모임이나 사교적인 파티에 참여하면 활력을 얻는다.",
    dimension: 'EI',
    direction: 1
  },
  {
    id: 2,
    text: "대화를 먼저 주도하기보다 주로 상대방의 이야기를 조용히 듣는 편이다.",
    dimension: 'EI',
    direction: -1
  },
  {
    id: 3,
    text: "주말에는 집에 혼자 머무는 것보다 외부 활동을 하거나 친구를 만나야 충전된다.",
    dimension: 'EI',
    direction: 1
  },
  {
    id: 4,
    text: "여러 사람들과 함께 협업하여 의견을 조율하고 일을 처리하는 것을 선호한다.",
    dimension: 'EI',
    direction: 1
  },
  {
    id: 5,
    text: "생각을 말로 바로 뱉어내기보다 마음속으로 먼저 차분히 정리한 뒤 이야기한다.",
    dimension: 'EI',
    direction: -1
  },
  {
    id: 6,
    text: "하루 동안 많은 사람들과 깊이 소통하고 나면, 혼자만의 시간이 절실해진다.",
    dimension: 'EI',
    direction: -1
  },

  // S vs N (Sensing vs Intuition) - 6 Questions
  {
    id: 7,
    text: "구체적이고 현실적인 대화보다 미래의 가능성, 우주, 철학 같은 추상적인 주제에 흥미를 느낀다.",
    dimension: 'SN',
    direction: -1
  },
  {
    id: 8,
    text: "문제를 해결할 때 검증된 기존 방식보다 독창적이고 새로운 방법을 시도하는 것을 즐긴다.",
    dimension: 'SN',
    direction: -1
  },
  {
    id: 9,
    text: "어떤 정보를 접할 때 행간의 숨은 의미를 파악하기보다 눈에 보이는 팩트와 세부 정보를 더 중시한다.",
    dimension: 'SN',
    direction: 1
  },
  {
    id: 10,
    text: "가끔 현실과는 무관하지만 흥미진진한 상상이나 공상에 깊이 빠져들곤 한다.",
    dimension: 'SN',
    direction: -1
  },
  {
    id: 11,
    text: "관념적이거나 이론적인 내용보다 실제로 어떻게 활용할 수 있는지 실용성에 더 관심이 간다.",
    dimension: 'SN',
    direction: 1
  },
  {
    id: 12,
    text: "과거의 구체적인 경험이나 확실한 데이터를 바탕으로 상황을 예측하는 편이 마음 편하다.",
    dimension: 'SN',
    direction: 1
  },

  // T vs F (Thinking vs Feeling) - 6 Questions
  {
    id: 13,
    text: "고민을 털어놓는 친구에게 감정적인 위로보다 실질적인 해결책을 제안하는 것이 진정한 도움이라 믿는다.",
    dimension: 'TF',
    direction: 1
  },
  {
    id: 14,
    text: "중요한 결정을 내릴 때 논리적 타당성이나 효율성보다 사람들의 감정과 관계에 더 집중한다.",
    dimension: 'TF',
    direction: -1
  },
  {
    id: 15,
    text: "갈등이 발생하면 서로의 감정이 상하더라도 시시비비를 명확히 가려 합리적인 선을 정하는 것이 낫다.",
    dimension: 'TF',
    direction: 1
  },
  {
    id: 16,
    text: "감정적인 호소보다 객관적인 통계 자료나 논리적인 보고서를 볼 때 마음이 더 쉽게 움직인다.",
    dimension: 'TF',
    direction: 1
  },
  {
    id: 17,
    text: "타인의 부탁을 거절하거나 아쉬운 소리를 할 때 상대가 상처받을까 봐 크게 망설이거나 주저한다.",
    dimension: 'TF',
    direction: -1
  },
  {
    id: 18,
    text: "슬픈 영화나 소설을 감상할 때 등장인물의 아픔과 상황에 깊이 공감해 쉽게 눈물을 흘린다.",
    dimension: 'TF',
    direction: -1
  },

  // J vs P (Judging vs Perceiving) - 6 Questions
  {
    id: 19,
    text: "일정이나 계획을 세세히 정하지 않고 상황의 흐름에 몸을 맡겨 즉흥적으로 행동하는 것을 선호한다.",
    dimension: 'JP',
    direction: -1
  },
  {
    id: 20,
    text: "업무나 과제를 수행할 때 마감 직전까지 미루기보다 계획에 맞춰 미리미리 끝내두는 편이다.",
    dimension: 'JP',
    direction: 1
  },
  {
    id: 21,
    text: "정리정돈된 체계적인 환경보다 자유롭고 유연하게 상황을 바꿀 수 있는 환경에서 집중이 더 잘 된다.",
    dimension: 'JP',
    direction: -1
  },
  {
    id: 22,
    text: "하루 일정을 시작하기 전에 미리 To-Do 리스트를 적고 이를 하나씩 지워갈 때 만족감을 느낀다.",
    dimension: 'JP',
    direction: 1
  },
  {
    id: 23,
    text: "계획했던 일정이나 약속이 예상치 못하게 급작스럽게 바뀔 때 큰 스트레스를 받는다.",
    dimension: 'JP',
    direction: 1
  },
  {
    id: 24,
    text: "정해진 가이드라인이나 매뉴얼을 따르기보다, 그때그때의 즉흥적인 영감으로 처리하는 게 더 효율적이다.",
    dimension: 'JP',
    direction: -1
  }
];

export const mbtiGradientsLight: Record<string, string> = {
  INTJ: "from-indigo-50/90 via-purple-50/60 to-pink-50/90",
  INTP: "from-blue-50/90 via-indigo-50/60 to-purple-50/90",
  ENTJ: "from-purple-50/90 via-pink-50/60 to-rose-50/90",
  ENTP: "from-pink-50/90 via-red-50/60 to-amber-50/90",
  INFJ: "from-emerald-50/90 via-teal-50/60 to-cyan-50/90",
  INFP: "from-teal-50/90 via-emerald-50/60 to-green-50/90",
  ENFJ: "from-teal-50/90 via-green-50/60 to-lime-50/90",
  ENFP: "from-amber-50/90 via-orange-50/60 to-pink-50/90",
  ISTJ: "from-slate-100/90 via-zinc-50/60 to-neutral-100/90",
  ISFJ: "from-sky-50/90 via-blue-50/60 to-indigo-50/90",
  ESTJ: "from-indigo-50/90 via-purple-50/60 to-slate-100/90",
  ESFJ: "from-pink-50/90 via-rose-50/60 to-orange-50/90",
  ISTP: "from-cyan-50/90 via-teal-50/60 to-slate-100/90",
  ISFP: "from-yellow-50/90 via-orange-50/60 to-amber-50/90",
  ESTP: "from-orange-50/90 via-amber-50/60 to-red-50/90",
  ESFP: "from-red-50/90 via-pink-50/60 to-rose-50/90"
};

export const mbtiProfiles: Record<string, MbtiProfile> = {
  INTJ: {
    type: "INTJ",
    name: "용의주도한 전략가",
    englishName: "The Architect",
    summary: "독립적이고 체계적인 사고를 지닌 혁신가",
    description: "전체 인구의 약 2%에 해당하는 INTJ는 이성적이면서도 두뇌 회전이 빠른 이들입니다. 자신만의 뛰어난 통찰력과 지적 탐구심으로 복잡한 문제를 단숨에 구조화하며, 높은 기준을 충족하기 위해 끊임없이 노력합니다. 실속 없는 사회적 교류보다는 자신의 독립적인 지적 세계를 키우는 것을 더 소중히 여깁니다.",
    traits: ["전략가", "독립심", "통찰력", "철저함"],
    strengths: ["빠르고 합리적인 분석력", "독창적이고 혁신적인 아이디어", "계획을 끝까지 완수하는 실행력"],
    weaknesses: ["타인의 감정에 대한 무감각함", "과도한 비판적 성향", "사교적 교류 기피"],
    bestMatch: { type: "ENFP", name: "재기발랄한 활동가" },
    worstMatch: { type: "ESFJ", name: "사교적인 외교관" },
    gradient: "from-indigo-50 via-purple-50 to-pink-50",
    textColor: "text-purple-650",
    badgeColor: "bg-purple-100/80 text-purple-700 border-purple-200/50",
    borderColor: "border-purple-300/40"
  },
  INTP: {
    type: "INTP",
    name: "논리적인 사색가",
    englishName: "The Logician",
    summary: "끊임없이 지적 호기심을 탐구하는 지식인",
    description: "INTP는 독창적인 아이디어와 논리적인 사고로 가득 찬 이들입니다. 우주의 신비부터 미시적인 과학 이론까지 세상의 작동 원리를 파악하는 것에 희열을 느낀다. 관습적인 소통에 얽매이지 않고 객관적인 사실을 투명하게 관찰하며, 때로는 타인의 감정을 헤아리는 데 조금 미숙하기도 하지만 지적 정직성만큼은 최고 수준입니다.",
    traits: ["호기심", "논리성", "독창성", "자유주의"],
    strengths: ["분석적이고 체계적인 사고", "열린 태도와 창의적 발상", "객관적이고 정직한 관점"],
    weaknesses: ["실행보다 구상 단계에 머무름", "사소한 세부사항 간과", "사교적인 무관심"],
    bestMatch: { type: "ENTJ", name: "대담한 지도자" },
    worstMatch: { type: "ISFJ", name: "용감한 수호자" },
    gradient: "from-blue-50 via-indigo-50 to-purple-50",
    textColor: "text-indigo-650",
    badgeColor: "bg-indigo-100/80 text-indigo-700 border-indigo-200/50",
    borderColor: "border-indigo-300/40"
  },
  ENTJ: {
    type: "ENTJ",
    name: "대담한 지도자",
    englishName: "The Commander",
    summary: "목표를 향해 효율적으로 이끄는 리더",
    description: "ENTJ는 넘치는 자신감과 카리스마를 바탕으로 목표를 향해 사람들을 단결시키고 이끄는 타고난 리더입니다. 문제를 신속하게 규명하고 장기적인 실행 계획을 설계하는 데 압도적인 재능을 보입니다. 효율성을 생명처럼 소중히 여기며 도전을 두려워하지 않는 개척가 정신을 지니고 있습니다.",
    traits: ["지도자", "대담성", "효율성", "추진력"],
    strengths: ["장기적 비전 제시", "단호하고 강력한 결단력", "목표 완수를 향한 강한 의지"],
    weaknesses: ["지나치게 고집스럽고 지배적인 경향", "참을성이 부족함", "타인의 약점에 대한 엄격함"],
    bestMatch: { type: "INTP", name: "논리적인 사색가" },
    worstMatch: { type: "ISFP", name: "호기심 많은 예술가" },
    gradient: "from-purple-50 via-pink-50 to-rose-50",
    textColor: "text-purple-650",
    badgeColor: "bg-purple-100/80 text-purple-700 border-purple-200/50",
    borderColor: "border-purple-300/40"
  },
  ENTP: {
    type: "ENTP",
    name: "뜨거운 논쟁을 즐기는 변론가",
    englishName: "The Debater",
    summary: "새로운 도전을 멈추지 않는 지적 모험가",
    description: "ENTP는 누구도 생각지 못한 기발한 아이디어로 고정관념을 타파하는 창조적인 지식 탐구가입니다. 지적인 대결과 토론을 좋아하며, 타당한 반론을 바탕으로 사고를 발전시킵니다. 정형화된 루틴과 규칙을 혐오하며, 언제나 새로운 가능성과 즉흥적인 도전을 갈망합니다.",
    traits: ["변론가", "창의성", "유연함", "도전 정신"],
    strengths: ["기발하고 순발력 있는 브레인스토밍", "빠른 학습 능력과 광범위한 관심", "기존 규칙의 파괴적 혁신"],
    weaknesses: ["쉽게 질리고 포기함", "현실적인 구현 및 마무리 부족", "불필요한 논쟁 유발"],
    bestMatch: { type: "INFJ", name: "예언자적 수호자" },
    worstMatch: { type: "ISFJ", name: "용감한 수호자" },
    gradient: "from-pink-50 via-red-50 to-amber-50",
    textColor: "text-pink-650",
    badgeColor: "bg-pink-100/80 text-pink-700 border-pink-200/50",
    borderColor: "border-pink-300/40"
  },
  INFJ: {
    type: "INFJ",
    name: "예언자적 수호자",
    englishName: "The Advocate",
    summary: "조용하면서도 강한 영감으로 세상을 돕는 이상주의자",
    description: "INFJ는 전 세계에서 가장 희귀한 MBTI 유형으로, 마음 깊은 곳에 확고한 도덕적 기준과 인간애를 지니고 있습니다. 타인의 감정을 섬세하게 포착하며 비전을 제시합니다. 단순한 몽상가에 머무르지 않고, 자신이 믿는 이상적인 가치를 현실화하기 위해 부드러우면서도 끈기 있게 실천합니다.",
    traits: ["수호자", "신비주의", "공감 능력", "이타주의"],
    strengths: ["깊고 따뜻한 공감 능력", "도덕적 신념과 실천력", "직관적인 사람 탐구 능력"],
    weaknesses: ["지나치게 높은 기준과 완벽주의", "쉽게 상처받는 내면", "자신의 감정을 밖으로 잘 알리지 않음"],
    bestMatch: { type: "ENTP", name: "뜨거운 논쟁을 즐기는 변론가" },
    worstMatch: { type: "ESTP", name: "모험을 즐기는 활동가" },
    gradient: "from-emerald-50 via-teal-50 to-cyan-50",
    textColor: "text-emerald-700",
    badgeColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200/50",
    borderColor: "border-emerald-300/40"
  },
  INFP: {
    type: "INFP",
    name: "중재자",
    englishName: "The Mediator",
    summary: "나만의 고유한 가치와 의미를 탐구하는 낭만가",
    description: "INFP는 감수성이 풍부하고 상상력이 뛰어난 인도주의자입니다. 자신의 신념에 따라 행동하며, 겉으로는 수줍어 보일 수 있으나 내면에는 세상을 아름답게 바꾸고자 하는 뜨거운 열정이 가득합니다. 사람들의 선한 본성을 깊이 신뢰하며 조화로운 관계를 소중히 생각합니다.",
    traits: ["중재자", "낭만주의", "도덕성", "예술 감각"],
    strengths: ["진정성 있고 깊은 공감 능력", "무한한 상상력과 창의성", "갈등을 치유하는 중재 능력"],
    weaknesses: ["비현실적인 이상주의", "과도한 자기비판과 취약함", "결정을 내릴 때의 우유부단함"],
    bestMatch: { type: "ENFJ", name: "정의로운 활동가" },
    worstMatch: { type: "ESTJ", name: "엄격한 관리자" },
    gradient: "from-teal-50 via-emerald-50 to-green-50",
    textColor: "text-teal-700",
    badgeColor: "bg-teal-100/80 text-teal-800 border-teal-200/50",
    borderColor: "border-teal-300/40"
  },
  ENFJ: {
    type: "ENFJ",
    name: "정의로운 활동가",
    englishName: "The Protagonist",
    summary: "긍정적인 에너지로 모두를 성장시키는 리더",
    description: "ENFJ는 타인의 성장을 돕고 그들의 재능을 발굴하는 데 탁월한 능력을 지닌 교육자이자 조력자입니다. 강한 카리스마와 풍부한 감수성으로 주변 사람들과 깊이 연결되며, 공동체의 발전을 위해 기꺼이 헌신합니다. 따뜻한 성품으로 소외된 이들을 포용하며 긍정적인 파급력을 미칩니다.",
    traits: ["지도력", "이타성", "친화력", "성장 조력"],
    strengths: ["매우 뛰어나고 자연스러운 대인관계 기술", "사람을 이끄는 카리스마", "진정성 있는 이타적 행동"],
    weaknesses: ["타인의 평가에 지나치게 민감함", "과도한 동정심으로 스스로를 소모함", "갈등 회피 경향"],
    bestMatch: { type: "INFP", name: "중재자" },
    worstMatch: { type: "ISTP", name: "만능 재주꾼" },
    gradient: "from-teal-50 via-green-50 to-lime-50",
    textColor: "text-emerald-700",
    badgeColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200/50",
    borderColor: "border-emerald-300/40"
  },
  ENFP: {
    type: "ENFP",
    name: "재기발랄한 활동가",
    englishName: "The Campaigner",
    summary: "삶에 호기심이 많고 에너지가 넘치는 영혼",
    description: "ENFP는 자유로운 영혼의 소유자입니다. 호기심이 많고 에너지가 넘치며, 사회적인 소통을 통해 세상을 따뜻하고 창의적인 눈으로 바라봅니다. 매일 똑같은 반복적인 일상보다는 끊임없이 변화하는 세상을 꿈꾸며 다른 사람들에게 긍정적인 자극을 불어넣습니다.",
    traits: ["자유인", "열정", "친화력", "기발한 상상력"],
    strengths: ["상상력이 풍부하며 긍정적임", "모두와 조화를 이루는 뛰어난 인맥 형성", "열정적인 소통 능력"],
    weaknesses: ["끈기가 부족해 용두사미가 되기 쉬움", "스트레스에 다소 약함", "사소한 약속이나 계획 실천을 간과함"],
    bestMatch: { type: "INTJ", name: "용의주도한 전략가" },
    worstMatch: { type: "ISTJ", name: "청렴결백한 공무원" },
    gradient: "from-amber-50 via-orange-50 to-pink-50",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100/80 text-amber-800 border-amber-200/50",
    borderColor: "border-amber-300/40"
  },
  ISTJ: {
    type: "ISTJ",
    name: "청렴결백한 공무원",
    englishName: "The Logistician",
    summary: "신중하고 철두철미한 책임주의자",
    description: "ISTJ는 사실에 기반한 논리적인 사고방식과 한결같은 책임감으로 가득 찬 세상의 소금 같은 존재입니다. 규칙과 전통을 엄격히 준수하며 가치관에 부합하는 행동을 약속대로 완수합니다. 신뢰성이 매우 높으며 조용하면서도 묵묵히 공동체를 받치는 기둥 역할을 해냅니다.",
    traits: ["책임감", "철저함", "보수성", "성실주의"],
    strengths: ["타협하지 않는 높은 정직성", "체계적이고 정돈된 행동 패턴", "높은 책임감과 끈기"],
    weaknesses: ["변화나 혁신에 보수적임", "조금은 경직된 사고방식", "타인의 감정에 대한 투박한 피드백"],
    bestMatch: { type: "ESFP", name: "자유로운 영혼의 연예인" },
    worstMatch: { type: "ENFP", name: "재기발랄한 활동가" },
    gradient: "from-slate-100 via-zinc-100 to-slate-200",
    textColor: "text-slate-700",
    badgeColor: "bg-slate-200/80 text-slate-800 border-slate-300/50",
    borderColor: "border-slate-350/40"
  },
  ISFJ: {
    type: "ISFJ",
    name: "용감한 수호자",
    englishName: "The Defender",
    summary: "소중한 사람들을 정성스럽게 돌보는 든든한 조력자",
    description: "ISFJ는 따뜻한 마음과 확고한 책임감을 지닌 수호자입니다. 주변 사람들의 작고 사소한 특징까지도 세심하게 기억하여 챙겨주며, 뒤에서 조용하게 헌신하고 조화롭게 돕습니다. 보수적인 원칙을 존중하면서도 필요한 변화를 수용할 줄 아는 열린 태도를 가지고 있습니다.",
    traits: ["수호자", "따뜻함", "겸손함", "헌신"],
    strengths: ["매우 섬세하고 배려 깊은 행동", "성실하고 변치 않는 약속 이행력", "실용적인 서포트 능력"],
    weaknesses: ["지나치게 과도한 책임 공유", "자기 감정을 과도하게 억제함", "급격한 변화에 대한 심적 저항"],
    bestMatch: { type: "ESFP", name: "자유로운 영혼의 연예인" },
    worstMatch: { type: "ENTP", name: "뜨거운 논쟁을 즐기는 변론가" },
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    textColor: "text-sky-700",
    badgeColor: "bg-sky-100/80 text-sky-850 border-sky-200/50",
    borderColor: "border-sky-300/40"
  },
  ESTJ: {
    type: "ESTJ",
    name: "엄격한 관리자",
    englishName: "The Executive",
    summary: "현실을 지배하고 사람들을 체계적으로 이끄는 리더",
    description: "ESTJ는 현실의 규칙과 질서를 지키고 효율적으로 사회를 관리하는 데 최고의 능력을 보여줍니다. 투명하고 명확한 가치관을 바탕으로 상황을 조직화하며, 뜬구름 잡는 이상보다 실행 가능한 구체적 계획에 집중합니다. 도덕적 의무와 공동체적 가치를 중요시합니다.",
    traits: ["조직화", "현실주의", "엄격함", "통솔력"],
    strengths: ["강력한 현실 지배력과 성실함", "명확한 판단과 솔직함", "어려운 과업의 효율적 위임"],
    weaknesses: ["새로운 변화에 다소 거부감", "사적인 감정이나 배려심 부족", "과도하게 고집이 셈"],
    bestMatch: { type: "ISFP", name: "호기심 많은 예술가" },
    worstMatch: { type: "INFP", name: "중재자" },
    gradient: "from-indigo-50 via-purple-50 to-slate-100",
    textColor: "text-indigo-700",
    badgeColor: "bg-indigo-100/80 text-indigo-700 border-indigo-200/50",
    borderColor: "border-indigo-300/40"
  },
  ESFJ: {
    type: "ESFJ",
    name: "사교적인 외교관",
    englishName: "The Consul",
    summary: "주변인에게 친절을 베풀며 화합을 도모하는 외교관",
    description: "ESFJ는 주변을 밝히는 긍정적인 에너지를 내뿜는 사교계의 중심 인물입니다. 타인의 필요와 감정에 고도로 민감하여, 모두가 즐겁고 따뜻하게 소통할 수 있는 환경을 만듭니다. 사회적 도덕이나 규칙을 귀하게 생각하며 다정한 손길을 내미는 데 주저함이 없습니다.",
    traits: ["친화력", "다정다감", "조력가", "사교성"],
    strengths: ["매우 친절하고 사람들을 끄는 매력", "안정적이고 실천적인 봉사 정신", "강한 친화성과 사회적 적응"],
    weaknesses: ["타인의 비판에 쉽게 마음의 상처를 받음", "과도하게 다른 이들의 평판을 우려함", "원칙에 대한 지나친 의존"],
    bestMatch: { type: "ISFP", name: "호기심 많은 예술가" },
    worstMatch: { type: "INTJ", name: "용의주도한 전략가" },
    gradient: "from-pink-50 via-rose-50 to-orange-50",
    textColor: "text-rose-700",
    badgeColor: "bg-rose-100/80 text-rose-800 border-rose-200/50",
    borderColor: "border-rose-300/40"
  },
  ISTP: {
    type: "ISTP",
    name: "만능 재주꾼",
    englishName: "The Virtuoso",
    summary: "상황에 빠르고 냉철하게 적응하는 현실적 실천가",
    description: "ISTP는 기계나 도구를 다루는 데 소질이 있으며 직접 부딪히며 학습하는 현실적인 실용주의자입니다. 위기 상황 속에서도 흔들리지 않는 대담함과 뛰어난 위기 관리 능력을 지니고 있습니다. 복잡한 규칙에 매이기보다 자유롭게 세상을 체험하고 탐구하는 탐험가입니다.",
    traits: ["실용주의", "위기 극복", "도구 조작", "자유인"],
    strengths: ["냉철하고 탁월한 순발력", "실용적인 사물/기술 다루기", "대담하면서도 편안한 삶의 태도"],
    weaknesses: ["타인의 감정을 잘 읽지 못함", "쉽게 지루해하며 위험한 행동을 즐김", "타인과의 타협 및 서약 기피"],
    bestMatch: { type: "ESFJ", name: "사교적인 외교관" },
    worstMatch: { type: "ENFJ", name: "정의로운 활동가" },
    gradient: "from-cyan-50 via-teal-50 to-slate-100",
    textColor: "text-cyan-700",
    badgeColor: "bg-cyan-100/80 text-cyan-800 border-cyan-200/50",
    borderColor: "border-cyan-300/40"
  },
  ISFP: {
    type: "ISFP",
    name: "호기심 많은 예술가",
    englishName: "The Adventurer",
    summary: "유연하며 삶을 오감으로 풍부하게 느끼는 예술가",
    description: "ISFP는 따뜻하고 감수성이 뛰어나며 매 순간을 충만하게 만끽하는 이들입니다. 정형화된 틀이나 계획에 갇히는 것을 싫어하고 새로운 아이디어와 감각을 오감으로 체험하기를 열망합니다. 조용한 성품 뒤에 뜨거운 예술적 본능과 사람에 대한 연민을 숨겨두고 있습니다.",
    traits: ["예술가", "유연성", "오감 발달", "감수성"],
    strengths: ["매우 감성적이고 뛰어난 미적 감각", "유연하고 열린 마음의 소통", "예측 불허의 상황을 헤쳐나가는 적응력"],
    weaknesses: ["계획을 세워 체계적으로 행동하는 데 약함", "미래에 대한 진지한 설계 부족", "타인의 지나친 요구나 간섭을 회피함"],
    bestMatch: { type: "ESTJ", name: "엄격한 관리자" },
    worstMatch: { type: "ENTJ", name: "대담한 지도자" },
    gradient: "from-yellow-50 via-orange-50 to-amber-50",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100/80 text-amber-800 border-amber-200/50",
    borderColor: "border-amber-300/40"
  },
  ESTP: {
    type: "ESTP",
    name: "모험을 즐기는 활동가",
    englishName: "The Entrepreneur",
    summary: "에너지가 넘치고 결단력이 빠른 행동가",
    description: "ESTP는 에너지가 차고 넘치며 매 순간 도전에 뛰어드는 직관적인 행동파입니다. 계산에 집착하지 않고 당장 실천하며 배우는 실용주의적 모험가입니다. 영리하게 사람의 심리를 파악하며 재치 있는 입담과 활발함으로 주변을 흥겹게 이끌어 나갑니다.",
    traits: ["모험가", "빠른 실행", "유쾌함", "위기 대응"],
    strengths: ["탁월한 순발력과 기회 포착 능력", "친근하고 매력적인 유머 감각", "과감하고 대담한 실질적 행동력"],
    weaknesses: ["지나치게 성급하고 충동적인 위험 감수", "깊은 계획과 비전 부재", "섬세하고 조심스러운 대인관계 기술 미흡"],
    bestMatch: { type: "ISFJ", name: "용감한 수호자" },
    worstMatch: { type: "INFJ", name: "예언자적 수호자" },
    gradient: "from-orange-50 via-amber-50 to-red-50",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100/80 text-amber-800 border-amber-200/50",
    borderColor: "border-amber-300/40"
  },
  ESFP: {
    type: "ESFP",
    name: "자유로운 영혼의 연예인",
    englishName: "The Entertainer",
    summary: "매 순간 삶의 아름다움을 밝히는 활력소",
    description: "ESFP는 즉흥적이며 에너지가 가득하고 다정다감한 성품을 지닌 분위기 메이커입니다. 지루한 일상을 거부하고 모든 일에 열정을 쏟아붓습니다. 훌륭한 미적 안목을 가지고 있으며 주변 사람들의 기분과 필요를 빠르게 채워주며 긍정적인 기쁨을 줍니다.",
    traits: ["연예인", "매 순간 몰입", "유쾌함", "화합"],
    strengths: ["매우 뛰어난 활력소 역할", "조화롭고 사교적인 성격", "우수한 실천과 미적 트렌드 포용"],
    weaknesses: ["장기적 약속이나 계획 수행 회피", "감정에 다소 치우쳐 충동적 소비/결정", "집중 시간의 현격한 부족"],
    bestMatch: { type: "ISTJ", name: "청렴결백한 공무원" },
    worstMatch: { type: "INTJ", name: "용의주도한 전략가" },
    gradient: "from-red-50 via-pink-50 to-rose-50",
    textColor: "text-rose-700",
    badgeColor: "bg-rose-100/80 text-rose-800 border-rose-200/50",
    borderColor: "border-rose-300/40"
  }
};

export function getRandomizedQuestions(): Question[] {
  const dimensions: ('EI' | 'SN' | 'TF' | 'JP')[] = ['EI', 'SN', 'TF', 'JP'];
  const selected: Question[] = [];

  dimensions.forEach(dim => {
    const dimQuestions = questions.filter(q => q.dimension === dim);
    // Shuffle the questions for this dimension
    const shuffled = [...dimQuestions].sort(() => Math.random() - 0.5);
    // Select the first 3
    selected.push(...shuffled.slice(0, 3));
  });

  // Shuffle the final selected 12 questions
  return selected.sort(() => Math.random() - 0.5);
}

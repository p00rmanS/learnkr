import { PLACEMENT_TL } from './taglish';

export interface PlacementQ {
  /** Stage 0-4, matching the road */
  level: number;
  prompt: string;
  big?: string;
  options: string[];
  answer: string;
  why: string;
  whyTl?: string;
}

/** Three questions per stage, easiest stage first. */
const RAW_PLACEMENT: PlacementQ[] = [
  // Stage 0: Hangul
  { level: 0, prompt: 'Which letter says "m"?', options: ['ㅂ', 'ㅁ', 'ㄴ'], answer: 'ㅁ', why: 'ㅁ is the outline of closed lips: "m".' },
  { level: 0, prompt: 'How do you read this syllable?', big: '사', options: ['ja', 'ha', 'sa'], answer: 'sa', why: 'ㅅ is "s" and ㅏ is "a".' },
  { level: 0, prompt: 'How do you read this word?', big: '한국', options: ['hanguk', 'hankuh', 'hangeuk'], answer: 'hanguk', why: '한 = han, 국 = guk. Together: hanguk, Korea.' },

  // Stage 1: Survival Korean
  { level: 1, prompt: 'What does 감사합니다 mean?', big: '감사합니다', options: ['Goodbye', 'Thank you', 'I am sorry'], answer: 'Thank you', why: '감사합니다 is a polite thank you.' },
  { level: 1, prompt: 'Which ending fits? 저는 학생___', options: ['예요', '이에요'], answer: '이에요', why: '학생 ends in a consonant, so it takes 이에요.' },
  { level: 1, prompt: 'What is 오천 원?', big: '오천 원', options: ['500 won', '50,000 won', '5,000 won'], answer: '5,000 won', why: '오 (5) times 천 (1,000) is 5,000.' },

  // Stage 2: Building sentences
  { level: 2, prompt: 'Which object marker fits? 밥___ 먹어요', options: ['을', '를'], answer: '을', why: '밥 ends in a consonant, so it takes 을.' },
  { level: 2, prompt: 'What is the past of 먹다?', options: ['먹을 거예요', '먹었어요', '먹아요'], answer: '먹었어요', why: 'ㅓ is a dark vowel, so 었어요.' },
  { level: 2, prompt: 'What does this mean?', big: '내일 친구를 만날 거예요', options: ['I met a friend yesterday', 'I want to meet a friend', 'I will meet a friend tomorrow'], answer: 'I will meet a friend tomorrow', why: '내일 is tomorrow and -(으)ㄹ 거예요 is the future.' },

  // Stage 3: Real conversations
  { level: 3, prompt: 'You finished eating and want to pay. What do you say?', options: ['메뉴판 주세요', '계산해 주세요', '맛있어요'], answer: '계산해 주세요', why: '계산해 주세요 means "the bill, please".' },
  { level: 3, prompt: 'What does this ask?', big: '화장실이 어디예요?', options: ['Where is the bathroom?', 'Do you have a bathroom?', 'What is a bathroom?'], answer: 'Where is the bathroom?', why: '어디 means where.' },
  { level: 3, prompt: 'Someone offers more food and you are full. What do you say?', options: ['정말요?', '괜찮아요', '대박'], answer: '괜찮아요', why: '괜찮아요 politely says "I am fine, no thank you".' },

  // Stage 4: Level Up
  { level: 4, prompt: 'What is 춥다 + 아요/어요?', options: ['춥어요', '추워요', '춥아요'], answer: '추워요', why: 'ㅂ-irregular: the ㅂ drops and 워 is added.' },
  { level: 4, prompt: 'How do you say "I have to go"?', options: ['가고 싶어요', '갈 수 있어요', '가야 해요'], answer: '가야 해요', why: '-아/어야 해요 means must.' },
  { level: 4, prompt: 'Which "because" ending can be followed by a request?', options: ['-아서/어서', '-(으)니까', '-지만'], answer: '-(으)니까', why: '-(으)니까 can be followed by commands and suggestions.' },
];

export const STAGE_NAMES = ['Hangul', 'Survival Korean', 'Building Sentences', 'Real Conversations', 'Level Up'];

export const PLACEMENT: PlacementQ[] = RAW_PLACEMENT.map((q, i) => ({ ...q, whyTl: PLACEMENT_TL[i] ?? '' }));

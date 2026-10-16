import { MORE_STORIES } from './stories-more';

export interface StoryLine {
  ko: string;
  en: string;
  who?: string;
}

export interface Story {
  id: string;
  title: string;
  ko: string;
  level: 'Starter' | 'Easy' | 'Medium';
  kind: 'Dialogue' | 'Story' | 'Diary';
  blurb: string;
  tip: string;
  tl: string;
  vocab: { ko: string; en: string }[];
  lines: StoryLine[];
}

export const STORIES: Story[] = [
  {
    id: 'hello-minsu',
    title: 'Hello, I am Minsu',
    ko: '안녕, 나는 민수야',
    level: 'Starter',
    kind: 'Dialogue',
    blurb: 'Two people meet for the first time.',
    tip: 'After a name, Koreans add 씨 (ssi) to be polite, like "Mr." or "Ms." but with the first name: 민수 씨.',
    tl: 'Ang 씨 ay parang "po" na idinadagdag sa pangalan. Gamitin ito sa kakilala o bagong kakilala, hindi sa malapit na kaibigan.',
    vocab: [
      { ko: '만나서 반갑습니다', en: 'nice to meet you' },
      { ko: '대학생', en: 'university student' },
      { ko: '공부하고 있어요', en: 'am studying' },
      { ko: '아직', en: 'not yet / still' },
    ],
    lines: [
      { who: '민수', ko: '안녕하세요?', en: 'Hello?' },
      { who: '마리아', ko: '안녕하세요? 저는 마리아예요.', en: 'Hello. I am Maria.' },
      { who: '민수', ko: '만나서 반갑습니다. 저는 민수예요.', en: 'Nice to meet you. I am Minsu.' },
      { who: '마리아', ko: '민수 씨는 학생이에요?', en: 'Minsu, are you a student?' },
      { who: '민수', ko: '네, 저는 대학생이에요. 마리아 씨는요?', en: 'Yes, I am a university student. And you, Maria?' },
      { who: '마리아', ko: '저는 필리핀에서 왔어요. 지금 한국어를 공부하고 있어요.', en: 'I am from the Philippines. I am studying Korean now.' },
      { who: '민수', ko: '와, 한국어를 잘해요!', en: 'Wow, you speak Korean well!' },
      { who: '마리아', ko: '아니에요. 아직 조금 해요.', en: 'Oh no, not yet. I only speak a little.' },
    ],
  },
  {
    id: 'at-the-cafe',
    title: 'At the cafe',
    ko: '카페에서',
    level: 'Starter',
    kind: 'Dialogue',
    blurb: 'Order a coffee and pay.',
    tip: 'Staff often say 드릴까요 ("shall I give you?") and 드세요 ("please eat or drink"). They are respectful forms. You answer in normal polite Korean.',
    tl: 'Ang staff ay gumagamit ng mas magalang na anyo (드릴까요, 드세요). Hindi mo kailangang gayahin, sagot lang gamit ang -아요/어요.',
    vocab: [
      { ko: '어서 오세요', en: 'welcome' },
      { ko: '포장', en: 'takeaway' },
      { ko: '카드', en: 'card' },
      { ko: '맛있게 드세요', en: 'enjoy your meal' },
    ],
    lines: [
      { who: '점원', ko: '어서 오세요. 뭐 드릴까요?', en: 'Welcome. What can I get you?' },
      { who: '마리아', ko: '아이스 아메리카노 한 잔 주세요.', en: 'One iced Americano, please.' },
      { who: '점원', ko: '여기에서 드실 거예요?', en: 'Will you have it here?' },
      { who: '마리아', ko: '아니요, 포장해 주세요.', en: 'No, to go, please.' },
      { who: '점원', ko: '사천오백 원이에요.', en: 'It is 4,500 won.' },
      { who: '마리아', ko: '카드로 할게요.', en: 'I will pay by card.' },
      { who: '점원', ko: '감사합니다. 맛있게 드세요.', en: 'Thank you. Enjoy.' },
      { who: '마리아', ko: '감사합니다.', en: 'Thank you.' },
    ],
  },
  {
    id: 'bear-and-honey',
    title: 'The bear and the honey',
    ko: '곰과 꿀',
    level: 'Starter',
    kind: 'Story',
    blurb: 'A tiny story about sharing.',
    tip: 'In stories, a character\'s name can have 아 or 야 added to call them: 곰아 means "Bear!". It is how you call a friend.',
    tl: 'Ang 아/야 sa dulo ng pangalan ay pantawag: 곰아! = "Oy, Bear!" Ginagamit lang ito sa kaibigan o bata.',
    vocab: [
      { ko: '곰', en: 'bear' },
      { ko: '꿀', en: 'honey' },
      { ko: '벌', en: 'bee' },
      { ko: '친구', en: 'friend' },
    ],
    lines: [
      { ko: '숲속에 곰이 살아요.', en: 'A bear lives in the forest.' },
      { ko: '곰은 꿀을 좋아해요.', en: 'The bear likes honey.' },
      { ko: '어느 날, 곰은 꿀이 없어요.', en: 'One day, the bear has no honey.' },
      { ko: '곰은 슬퍼요.', en: 'The bear is sad.' },
      { ko: '작은 벌이 와요. "곰아, 울지 마! 내 꿀을 줄게!"', en: 'A small bee comes. "Bear, do not cry! I will give you my honey!"' },
      { ko: '곰은 기뻐요.', en: 'The bear is happy.' },
      { ko: '곰은 "고마워!" 하고 말해요.', en: 'The bear says, "Thank you!"' },
      { ko: '이제 곰과 벌은 친구예요.', en: 'Now the bear and the bee are friends.' },
    ],
  },
  {
    id: 'my-family',
    title: 'My family',
    ko: '우리 가족',
    level: 'Easy',
    kind: 'Story',
    blurb: 'Maria introduces the people at home.',
    tip: '우리 means "our", and Koreans say "our family" (우리 가족) even when they mean "my". Saying "my family" (제 가족) sounds oddly lonely.',
    tl: 'Sa Korean, "우리" (amin/atin) ang ginagamit kahit ang ibig sabihin ay "akin": 우리 엄마 = nanay ko (literal na nanay namin). Parang "kami".',
    vocab: [
      { ko: '우리', en: 'our / we' },
      { ko: '가족', en: 'family' },
      { ko: '의사', en: 'doctor' },
      { ko: '사랑해요', en: 'love' },
    ],
    lines: [
      { ko: '안녕하세요. 저는 마리아예요.', en: 'Hello. I am Maria.' },
      { ko: '우리 가족은 다섯 명이에요.', en: 'There are five people in my family.' },
      { ko: '아빠, 엄마, 오빠, 저, 그리고 동생이 있어요.', en: 'There are dad, mom, my older brother, me, and my younger sibling.' },
      { ko: '아빠는 의사예요.', en: 'My dad is a doctor.' },
      { ko: '엄마는 선생님이에요.', en: 'My mom is a teacher.' },
      { ko: '오빠는 회사에서 일해요.', en: 'My older brother works at a company.' },
      { ko: '동생은 학생이에요.', en: 'My younger sibling is a student.' },
      { ko: '저는 우리 가족을 사랑해요.', en: 'I love my family.' },
    ],
  },
  {
    id: 'my-day',
    title: 'My day',
    ko: '나의 하루',
    level: 'Easy',
    kind: 'Diary',
    blurb: 'From morning to bedtime.',
    tip: '에 marks the time: 일곱 시에 (at seven o\'clock), 저녁에 (in the evening). Hours use native numbers like 일곱, 아홉, 열한.',
    tl: 'Ang 에 ay "sa" para sa oras: 일곱 시에 = "alas-siyete". Native number ang oras (일곱, 아홉, 열한), at ang 아침/점심/저녁 ay umaga/tanghali/gabi.',
    vocab: [
      { ko: '아침', en: 'morning' },
      { ko: '점심', en: 'lunch / noon' },
      { ko: '저녁', en: 'evening' },
      { ko: '일어나요', en: 'wake up' },
    ],
    lines: [
      { ko: '저는 아침 일곱 시에 일어나요.', en: 'I wake up at seven in the morning.' },
      { ko: '아침에 빵을 먹고 커피를 마셔요.', en: 'In the morning I eat bread and drink coffee.' },
      { ko: '아홉 시에 학교에 가요.', en: 'At nine o\'clock I go to school.' },
      { ko: '학교에서 한국어를 공부해요.', en: 'At school I study Korean.' },
      { ko: '점심에 친구와 같이 밥을 먹어요.', en: 'At lunch I eat with a friend.' },
      { ko: '저녁에 집에서 쉬어요.', en: 'In the evening I rest at home.' },
      { ko: '밤 열한 시에 자요.', en: 'At eleven at night I sleep.' },
    ],
  },
  {
    id: 'rainy-day',
    title: 'A rainy day',
    ko: '비 오는 날',
    level: 'Easy',
    kind: 'Story',
    blurb: 'No umbrella, but a good friend.',
    tip: '에게 means "to someone": 친구에게 전화했어요 (I called my friend). In everyday speech, 한테 is used the same way.',
    tl: 'Ang 에게 ay "kay": 친구에게 = kay kaibigan. Sa usapan, mas karaniwan ang 한테. Pareho lang ang kahulugan.',
    vocab: [
      { ko: '우산', en: 'umbrella' },
      { ko: '전화했어요', en: 'called' },
      { ko: '기다려 주세요', en: 'please wait' },
      { ko: '같이', en: 'together' },
    ],
    lines: [
      { ko: '오늘은 비가 와요.', en: 'Today it is raining.' },
      { ko: '우산이 없어요.', en: 'I do not have an umbrella.' },
      { ko: '친구에게 전화했어요. "여보세요? 비가 와요. 우산 있어요?"', en: 'I called my friend. "Hello? It is raining. Do you have an umbrella?"' },
      { ko: '친구가 말했어요. "네, 있어요. 기다려 주세요!"', en: 'My friend said, "Yes, I do. Please wait!"' },
      { ko: '친구가 우산을 가지고 왔어요.', en: 'My friend brought an umbrella.' },
      { ko: '우리는 같이 집에 갔어요.', en: 'We went home together.' },
      { ko: '비가 오는 날도 좋아요.', en: 'Rainy days are good too.' },
    ],
  },
  {
    id: 'hare-and-tortoise',
    title: 'The hare and the tortoise',
    ko: '토끼와 거북이',
    level: 'Medium',
    kind: 'Story',
    blurb: 'The classic fable, in simple past tense.',
    tip: 'Most of this story is in the past tense (-았어요 / -었어요). Look for ㅆ at the end of verbs: 살았어요, 달렸어요, 도착했어요.',
    tl: 'Halos lahat ng pandiwa ay may ㅆ (past): 살았어요, 달렸어요, 도착했어요. Kapag nakita mo ang ㅆ sa dulo, tapos na ang pangyayari. Tulad ng "kuwento ni Lola".',
    vocab: [
      { ko: '토끼', en: 'rabbit / hare' },
      { ko: '거북이', en: 'tortoise' },
      { ko: '빨랐어요', en: 'was fast' },
      { ko: '느렸어요', en: 'was slow' },
      { ko: '도착했어요', en: 'arrived' },
    ],
    lines: [
      { ko: '옛날 옛날에 토끼와 거북이가 살았어요.', en: 'Once upon a time, a hare and a tortoise lived.' },
      { ko: '토끼는 빨랐어요. 거북이는 느렸어요.', en: 'The hare was fast. The tortoise was slow.' },
      { ko: '어느 날, 토끼가 말했어요. "나는 너보다 빨라!"', en: 'One day the hare said, "I am faster than you!"' },
      { ko: '거북이가 말했어요. "그럼 달리기를 해요."', en: 'The tortoise said, "Then let us race."' },
      { ko: '토끼는 빨리 달렸어요.', en: 'The hare ran fast.' },
      { ko: '그리고 나무 아래에서 잠을 잤어요.', en: 'And he slept under a tree.' },
      { ko: '거북이는 천천히 걸었어요. 쉬지 않았어요.', en: 'The tortoise walked slowly. He did not rest.' },
      { ko: '거북이가 먼저 도착했어요!', en: 'The tortoise arrived first!' },
      { ko: '천천히 가도 괜찮아요. 포기하지 마세요!', en: 'It is okay to go slowly. Do not give up!' },
    ],
  },
  {
    id: 'trip-to-seoul',
    title: 'A trip to Seoul',
    ko: '서울 여행',
    level: 'Medium',
    kind: 'Diary',
    blurb: 'A travel diary with past tense and plans.',
    tip: '으로 / 로 means "by": 비행기로 (by plane), 지하철로 (by subway), 카드로 (by card). The same little particle shows up everywhere.',
    tl: 'Ang 로 ay "sa pamamagitan ng": 비행기로 = sa eroplano. Natutunan mo na ito sa 카드로 할게요. Pareho ang gamit sa transportasyon.',
    vocab: [
      { ko: '비행기', en: 'plane' },
      { ko: '지난주', en: 'last week' },
      { ko: '첫날', en: 'first day' },
      { ko: '한복', en: 'hanbok (traditional dress)' },
      { ko: '다시', en: 'again' },
    ],
    lines: [
      { ko: '저는 지난주에 서울에 갔어요.', en: 'I went to Seoul last week.' },
      { ko: '비행기로 네 시간 걸렸어요.', en: 'It took four hours by plane.' },
      { ko: '호텔은 지하철역에서 가까웠어요.', en: 'The hotel was close to the subway station.' },
      { ko: '첫날에 삼겹살을 먹었어요. 정말 맛있었어요!', en: 'On the first day I ate pork belly. It was really delicious!' },
      { ko: '둘째 날에는 경복궁에 갔어요.', en: 'On the second day I went to Gyeongbokgung Palace.' },
      { ko: '한복을 입고 사진을 많이 찍었어요.', en: 'I wore a hanbok and took many photos.' },
      { ko: '서울이 너무 좋아요. 다시 가고 싶어요!', en: 'I love Seoul so much. I want to go again!' },
    ],
  },
  ...MORE_STORIES,
];

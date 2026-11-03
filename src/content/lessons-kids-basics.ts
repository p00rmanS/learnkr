import type { Lesson } from './lessons';
import { ch, tc } from './lessons-everyday';

const k = (id: string, korean: string, english: string) => ({ id: `k8.${id}`, korean, english });

export const KIDS8: Lesson[] = [
  {
    id: 'K32',
    phase: 5,
    title: 'In the vegetable garden',
    ko: '채소 밭',
    blurb: 'Carrots, potatoes, onions and tomatoes.',
    items: [
      k('당근', '당근', 'carrot'),
      k('감자', '감자', 'potato'),
      k('양파', '양파', 'onion'),
      k('토마토', '토마토', 'tomato'),
    ],
    steps: [
      tc(
        'Garden vegetables',
        ['채소 means vegetables. 당근 is a carrot, 감자 is a potato, 양파 is an onion, and 토마토 is a tomato.', 'Pick one and say what it is. Carrots are long and orange, and tomatoes are round and red.'],
        'Ang 채소 ay gulay. Ang 당근 ay karot, 감자 ay patatas, 양파 ay sibuyas, at 토마토 ay kamatis.',
        'Name the vegetables in your kitchen as you see them.',
        'Carrot is 당근 (dang-geun): say "dang" like a bell, then "geun".',
        [
          { ko: '당근', en: 'carrot' },
          { ko: '토마토', en: 'tomato' },
        ],
      ),
      tc(
        'I like it',
        ['Say 좋아해요 (I like it) after the vegetable. 감자를 좋아해요 means "I like potatoes".', 'Say 싫어해요 (I do not like it) if you do not like it. It is okay, everyone has favourites.'],
        'Sabihin ang 좋아해요 = "Gusto ko." 감자를 좋아해요 = "Gusto ko ang patatas."',
        'Tell a grown-up your favourite vegetable at dinner.',
        'Like is 좋아해요: 좋 is good, so you like what is good.',
        [
          { ko: '감자를 좋아해요.', en: 'I like potatoes.' },
          { ko: '양파를 싫어해요.', en: 'I do not like onions.' },
        ],
      ),
      ch('Which vegetable is round and red?', '토마토', ['당근', '양파'], '토마토 is tomato. 당근 is carrot and 양파 is onion.', 'Ang 토마토 ay kamatis.'),
      ch('"I like potatoes." Which is correct?', '감자를 좋아해요.', ['감자를 마셔요.', '감자를 읽어요.'], '좋아해요 means like. The other two mean drink and read.', 'Gusto ko ang patatas.'),
    ],
  },
  {
    id: 'K33',
    phase: 5,
    title: 'Fruit basket',
    ko: '과일 바구니',
    blurb: 'Sweet and sour fruits.',
    items: [
      k('딸기', '딸기', 'strawberry'),
      k('레몬', '레몬', 'lemon'),
      k('복숭아', '복숭아', 'peach'),
      k('오렌지', '오렌지', 'orange'),
    ],
    steps: [
      tc(
        'Fruit words',
        ['과일 means fruit. 딸기 is a strawberry, 복숭아 is a peach, 레몬 is a lemon, and 오렌지 is an orange.', 'Lemons are sour and strawberries are sweet. Say 맛있어요 (it is tasty) when you like a fruit.'],
        'Ang 과일 ay prutas. Ang 딸기 ay strawberry, 복숭아 ay peach, 레몬 ay lemon, at 오렌지 ay orange. Sabihin ang 맛있어요 kapag masarap.',
        'At snack time, say 딸기 주세요 (strawberries, please).',
        'Strawberry is 딸기 (dal-gi): say "dal" like a drum, then "gi".',
        [
          { ko: '딸기', en: 'strawberry' },
          { ko: '레몬', en: 'lemon' },
        ],
      ),
      tc(
        'Please and thank you',
        ['When you want a fruit, say 주세요 (please give me). 과일 주세요 means "fruit, please".', 'When someone gives it to you, say 감사합니다 (thank you).'],
        'Sabihin ang 주세요 = "pakibigay." Pagkatapos, sabihin ang 감사합니다 = "Salamat po."',
        'Always say 감사합니다 with a smile.',
        'Please is 주세요: "joo-seh-yo", like giving a gift to someone.',
        [
          { ko: '딸기 주세요.', en: 'Strawberries, please.' },
          { ko: '감사합니다!', en: 'Thank you!' },
        ],
      ),
      ch('Which fruit is sour and yellow?', '레몬', ['딸기', '복숭아'], '레몬 is lemon. 딸기 is strawberry and 복숭아 is peach.', 'Ang 레몬 ay lemon.'),
      ch('Which word means "orange"?', '오렌지', ['레몬', '사과'], '오렌지 is orange. 레몬 is lemon and 사과 is apple.', 'Ang 오렌지 ay orange.'),
    ],
  },
  {
    id: 'K34',
    phase: 5,
    title: 'What time is it?',
    ko: '몇 시예요?',
    blurb: 'Learn the hours on the clock.',
    items: [
      k('몇시예요', '몇 시예요?', 'What time is it?'),
      k('세시예요', '세 시예요.', 'It is 3 o clock.'),
      k('여섯시예요', '여섯 시예요.', 'It is 6 o clock.'),
    ],
    steps: [
      tc(
        'Hours on the clock',
        ['시 means o clock. 한 시 is one o clock, 두 시 is two o clock, 세 시 is three o clock.', 'Ask the time with 몇 시예요? ("what time is it?").'],
        'Ang 시 ay "o\'clock". Ang 한 시 ay ala-una, 두 시 ay ala-dos, 세 시 ay ala-tres. Itanong ang oras sa 몇 시예요?',
        'Look at a clock at home and say the hour.',
        'Ask 몇 시예요? and answer with the hour plus 시: 세 시예요.',
        [
          { ko: '몇 시예요?', en: 'What time is it?' },
          { ko: '세 시예요.', en: 'It is 3 o clock.' },
        ],
      ),
      tc(
        'Time to eat',
        ['At dinner, you can say 여섯 시예요 ("it is six o clock"). Then say 밥 먹어요 (let us eat).', 'The hours always use the small numbers you learned: 한, 두, 세, 네, 다섯, 여섯.'],
        'Sa hapunan, sabihin ang 여섯 시예요 = "Alas-sais na." Tapos ang 밥 먹어요 = "Kumain na tayo."',
        'When the clock says six, say 밥 먹어요!',
        'Six is 여섯 (yeo-seot): "yeo-seot" sounds like "yes, sorts".',
        [
          { ko: '여섯 시예요.', en: 'It is 6 o clock.' },
          { ko: '밥 먹어요!', en: 'Let us eat!' },
        ],
      ),
      ch('Which means "3 o clock"?', '세 시예요.', ['세 살이에요.', '세 개예요.'], '시 is o clock. 살 is age and 개 counts things.', 'Alas-tres na.'),
      ch('Which question asks the time?', '몇 시예요?', ['몇 살이에요?', '몇 개예요?'], '몇 시 asks the hour. 몇 살 asks age.', 'Anong oras na?'),
    ],
  },
  {
    id: 'K35',
    phase: 5,
    title: 'My house',
    ko: '우리 집',
    blurb: 'Kitchen, bathroom, bedroom and living room.',
    items: [
      k('부엌', '부엌', 'kitchen'),
      k('화장실', '화장실', 'bathroom'),
      k('침실', '침실', 'bedroom'),
      k('거실', '거실', 'living room'),
    ],
    steps: [
      tc(
        'Rooms in my home',
        ['집 is a house. 부엌 is the kitchen. 화장실 is the bathroom. 침실 is the bedroom, and 거실 is the living room.', 'In Korea people take off their shoes at the door before they walk in.'],
        'Ang 집 ay bahay. Ang 부엌 ay kusina, 화장실 ay banyo, 침실 ay kuwarto, at 거실 ay sala.',
        'Point to each room in your home and say its name.',
        'Kitchen is 부엌, and it sounds like "book" in a hurry.',
        [
          { ko: '부엌', en: 'kitchen' },
          { ko: '침실', en: 'bedroom' },
        ],
      ),
      tc(
        'Where are you?',
        ['Say 저는 부엌에 있어요 ("I am in the kitchen"). 에 means "in" or "at" a place.', 'Ask 화장실 어디예요? if you need the bathroom.'],
        'Sabihin ang 저는 부엌에 있어요 = "Nasa kusina ako." Itanong ang 화장실 어디예요? kung kailangan mo ng banyo.',
        'If you need the bathroom, say 화장실 어디예요? politely.',
        'Where are you: 어디예요. Say the room, then 에 있어요.',
        [
          { ko: '저는 부엌에 있어요.', en: 'I am in the kitchen.' },
          { ko: '화장실 어디예요?', en: 'Where is the bathroom?' },
        ],
      ),
      ch('Where do we cook food?', '부엌', ['화장실', '침실'], '부엌 is the kitchen, where food is cooked.', 'Sa kusina nagluluto.'),
      ch('Where do we sleep?', '침실', ['거실', '부엌'], '침실 is the bedroom. 거실 is the living room.', 'Ang 침실 ay kuwarto-tulugan.'),
    ],
  },
  {
    id: 'K36',
    phase: 5,
    title: 'Arms, knees and fingers',
    ko: '팔 · 무릎 · 손가락',
    blurb: 'More body parts to point at.',
    items: [
      k('팔', '팔', 'arm'),
      k('어깨', '어깨', 'shoulder'),
      k('무릎', '무릎', 'knee'),
      k('손가락', '손가락', 'finger'),
    ],
    steps: [
      tc(
        'Point and name',
        ['팔 is your arm. 어깨 is your shoulder. 무릎 is your knee. 손가락 is your finger.', 'Touch each part as you say it. Your body becomes your flashcards.'],
        'Ang 팔 ay braso. Ang 어깨 ay balikat. Ang 무릎 ay tuhod. Ang 손가락 ay daliri.',
        'Say the name, then touch the part.',
        'Knee is 무릎 (mu-reup). Bend your knee when you say it.',
        [
          { ko: '팔', en: 'arm' },
          { ko: '무릎', en: 'knee' },
        ],
      ),
      tc(
        'Ouch!',
        ['If something hurts, say the part and 아파요: 무릎이 아파요 ("my knee hurts").', 'Tell a grown-up right away so they can help you.'],
        'Kung masakit, sabihin ang bahagi at 아파요: 무릎이 아파요 = "Masakit ang tuhod ko."',
        'Tell a grown-up 아파요 when you are hurt.',
        '아파요 sounds like "ah-pa-yo", the sound you make when you bump something.',
        [
          { ko: '무릎이 아파요.', en: 'My knee hurts.' },
          { ko: '팔이 아파요.', en: 'My arm hurts.' },
        ],
      ),
      ch('Which word means "knee"?', '무릎', ['어깨', '손가락'], '무릎 is the knee. 어깨 is the shoulder and 손가락 is the finger.', 'Ang 무릎 = tuhod.'),
      ch('Which means "my arm hurts"?', '팔이 아파요.', ['팔이 좋아요.', '팔을 먹어요.'], '아파요 means hurts. 좋아요 means good.', 'Masakit ang braso ko.'),
    ],
  },
  {
    id: 'K37',
    phase: 5,
    title: 'Up, down, front and back',
    ko: '위 · 아래 · 앞 · 뒤',
    blurb: 'Where is my toy?',
    items: [
      k('위', '위', 'top'),
      k('아래', '아래', 'bottom'),
      k('앞', '앞', 'in front'),
      k('뒤', '뒤', 'behind'),
      k('옆', '옆', 'beside'),
    ],
    steps: [
      tc(
        'Where is it?',
        ['위 is up, on top. 아래 is down, under. 앞 is in front. 뒤 is behind. 옆 is beside.', 'Put a toy on the table and say where it is: 책상 위에 있어요 ("it is on the table").'],
        'Ang 위 ay nasa itaas. Ang 아래 ay nasa ibaba. Ang 앞 ay nasa harap, ang 뒤 ay nasa likod, at ang 옆 ay nasa tabi.',
        'Play hide and seek and use the words to find things.',
        'Up is 위: "wee" goes up. Down is 아래: "ah-rae" goes down.',
        [
          { ko: '책상 위에 있어요.', en: 'It is on the table.' },
          { ko: '의자 뒤에 있어요.', en: 'It is behind the chair.' },
        ],
      ),
      tc(
        'Find it!',
        ['Ask 어디 있어요? ("where is it?") and answer with the position and 에 있어요.', 'If your friend is next to you, say 옆에 있어요.'],
        'Itanong ang 어디 있어요? = "Nasaan?" Sagutin ng posisyon at 에 있어요.',
        'Use 어디 있어요? in hide and seek.',
        'Where is it: 어디 있어요. Answer with the place, then 있어요.',
        [
          { ko: '어디 있어요?', en: 'Where is it?' },
          { ko: '옆에 있어요.', en: 'It is beside you.' },
        ],
      ),
      ch('The ball is UP on the shelf. Which word?', '위', ['아래', '뒤'], '위 is up or on top. 아래 is down.', 'Nasa itaas = 위.'),
      ch('Which word means "behind"?', '뒤', ['앞', '옆'], '뒤 is behind. 앞 is in front and 옆 is beside.', 'Ang 뒤 = likod.'),
    ],
  },
  {
    id: 'K38',
    phase: 5,
    title: 'Breakfast time',
    ko: '아침 먹어요',
    blurb: 'Juice, eggs, noodles and milk.',
    items: [
      k('주스', '주스', 'juice'),
      k('계란', '계란', 'egg'),
      k('국수', '국수', 'noodles'),
      k('우유', '우유', 'milk'),
    ],
    steps: [
      tc(
        'Good morning breakfast',
        ['주스 is juice, 계란 is an egg, 국수 is noodles, and 우유 is milk.', 'Count eggs with 개 (things): 계란 두 개 ("two eggs").'],
        'Ang 주스 ay juice, 계란 ay itlog, 국수 ay pansit, at 우유 ay gatas. Bilangin ang itlog ng 개.',
        'At breakfast, say 우유 주세요 ("milk, please").',
        'Eggs are 계란 (gye-ran): "gay ran" to get eggs.',
        [
          { ko: '우유 주세요.', en: 'Milk, please.' },
          { ko: '계란 두 개 주세요.', en: 'Two eggs, please.' },
        ],
      ),
      tc(
        'Eat and drink',
        ['Use 먹어요 (eat) with food and 마셔요 (drink) with drinks.', 'Say 우유를 마셔요 ("I drink milk") and 계란을 먹어요 ("I eat an egg").'],
        'Gamitin ang 먹어요 para sa pagkain at 마셔요 para sa inumin. 우유를 마셔요 = "Umiinom ako ng gatas."',
        'Say 아침 먹었어요? ("did you eat breakfast?") when you see a friend.',
        'Eat is 먹어요, drink is 마셔요: eat with a fork, drink with a cup.',
        [
          { ko: '우유를 마셔요.', en: 'I drink milk.' },
          { ko: '계란을 먹어요.', en: 'I eat an egg.' },
        ],
      ),
      ch('"Two eggs, please." Which is right?', '계란 두 개 주세요.', ['계란 두 명 주세요.', '계란 두 살 주세요.'], '개 counts things. 명 counts people and 살 is age.', 'Dalawang itlog po.'),
      ch('Which word means "noodles"?', '국수', ['우유', '주스'], '국수 is noodles. 우유 is milk and 주스 is juice.', 'Ang 국수 = pansit.'),
    ],
  },
  {
    id: 'K39',
    phase: 5,
    title: 'School time',
    ko: '학교 시간',
    blurb: 'Math, science, art and music.',
    items: [
      k('수학', '수학', 'math'),
      k('과학', '과학', 'science'),
      k('미술', '미술', 'art'),
      k('음악', '음악', 'music'),
    ],
    steps: [
      tc(
        'Subjects at school',
        ['수학 is math, 과학 is science, 미술 is art, and 음악 is music.', 'Add 시간 to a subject for "class time": 음악 시간 means "music class".'],
        'Ang 수학 ay math, 과학 ay science, 미술 ay sining, at 음악 ay musika. Idagdag ang 시간 para sa "oras ng klase".',
        'Ask your friend 음악 좋아해요? ("do you like music?").',
        'Math is 수학 (su-hak): say "sue, hack" the problem.',
        [
          { ko: '수학', en: 'math' },
          { ko: '음악', en: 'music' },
        ],
      ),
      tc(
        'My favourite',
        ['Say 과학을 좋아해요 ("I like science") to tell what you like. 과학 ends with a consonant, so it takes 을.', 'Say 수학이 어려워요 ("math is hard") or 쉬워요 ("easy") when it feels that way.'],
        'Sabihin ang 과학을 좋아해요 = "Gusto ko ang science." 수학이 어려워요 = "Mahirap ang math."',
        'Tell your teacher one thing you like in class.',
        'Easy is 쉬워요 (shwi-woe): like a sweet, easy to eat.',
        [
          { ko: '과학을 좋아해요.', en: 'I like science.' },
          { ko: '수학이 어려워요.', en: 'Math is hard.' },
        ],
      ),
      ch('Which means "I like music"?', '음악을 좋아해요.', ['음악을 먹어요.', '음악을 마셔요.'], '좋아해요 means like. 먹어요 means eat and 마셔요 means drink.', 'Gusto ko ang musika.'),
      ch('Which word means "art"?', '미술', ['음악', '과학'], '미술 is art. 음악 is music and 과학 is science.', 'Ang 미술 = sining.'),
    ],
  },
];

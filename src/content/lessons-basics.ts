import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const b = (id: string, korean: string, english: string) => ({ id: `b.${id}`, korean, english });

export const BASICS: Lesson[] = [
  {
    id: '0.12',
    phase: 0,
    deep: true,
    title: 'Vegetables',
    ko: '채소',
    blurb: 'The vegetables in every Korean kitchen.',
    items: [
      b('당근', '당근', 'carrot'),
      b('감자', '감자', 'potato'),
      b('양파', '양파', 'onion'),
      b('토마토', '토마토', 'tomato'),
    ],
    steps: [
      {
        ...dtc(
          'The vegetable shelf',
          [
            '채소 is the word for vegetables. 당근 is a carrot, 감자 is a potato, 양파 is an onion, and 토마토 is a tomato.',
            'Most of these are native Korean words except 토마토, which was borrowed from English and kept its shape.',
          ],
          'Ang 채소 ay gulay. Ang 당근 ay karot, 감자 ay patatas, 양파 ay sibuyas, at 토마토 ay kamatis. Halos katutubong salita ang mga ito, maliban sa 토마토 na hiram sa English.',
          'Walk a supermarket and name what you see. Korean vegetables are cheap and everywhere.',
          'The 감자 potato is a "gam-ja" pronounced fast, like "gam-jah".',
          [
            { ko: '당근', en: 'carrot' },
            { ko: '감자', en: 'potato' },
            { ko: '양파', en: 'onion' },
            { ko: '토마토', en: 'tomato' },
          ],
        ),
        tips: [
          'Learn vegetables with the food you eat: 김치 is made with 배추, so 배추 (cabbage) is the first one to learn.',
          'Say 저는 당근을 좋아해요 ("I like carrots") to practise the object marker 을/를 with a vegetable.',
        ],
        locals: [
          { ko: '채소 좀 주세요.', en: 'Some vegetables, please.', note: 'Said at a market stall. 좀 keeps it gentle.' },
          { ko: '감자 싸요!', en: 'The potatoes are cheap!', note: 'Market sellers shout this. 싸요 means cheap.' },
        ],
      },
      {
        ...dtc(
          'Like and dislike',
          [
            'Use 좋아해요 (like) and 싫어해요 (dislike) after the thing you like: 감자를 좋아해요 means "I like potatoes".',
            'Notice that the thing takes 을 or 를, just like any object.',
          ],
          'Gamitin ang 좋아해요 (gusto) at 싫어해요 (ayaw) pagkatapos ng bagay: 감자를 좋아해요 = "Gusto ko ang patatas." Ang bagay ay may 을 o 를, tulad ng ibang layon.',
          'Say 싫어해요 politely when you dislike something. 저는 양파를 싫어해요 is a gentle way to say it.',
          'Like-ing is 좋아해요: the 좋 is "good", so you like it because it is good for you.',
          [
            { ko: '감자를 좋아해요.', en: 'I like potatoes.' },
            { ko: '저는 양파를 싫어해요.', en: 'I dislike onions.' },
          ],
        ),
        tips: [
          'Soften a dislike with 좀: 좀 싫어해요 ("I do not really like it").',
          'When a list of vegetables comes up, separate them with 하고: 당근하고 감자 ("carrot and potato").',
        ],
        locals: [
          { ko: '저 양파 싫어해요.', en: 'I do not like onions.', note: 'Casual version. Friends drop 는 and say it short.' },
          { ko: '토마토 좋아해요?', en: 'Do you like tomatoes?', note: 'A common question at a meal. Answer 네 or 아니요.' },
        ],
      },
      ch('Which word means "carrot"?', '당근', ['감자', '토마토'], '당근 is carrot. 감자 is potato and 토마토 is tomato.', '당근 = karot.'),
      ch('"I like potatoes." Which is correct?', '감자를 좋아해요.', ['감자를 마셔요.', '감자를 읽어요.'], '좋아해요 means like. 마셔요 means drink and 읽어요 means read.', 'Gusto ko ang patatas = 감자를 좋아해요.'),
    ],
  },
  {
    id: '0.13',
    phase: 0,
    deep: true,
    title: 'Fruits',
    ko: '과일',
    blurb: 'Sweet words you can say at a fruit stand.',
    items: [
      b('오렌지', '오렌지', 'orange'),
      b('딸기', '딸기', 'strawberry'),
      b('복숭아', '복숭아', 'peach'),
      b('레몬', '레몬', 'lemon'),
    ],
    steps: [
      {
        ...dtc(
          'Fruit at the stand',
          [
            '과일 is fruit. 딸기 is strawberry, 복숭아 is peach, 레몬 is lemon, and 오렌지 is orange. Many fruits in Korea have English-style names, so they are easy to remember.',
            'Fruit is a common gift in Korea, especially around the holidays.',
          ],
          'Ang 과일 ay prutas. Ang 딸기 ay strawberry, 복숭아 ay peach, 레몬 ay lemon, at 오렌지 ay orange. Marami sa mga prutas sa Korea ay may pangalang kamukha ng English, kaya madaling tandaan.',
          'Say 과일 사요 ("I am buying fruit") at a stand. It works everywhere.',
          'Strawberry is 딸기 (dal-gi): "dal" like "dahl" and "gi" like "gee".',
          [
            { ko: '딸기', en: 'strawberry' },
            { ko: '복숭아', en: 'peach' },
            { ko: '레몬', en: 'lemon' },
          ],
        ),
        tips: [
          'Fruit is often sold in boxes. Ask 이거 얼마예요? ("how much is this?") before you pick.',
          'Some fruit words are borrowed from English (레몬, 오렌지), so you already know the meaning.',
        ],
        locals: [
          { ko: '과일 선물 사요.', en: 'I am buying fruit as a gift.', note: 'Locals bring fruit to a home visit. It is always appreciated.' },
          { ko: '딸기 맛있어요!', en: 'The strawberries are delicious!', note: 'Strawberries are a seasonal favourite in spring.' },
        ],
      },
      {
        ...dtc(
          'Counting fruit',
          [
            'Count fruit with the counter 개 (things): 딸기 두 개 means "two strawberries". Native numbers work with 개: 하나, 둘, 셋.',
            'Ask for the price with 얼마예요? and reply with a number and 원.',
          ],
          'Bilangin ang prutas gamit ang 개 (bagay): 딸기 두 개 = "Dalawang strawberry." Gamitin ang katutubong bilang: 하나, 둘, 셋.',
          'Practise counting the fruit in front of you: 하나, 둘, 셋, 넷.',
          'One fruit is 한 개, the fruit counter is 개, so it is "gae" for each one.',
          [
            { ko: '딸기 두 개 주세요.', en: 'Two strawberries, please.' },
            { ko: '레몬 한 개 주세요.', en: 'One lemon, please.' },
          ],
        ),
        tips: [
          'Use 주세요 for "please give me": 딸기 주세요.',
          'For a whole box, say 한 박스 (one box) instead of counting each fruit.',
        ],
        locals: [
          { ko: '한 개에 얼마예요?', en: 'How much for one?', note: 'Asking the price per piece at a market.' },
        ],
      },
      ch('Which word means "strawberry"?', '딸기', ['사과', '포도'], '딸기 is strawberry. 사과 is apple and 포도 is grape.', '딸기 = strawberry.'),
      ch('Which fruit name is the same as English "lemon"?', '레몬', ['수박', '딸기'], '레몬 was borrowed from English. 수박 is watermelon and 딸기 is strawberry.', 'Hiram sa English ang 레몬.'),
    ],
  },
  {
    id: '0.14',
    phase: 0,
    deep: true,
    title: 'What time is it?',
    ko: '몇 시예요?',
    blurb: 'Hours, half past and minutes.',
    items: [
      b('지금몇시', '지금 몇 시예요?', 'What time is it now?'),
      b('세시십분', '세 시 십 분이에요.', 'It is 3:10.'),
      b('한시반', '한 시 반이에요.', 'It is 1:30.'),
    ],
    steps: [
      {
        ...dtc(
          'Hours use native numbers',
          [
            'The hour uses the native Korean numbers and the counter 시: 한 시 (1 o clock), 두 시 (2 o clock), 세 시 (3 o clock), 열두 시 (12 o clock).',
            'Ask the time with 몇 시예요? ("what hour is it?"). 지금 means "now".',
          ],
          'Ang oras ay gumagamit ng katutubong bilang at ng 시: 한 시 (1 o clock), 두 시 (2 o clock), 세 시 (3 o clock). Itanong ang oras sa 몇 시예요? = "Anong oras na?" Ang 지금 ay "ngayon".',
          'Look at a clock and say the hour: 세 시예요. Three times a day is enough to lock it in.',
          'Hours: native numbers (한, 두, 세). Minutes: Sino numbers (일, 이, 삼).',
          [
            { ko: '지금 몇 시예요?', en: 'What time is it now?' },
            { ko: '세 시예요.', en: 'It is 3 o clock.' },
          ],
        ),
        tips: [
          'Use 반 for half past: 한 시 반 means 1:30.',
          'Minutes use Sino numbers: 십 분 (10 minutes), not 열 분.',
        ],
        locals: [
          { ko: '몇 시에 만날까요?', en: 'What time shall we meet?', note: 'The most common phrase for making plans. 에 marks the time.' },
          { ko: '지금 몇 시예요?', en: 'What time is it now?', note: 'Locals ask this often. Answer quickly with the hour.' },
        ],
      },
      {
        ...dtc(
          'Minutes and the full time',
          [
            'Say the hour first, then 분 for minutes, using Sino numbers: 세 시 십 분 (3:10), 여섯 시 삼십 분 (6:30).',
            'Finish with 이에요 or 예요: 세 시 십 분이에요.',
          ],
          'Sabihin muna ang oras, tapos ang 분 para sa minuto, gamit ang Sino na bilang: 세 시 십 분 (3:10), 여섯 시 삼십 분 (6:30). Tapusin sa 이에요 o 예요: 세 시 십 분이에요.',
          'When you tell the time, say the hour, then minutes: 세 시 십 분.',
          'Minutes sound like "bun": 십 분 is "ship bun", ten minutes.',
          [
            { ko: '세 시 십 분이에요.', en: 'It is 3:10.' },
            { ko: '여섯 시 삼십 분이에요.', en: 'It is 6:30.' },
          ],
        ),
        tips: [
          'Use 에 for when something happens: 여섯 시에 가요 ("I go at six").',
          'For half past, many people say 반 instead of 삼십 분.',
        ],
        locals: [
          { ko: '여섯 시에 봐요!', en: 'See you at six!', note: 'A quick way to set a meeting time with friends.' },
        ],
      },
      ch('"It is 3:10." Which is right?', '세 시 십 분이에요.', ['세 시 열 분이에요.', '열 시 세 분이에요.'], 'Minutes use Sino numbers (십 분). Hours use native numbers (세 시).', 'Oras: katutubo. Minuto: Sino.'),
      ch('How do you ask "What time is it now?"', '지금 몇 시예요?', ['지금 몇 살이에요?', '지금 어디예요?'], '몇 시 asks for the hour. 몇 살 asks for age, and 어디 asks where.', 'Anong oras = 몇 시.'),
    ],
  },
  {
    id: '0.15',
    phase: 0,
    deep: true,
    title: 'Rooms of the house',
    ko: '집 안',
    blurb: 'Kitchen, bathroom, bedroom and living room.',
    items: [
      b('부엌', '부엌', 'kitchen'),
      b('화장실', '화장실', 'bathroom'),
      b('침실', '침실', 'bedroom'),
      b('거실', '거실', 'living room'),
    ],
    steps: [
      {
        ...dtc(
          'Inside the home',
          [
            '집 is a house. 방 is a room. 부엌 is the kitchen, where food is cooked. 화장실 is the bathroom, and 침실 is the bedroom. 거실 is the living room, where families sit and watch TV.',
            'In Korean homes you often take off your shoes at the door before you enter any of these rooms.',
          ],
          'Ang 집 ay bahay. Ang 방 ay kuwarto. Ang 부엌 ay kusina, kung saan nagluluto. Ang 화장실 ay banyo, at ang 침실 ay kuwarto-tulugan. Ang 거실 ay sala, kung saan nagtitipon ang pamilya.',
          'Name each room as you walk through your home. The words stick faster when you can point.',
          'Kitchen is 부엌 (bu-eok): "boo-uk", like "book" in a hurry.',
          [
            { ko: '부엌', en: 'kitchen' },
            { ko: '화장실', en: 'bathroom' },
            { ko: '거실', en: 'living room' },
          ],
        ),
        tips: [
          '화장실 is also used for "restroom" in public places. Look for the sign.',
          'Say 화장실은 어디예요? ("where is the bathroom?") when you visit a Korean home.',
        ],
        locals: [
          { ko: '화장실 어디예요?', en: 'Where is the bathroom?', note: 'Short and polite. Locals say it in restaurants all the time.' },
          { ko: '신발 벗으세요.', en: 'Please take off your shoes.', note: 'Said at the door of many homes. Follow it, it is respectful.' },
        ],
      },
      {
        ...dtc(
          'Where something is',
          [
            'Use 에 with a place and 있어요 for "is there": 부엌에 있어요 means "it is in the kitchen". 에서 is for where an action happens, so use 에 for location.',
            'To ask where, use 어디예요? after the thing: 침실은 어디예요? ("where is the bedroom?").',
          ],
          'Gamitin ang 에 kasama ang lugar at ang 있어요 para sa "nasa": 부엌에 있어요 = "Nasa kusina." Para magtanong kung nasaan: 침실은 어디예요?',
          'Point at a room and say 여기는 거실이에요 ("this is the living room").',
          'Location word plus 에 plus 있어요: kitchen, there it is.',
          [
            { ko: '부엌에 있어요.', en: 'It is in the kitchen.' },
            { ko: '침실은 어디예요?', en: 'Where is the bedroom?' },
          ],
        ),
        tips: [
          '여기는 means "here". 저기는 means "over there".',
          'Locals often shorten 어디예요 to 어디? when they are in a hurry.',
        ],
        locals: [
          { ko: '거실에 계세요.', en: 'They are in the living room.', note: '계세요 is the polite form of 있어요 for people. Use it for family.' },
        ],
      },
      ch('Where do you cook food?', '부엌', ['화장실', '침실'], '부엌 is the kitchen, where food is cooked.', 'Sa kusina nagluluto.'),
      ch('Which means "Where is the bathroom?"', '화장실 어디예요?', ['화장실을 먹어요.', '화장실이 좋아요.'], '어디예요 asks where. The others say something unrelated.', 'Nasaan ang banyo?'),
    ],
  },
  {
    id: '0.16',
    phase: 0,
    deep: true,
    title: 'Arms, shoulders and knees',
    ko: '팔 · 어깨 · 무릎',
    blurb: 'More body parts you will use every day.',
    items: [
      b('팔', '팔', 'arm'),
      b('어깨', '어깨', 'shoulder'),
      b('무릎', '무릎', 'knee'),
      b('손가락', '손가락', 'finger'),
    ],
    steps: [
      {
        ...dtc(
          'Your arms and joints',
          [
            '팔 is an arm. 어깨 is a shoulder. 무릎 is a knee. 손가락 is a finger.',
            'Pair body words with 아파요 (hurts) to describe pain: 팔이 아파요 means "my arm hurts".',
          ],
          'Ang 팔 ay braso. Ang 어깨 ay balikat. Ang 무릎 ay tuhod. Ang 손가락 ay daliri. Ikabit sa 아파요 para sabihing masakit: 팔이 아파요 = "Masakit ang braso ko."',
          'Touch each part as you say it. Your body becomes your flashcards.',
          'Shoulders are 어깨, "uh-gae", like the shrug: uh, gae!',
          [
            { ko: '팔', en: 'arm' },
            { ko: '어깨', en: 'shoulder' },
            { ko: '무릎', en: 'knee' },
            { ko: '손가락', en: 'finger' },
          ],
        ),
        tips: [
          'Body parts that come in pairs take 이 or 가 with 아파요: 팔이 아파요, 무릎이 아파요.',
          'Use 손가락 to count with your fingers: 하나, 둘, 셋 on 손가락.',
        ],
        locals: [
          { ko: '어깨가 아파요.', en: 'My shoulder hurts.', note: 'Very common in offices. Locals describe aches this way.' },
          { ko: '무릎 괜찮아요?', en: 'Is your knee okay?', note: 'Friendly check after a fall or a long walk.' },
        ],
      },
      {
        ...dtc(
          'Telling someone where it hurts',
          [
            'Ask 어디가 아파요? ("where does it hurt?") and answer with the body part plus 가 아파요: 무릎이 아파요.',
            'Add 많이 (a lot) to make it stronger: 팔이 많이 아파요.',
          ],
          'Itanong ang 어디가 아파요? = "Saan masakit?" Sagutin ng bahagi ng katawan at 가 아파요: 무릎이 아파요. Idagdag ang 많이 para mas matindi: 팔이 많이 아파요.',
          'If you feel hurt, say the body part first, then 아파요. It is a complete message.',
          'Where does it hurt: 어디 아파요. Say the part, then the hurt.',
          [
            { ko: '어디가 아파요?', en: 'Where does it hurt?' },
            { ko: '팔이 많이 아파요.', en: 'My arm really hurts.' },
          ],
        ),
        tips: [
          'Do not say 아파요 alone when you want to point to a part. Name the part first.',
          'Use 조금 (a little) for a small ache: 무릎이 조금 아파요.',
        ],
        locals: [
          { ko: '괜찮아요, 조금만 아파요.', en: 'It is okay, just a little pain.', note: 'Locals often downplay a small injury this way.' },
        ],
      },
      ch('Which means "my arm hurts"?', '팔이 아파요.', ['팔이 좋아요.', '팔을 먹어요.'], '아파요 means hurts. 좋아요 means good and 먹어요 means eat.', 'Masakit ang braso ko.'),
      ch('Which word means "knee"?', '무릎', ['어깨', '손가락'], '무릎 is the knee. 어깨 is the shoulder and 손가락 is a finger.', 'Ang 무릎 = tuhod.'),
    ],
  },
  {
    id: '0.17',
    phase: 0,
    deep: true,
    title: 'Up, down, front and back',
    ko: '위 · 아래 · 앞 · 뒤',
    blurb: 'Where things are, using simple position words.',
    items: [
      b('위', '위', 'top'),
      b('아래', '아래', 'bottom'),
      b('앞', '앞', 'in front'),
      b('뒤', '뒤', 'behind'),
      b('옆', '옆', 'beside'),
    ],
    steps: [
      {
        ...dtc(
          'Position words',
          [
            '위 is on top or above. 아래 is below or underneath. 앞 is in front, 뒤 is behind, and 옆 is beside.',
            'Add 에 after the word to say where: 책상 위에 means "on the desk".',
          ],
          'Ang 위 ay nasa itaas. Ang 아래 ay nasa ibaba. Ang 앞 ay nasa harap, ang 뒤 ay nasa likod, at ang 옆 ay nasa tabi. Idagdag ang 에 para sabihin kung nasaan: 책상 위에 = "sa ibabaw ng mesa."',
          'Put one object on your table and move it: 위, 아래, 앞, 뒤, 옆. Your hands teach the words.',
          'Up is 위, down is 아래: "wee" goes up, "ah-rae" goes down.',
          [
            { ko: '책상 위에', en: 'on the desk' },
            { ko: '의자 뒤에', en: 'behind the chair' },
            { ko: '문 앞에', en: 'in front of the door' },
          ],
        ),
        tips: [
          '위 and 아래 are often used with 에: 위에 (on top), 아래에 (underneath).',
          '앞 and 뒤 often come before 에: 앞에 (in front), 뒤에 (behind).',
        ],
        locals: [
          { ko: '여기 앞이에요.', en: 'It is right in front.', note: 'Used to give directions in a city. Locals say 앞이에요 for "in front of".' },
          { ko: '옆에 있어요.', en: 'It is beside you.', note: 'Quick reply when a friend asks where you are.' },
        ],
      },
      {
        ...dtc(
          'Asking where something is',
          [
            'Ask 어디 있어요? ("where is it?") and answer with the position plus 에 있어요: 책상 위에 있어요.',
            'For a person, use 계세요 instead of 있어요: 엄마는 부엌에 계세요.',
          ],
          'Itanong ang 어디 있어요? = "Nasaan?" Sagutin ng posisyon at 에 있어요: 책상 위에 있어요. Para sa tao, gamitin ang 계세요: 엄마는 부엌에 계세요.',
          'Hide a small item and let a friend find it using the position words.',
          'Where is it: 어디 있어요. Answer: position plus 에 있어요.',
          [
            { ko: '어디 있어요?', en: 'Where is it?' },
            { ko: '책상 위에 있어요.', en: 'It is on the desk.' },
          ],
        ),
        tips: [
          'Use 옆 (beside) for people too: 친구 옆에 있어요 ("I am next to my friend").',
          'Say 아래 for things under something: 침대 아래에 ("under the bed").',
        ],
        locals: [
          { ko: '저기 뒤에 있어요.', en: 'It is over there, behind.', note: 'Locals point and say this in a shop when they cannot see something.' },
        ],
      },
      ch('The book is ON the desk. Which is right?', '책상 위에 책이 있어요.', ['책상 아래에 책이 있어요.', '책상 옆에 책이 없어요.'], '위 means on top. 아래 means under. 없어요 means there is not.', 'Nasa ibabaw ng mesa = 위.'),
      ch('Which word means "behind"?', '뒤', ['앞', '옆'], '뒤 is behind. 앞 is in front and 옆 is beside.', 'Ang 뒤 = likod.'),
    ],
  },
  {
    id: '0.18',
    phase: 0,
    deep: true,
    title: 'Drinks and breakfast',
    ko: '음료 · 아침',
    blurb: 'Juice, eggs, noodles and milk for the morning.',
    items: [
      b('주스', '주스', 'juice'),
      b('계란', '계란', 'egg'),
      b('국수', '국수', 'noodles'),
      b('우유', '우유', 'milk'),
    ],
    steps: [
      {
        ...dtc(
          'Morning food and drinks',
          [
            '주스 is juice, 계란 is an egg, 국수 is noodles, and 우유 is milk. A simple Korean breakfast often includes 계란 and 우유.',
            'Count eggs with 개 and drinks with 잔 (cups): 계란 두 개, 우유 한 잔.',
          ],
          'Ang 주스 ay juice, 계란 ay itlog, 국수 ay pansit, at 우유 ay gatas. Ang simpleng almusal sa Korea ay kadalasang may 계란 at 우유. Bilangin ang itlog ng 개 at inumin ng 잔 (baso).',
          'Order a drink with 주세요: 주스 한 잔 주세요 ("one juice, please").',
          'Eggs are 계란 (gye-ran), like "gay-rahn". Think "gay ran" to the store for eggs.',
          [
            { ko: '주스 한 잔 주세요.', en: 'One juice, please.' },
            { ko: '계란 두 개 주세요.', en: 'Two eggs, please.' },
          ],
        ),
        tips: [
          '잔 counts cups and glasses. 병 counts bottles.',
          'In Korea, 우유 is often sold in cartons, and cold drinks are popular in summer.',
        ],
        locals: [
          { ko: '아이스 주스 주세요.', en: 'An iced juice, please.', note: 'Locals say 아이스 before any cold drink in a cafe.' },
          { ko: '국수 먹을래요?', en: 'Want to eat noodles?', note: 'A cosy invitation for lunch with friends.' },
        ],
      },
      {
        ...dtc(
          'Ordering breakfast',
          [
            'Use 하고 for "and" between foods: 계란하고 국수 (egg and noodles). Use 을 or 를 when you eat something: 우유를 마셔요 ("I drink milk").',
            'The verb for drink is 마셔요, and the verb for eat is 먹어요.',
          ],
          'Gamitin ang 하고 para sa "at" sa pagitan ng pagkain: 계란하고 국수. Gamitin ang 을 o 를 kapag may kinakain: 우유를 마셔요 = "Umiinom ako ng gatas."',
          'Say 우유를 마셔요 each morning. It is a habit that makes the verb stick.',
          'Eat is 먹어요, drink is 마셔요: eat with the mouth closed, drink with the cup.',
          [
            { ko: '우유를 마셔요.', en: 'I drink milk.' },
            { ko: '계란을 먹어요.', en: 'I eat an egg.' },
          ],
        ),
        tips: [
          'Use 먹어요 with food and 마셔요 with drinks.',
          'Ask 아침 먹었어요? ("did you eat breakfast?") to start a morning chat.',
        ],
        locals: [
          { ko: '아침 먹었어요?', en: 'Did you eat breakfast?', note: 'A common morning greeting among Koreans.' },
        ],
      },
      ch('"Two eggs, please." Which is right?', '계란 두 개 주세요.', ['계란 두 명 주세요.', '계란 두 살 주세요.'], '개 counts things. 명 counts people and 살 counts age.', 'Dalawang itlog, po.'),
      ch('Which word means "noodles"?', '국수', ['우유', '주스'], '국수 is noodles. 우유 is milk and 주스 is juice.', 'Ang 국수 = pansit.'),
    ],
  },
  {
    id: '0.19',
    phase: 0,
    deep: true,
    title: 'School subjects',
    ko: '과목',
    blurb: 'Math, science, art and music at school.',
    items: [
      b('수학', '수학', 'math'),
      b('과학', '과학', 'science'),
      b('미술', '미술', 'art'),
      b('음악', '음악', 'music'),
    ],
    steps: [
      {
        ...dtc(
          'Subjects you will hear in class',
          [
            '수학 is math, 과학 is science, 미술 is art, and 음악 is music. Many school names end with 시간 (time): 수학 시간 means "math class".',
            'Korean students learn these subjects in the same way as children everywhere, so the words are easy to connect to what you already know.',
          ],
          'Ang 수학 ay math, 과학 ay science, 미술 ay sining, at 음악 ay musika. Maraming pangalan ng klase ang nagtatapos sa 시간 (oras): 수학 시간 = "klase sa math".',
          'Name your school subjects in Korean. It is the fastest way to remember them.',
          'Math is 수학 (su-hak): "sue, hack" the problem!',
          [
            { ko: '수학', en: 'math' },
            { ko: '과학', en: 'science' },
            { ko: '음악', en: 'music' },
          ],
        ),
        tips: [
          'Add 시간 to any subject for "class time": 음악 시간 ("music class").',
          'Use 좋아해요 with the subject: 수학을 좋아해요 ("I like math").',
        ],
        locals: [
          { ko: '오늘 수학 시험 있어요.', en: 'We have a math test today.', note: 'Students say this around exam weeks. 있어요 means there is.' },
          { ko: '음악 좋아해요?', en: 'Do you like music?', note: 'A friendly question you can ask a new friend.' },
        ],
      },
      {
        ...dtc(
          'Liking a subject',
          [
            'Attach 을 or 를 after the subject when you say you like it: 과학을 좋아해요 ("I like science"). 과학 ends with a consonant, so it takes 을.',
            'Use 어려워요 (is difficult) or 쉬워요 (is easy) after the subject: 수학이 어려워요.',
          ],
          'Ikabit ang 을 o 를 pagkatapos ng asignatura: 과학을 좋아해요 = "Gusto ko ang science." Gamitin ang 어려워요 (mahirap) o 쉬워요 (madali): 수학이 어려워요.',
          'Say which subject is easy and which is hard. It is a great way to start a chat.',
          'Hard is 어려워요, easy is 쉬워요: 쉬워요 sounds like "shwee-woe", easy as a sweet.',
          [
            { ko: '과학을 좋아해요.', en: 'I like science.' },
            { ko: '수학이 어려워요.', en: 'Math is difficult.' },
          ],
        ),
        tips: [
          'Use 이 after a consonant and 가 after a vowel when the subject is the topic of the sentence: 수학이 어려워요.',
          'Say 조금 어려워요 for "a little difficult" to sound gentle.',
        ],
        locals: [
          { ko: '미술이 제일 좋아요.', en: 'Art is my favourite.', note: '제일 means "the most". It is how locals name a favourite.' },
        ],
      },
      ch('Which means "I like math"?', '수학을 좋아해요.', ['수학을 먹어요.', '수학을 마셔요.'], '좋아해요 means like. 먹어요 means eat and 마셔요 means drink.', 'Gusto ko ang math.'),
      ch('Which word means "music"?', '음악', ['미술', '과학'], '음악 is music. 미술 is art and 과학 is science.', 'Ang 음악 = musika.'),
    ],
  },
];

import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const v = (id: string, korean: string, english: string) => ({ id: `v14.${id}`, korean, english });

export const EXTRA13: Lesson[] = [
  {
    id: '4.57',
    phase: 4,
    deep: true,
    title: 'I hope: -(으)면 좋겠어요',
    ko: '-(으)면 좋겠어요',
    blurb: 'Wish for something, in a polite and soft way.',
    items: [
      v('합격하면', '합격하면 좋겠어요.', 'I hope I pass.'),
      v('비가안왔으면', '비가 안 왔으면 좋겠어요.', 'I hope it does not rain.'),
      v('같이가면', '같이 가면 좋겠어요.', 'I hope we go together.'),
    ],
    steps: [
      {
        ...dtc(
          'Hoping with -(으)면 좋겠어요',
          [
            'Add -(으)면 좋겠어요 to a verb or adjective stem to say what you hope will happen. 가다 becomes 가면 좋겠어요 ("I hope we go"). 먹다 becomes 먹으면 좋겠어요 ("I hope to eat").',
            'The stem alone is enough for vowels, and 으 is added after a consonant, the same split as -(으)면 "if".',
          ],
          'Ginagamit ang -(으)면 좋겠어요 para sa pag-asa: 가면 좋겠어요 = "Sana pumunta tayo." 먹으면 좋겠어요 = "Sana makakain." Pareho ang hati ng 으 gaya ng -(으)면 (kung).',
          'Use it to wish politely: 시험에 합격하면 좋겠어요 ("I hope I pass the exam").',
          'The 면 is "if", and 좋겠어요 is "would be good". Together: "if it happened, that would be good".',
          [
            { ko: '합격하면 좋겠어요.', en: 'I hope I pass.' },
            { ko: '비가 안 왔으면 좋겠어요.', en: 'I hope it does not rain.' },
          ],
        ),
        tips: [
          'Use 안 before the verb to hope for a negative: 비가 안 왔으면 (I hope it does not rain).',
          'Locals add 정말 (really) for emphasis: 정말 합격하면 좋겠어요.',
        ],
        locals: [
          { ko: '잘 됐으면 좋겠어요.', en: 'I hope it goes well.', note: 'Locals say this before an exam, a meeting or a trip. It is warm and common.' },
          { ko: '날씨가 좋았으면 좋겠어요.', en: 'I hope the weather is nice.', note: 'Said when planning a picnic or a day out.' },
        ],
      },
      {
        ...dtc(
          'Wish and reality',
          [
            '-(으)면 좋겠어요 is a hope about the future, while -았으면 좋겠어요 is a hope about something that did not happen. 가면 좋겠어요 hopes you will go.',
            'Add 저도 (me too) to agree: 저도 그랬으면 좋겠어요 ("I also hope so").',
          ],
          'Ang -(으)면 좋겠어요 ay pag-asa sa hinaharap. Sa 저도 (ako rin): 저도 그랬으면 좋겠어요 = "Sana nga po."',
          'Reply to a friend\'s hope with 저도요! to show you feel the same.',
          'Wish = 면 좋겠어요. The hope comes first, then the good part.',
          [
            { ko: '같이 가면 좋겠어요.', en: 'I hope we go together.' },
            { ko: '저도요!', en: 'Me too!' },
          ],
        ),
        tips: [
          'Keep it soft by ending with 좋겠어요, not 좋아요, because it is a hope.',
          'Do not say 좋았으면 unless you mean it already happened and you wish it had.',
        ],
        locals: [
          { ko: '내일 비가 안 왔으면 좋겠다!', en: 'I hope it does not rain tomorrow!', note: 'Casual speech with friends drops 요 and uses 좋겠다.' },
        ],
      },
      ch('"I hope I pass." Which is right?', '합격하면 좋겠어요.', ['합격했어요.', '합격하고 싶어요.'], '-(으)면 좋겠어요 expresses a hope. 합격했어요 is past and 합격하고 싶어요 is want.', 'Sana makapasa.'),
      ch('"I hope it does not rain." Which uses the negative correctly?', '비가 안 왔으면 좋겠어요.', ['비가 왔으면 안 좋겠어요.', '비가 안 좋아요.'], 'The negative 안 goes before the verb, and 좋겠어요 hopes for it.', 'Sana hindi umulan.'),
    ],
  },
  {
    id: '4.58',
    phase: 4,
    deep: true,
    title: 'Also, only: 도 and 만',
    ko: '도 · 만',
    blurb: 'Two small particles that replace the topic and object markers.',
    items: [
      v('저도가요', '저도 가요.', 'I also go.'),
      v('커피만', '커피만 마셔요.', 'I only drink coffee.'),
      v('물만', '물만 주세요.', 'Just water, please.'),
    ],
    steps: [
      {
        ...dtc(
          '도 means "also"',
          [
            '도 means "also" or "too". It replaces the topic marker 은/는 or the subject marker 이/가, and you do not add both. 저는 가요 becomes 저도 가요 ("I also go").',
            'It also replaces the object marker: 커피를 마셔요 becomes 커피도 마셔요 ("I also drink coffee").',
          ],
          'Ang 도 ay "rin" o "pati". Pinapalitan nito ang 은/는 o 이/가 at ang 을/를. 저는 가요 → 저도 가요 = "Pupunta rin ako." 커피를 마셔요 → 커피도 마셔요 = "Umiinom din ako ng kape."',
          'When a friend asks, reply 저도요! ("me too!"). It is quick and kind.',
          '도 is "also", like a little plus sign after the word.',
          [
            { ko: '저도 가요.', en: 'I also go.' },
            { ko: '커피도 마셔요.', en: 'I also drink coffee.' },
          ],
        ),
        tips: [
          'Never put 도 and 은/는 together. 저도 is correct, 저는도 is not.',
          'Use 나도 with close friends in casual speech: 나도 가요.',
        ],
        locals: [
          { ko: '저도요!', en: 'Me too!', note: 'Locals say this a lot when agreeing with someone. The 요 makes it polite.' },
          { ko: '나도 배고파.', en: 'I am hungry too.', note: 'Casual with friends. 나도 is the chatty form of 저도.' },
        ],
      },
      {
        ...dtc(
          '만 means "only"',
          [
            '만 means "only" or "just". Like 도, it replaces the markers: 커피만 마셔요 means "I only drink coffee", where 만 replaces 를.',
            'Use it to limit: 물만 주세요 means "just water, please".',
          ],
          'Ang 만 ay "lang" o "tanging". Kapalit ito ng mga pananda gaya ng 도: 커피만 마셔요 = "Kape lang ang iniinom ko." 물만 주세요 = "Tubig lang po."',
          'At a cafe, say 물만 주세요 to skip extras. It is clear and friendly.',
          '만 is one line: it means "only" and it stops the list.',
          [
            { ko: '커피만 마셔요.', en: 'I only drink coffee.' },
            { ko: '물만 주세요.', en: 'Just water, please.' },
          ],
        ),
        tips: [
          'Put 만 after a time word too: 오늘만 ("just today").',
          'Combine with 도 and 까지 carefully: 여기까지만 ("only up to here").',
        ],
        locals: [
          { ko: '한 번만 해 볼게요.', en: 'Let me try just once.', note: 'Locals use 한 번만 to ask for one more try, politely.' },
        ],
      },
      ch('"I also go." Which is correct?', '저도 가요.', ['저는도 가요.', '저만 가요.'], '도 means also. 저는도 mixes two markers and 저만 means only me.', 'Pupunta rin ako = 저도 가요.'),
      ch('"Just water, please." Which uses 만 correctly?', '물만 주세요.', ['물도 주세요.', '물이만 주세요.'], '만 means only and it replaces 을/를 here. 물도 would mean also water.', 'Tubig lang po.'),
    ],
  },
  {
    id: '4.59',
    phase: 4,
    deep: true,
    title: 'Floors and order: 층 and 번째',
    ko: '층 · 번째',
    blurb: 'Which floor, which stop, which one in line.',
    items: [
      v('몇층', '몇 층이에요?', 'What floor is it?'),
      v('삼층', '삼 층이에요.', 'It is the third floor.'),
      v('두번째역', '두 번째 역이에요.', 'It is the second stop.'),
    ],
    steps: [
      {
        ...dtc(
          'Floors use Sino numbers',
          [
            '층 means floor. For floors, use Sino numbers: 일 층 (1st floor), 이 층 (2nd floor), 삼 층 (3rd floor). Ask 몇 층이에요? ("what floor is it?").',
            'In Korea, the first floor is the ground floor, so 일 층 is where you walk in from the street.',
          ],
          'Ang 층 ay palapag. Gamitin ang Sino na bilang para sa palapag: 일 층 (unang palapag), 이 층 (ikalawa), 삼 층 (ikatlo). Itanong ang 몇 층이에요? = "Anong palapag?" Sa Korea, ang unang palapag ay ground floor.',
          'When you enter a building, say 몇 층이에요? to the elevator guard or a friend.',
          'Floors are Sino: 일 층, 이 층, 삼 층. Think "il, i, sam" climbing the stairs.',
          [
            { ko: '몇 층이에요?', en: 'What floor is it?' },
            { ko: '삼 층이에요.', en: 'It is the third floor.' },
          ],
        ),
        tips: [
          'Basement floors use 지하: 지하 일 층 (basement 1).',
          'Elevator buttons show 층 numbers, so you can point and say 삼 층이요 ("the third floor, please").',
        ],
        locals: [
          { ko: '몇 층 눌러요?', en: 'Which floor should I press?', note: 'Said in an elevator with friends. 누르다 means to press.' },
          { ko: '이 층이에요, 바로 앞.', en: 'It is the second floor, right in front.', note: 'Locals give directions this way in small buildings.' },
        ],
      },
      {
        ...dtc(
          'Order with 번째',
          [
            '번째 makes an ordinal, like the first, second, or third. The first is special: 첫 번째. After that, use a native number: 두 번째 (second), 세 번째 (third), 네 번째 (fourth).',
            'Use it for the stop on the subway or the order in a line: 두 번째 역이에요 ("it is the second stop").',
          ],
          'Ang 번째 ay nagpapakita ng pagkakasunod: 첫 번째 (una), 두 번째 (ikalawa), 세 번째 (ikatlo). Gamitin sa hinto ng subway o pila: 두 번째 역이에요 = "Ikalawang hinto na ito."',
          'Count stations on the subway with 번째 to know when to get off.',
          'First is 첫 번째. After that, the native numbers come back: 두, 세, 네.',
          [
            { ko: '첫 번째 역이에요.', en: 'It is the first stop.' },
            { ko: '두 번째 역이에요.', en: 'It is the second stop.' },
          ],
        ),
        tips: [
          'Use 첫째 in casual speech for "first one" or "first kid".',
          'For the exit number at a subway, say 출구 (exit) with 번: 3번 출구.',
        ],
        locals: [
          { ko: '3번 출구로 나가세요.', en: 'Please go out through exit 3.', note: 'Subway announcements use this every stop. Listen for 번 출구.' },
        ],
      },
      ch('"It is the third floor." Which is right?', '삼 층이에요.', ['세 층이에요.', '셋 층이에요.'], 'Floors take Sino numbers, so 삼 층 is correct, not the native 세.', 'Ikatlong palapag = 삼 층.'),
      ch('"It is the first stop." Which is right?', '첫 번째 역이에요.', ['일 번째 역이에요.', '하나 번째 역이에요.'], 'The first is 첫 번째. 일 번째 and 하나 번째 are not used for order.', 'Unang hinto = 첫 번째.'),
    ],
  },
  {
    id: '4.60',
    phase: 4,
    deep: true,
    title: 'Already, still, not yet: 벌써, 아직, 이미',
    ko: '벌써 · 아직 · 이미',
    blurb: 'Talking about time, progress and what has happened.',
    items: [
      v('벌써먹었어요', '벌써 먹었어요.', 'I already ate.'),
      v('아직안왔어요', '아직 안 왔어요.', 'They have not come yet.'),
      v('이미끝났어요', '이미 끝났어요.', 'It is already finished.'),
    ],
    steps: [
      {
        ...dtc(
          '벌써 and 이미: already',
          [
            '벌써 means "already", often with surprise that it happened sooner than you expected: 벌써 먹었어요 ("I already ate").',
            '이미 also means "already", but it is calmer and says the thing is done: 이미 끝났어요 ("it is already finished").',
          ],
          'Ang 벌써 ay "tapos na" na may gulat, na mas maaga pa sa inaasahan: 벌써 먹었어요. Ang 이미 ay "tapos na" na kalmado: 이미 끝났어요.',
          'When your friend asks, reply 벌써요! ("already!") with a smile if it surprised you.',
          '벌써 is "wow, already!". 이미 is "it is already done, calmly".',
          [
            { ko: '벌써 먹었어요.', en: 'I already ate.' },
            { ko: '이미 끝났어요.', en: 'It is already finished.' },
          ],
        ),
        tips: [
          '벌써 and 이미 both fit with past tense. 벌써 feels more lively.',
          'Use 벌써 to ask: 벌써 가요? ("are you leaving already?").',
        ],
        locals: [
          { ko: '벌써 다 먹었어요?', en: 'Did you already finish eating?', note: 'Said by friends when someone finishes a meal quickly. It is friendly.' },
        ],
      },
      {
        ...dtc(
          '아직 means "not yet" or "still"',
          [
            '아직 means "still" or "not yet". Use it with 안 or 못 for negatives: 아직 안 왔어요 ("they have not come yet").',
            'Add 아직도 for "still" in a sentence: 아직도 자요? ("are you still sleeping?").',
          ],
          'Ang 아직 ay "hindi pa" o "pa rin". Gamitin kasama ang 안 o 못 sa negatibo: 아직 안 왔어요 = "Hindi pa sila dumarating." Ang 아직도 ay "pa rin".',
          'Say 아직이요 when someone asks if you are ready: "not yet, sorry".',
          '아직 = not yet. Put 안 after it to say "not yet, not done".',
          [
            { ko: '아직 안 왔어요.', en: 'They have not come yet.' },
            { ko: '아직도 자요?', en: 'Are you still sleeping?' },
          ],
        ),
        tips: [
          'Use 못 instead of 안 when you cannot do it yet: 아직 못 끝냈어요.',
          'Kids say 아직이요! in games. It works just as well for adults.',
        ],
        locals: [
          { ko: '아직이요, 잠깐만요.', en: 'Not yet, just a moment.', note: 'Polite way to say you are not ready. 잠깐만요 softens it.' },
        ],
      },
      ch('"I have not eaten yet." Which is right?', '아직 안 먹었어요.', ['아직 먹었어요.', '벌써 안 먹었어요.'], '아직 with 안 means not yet. 아직 먹었어요 means still ate, and 벌써 with a negative sounds unnatural.', 'Hindi pa ako kumakain.'),
      ch('"It is already finished!" Which fits?', '벌써 끝났어요!', ['아직 끝났어요.', '아직 안 끝났어요.'], '벌써 says already. 아직 means still or not yet, so those do not fit.', 'Tapos na!'),
    ],
  },
  {
    id: '4.61',
    phase: 4,
    deep: true,
    title: 'Stop it: -는 걸 그만해요',
    ko: '그만해요',
    blurb: 'Stop an action politely, or tell someone to stop.',
    items: [
      v('그만해요', '그만해요!', 'Stop it!'),
      v('게임하는걸', '게임하는 걸 그만해요.', 'Stop playing games.'),
    ],
    steps: [
      {
        ...dtc(
          'Stop doing: 그만하다',
          [
            '그만하다 means "to stop" or "to quit". To stop an action, use the -는 걸 form: 게임하는 걸 그만해요 ("stop playing games"). 걸 is short for 것을, the thing.',
            'Use 그만해요! by itself when you want someone to stop: 그만해요! means "stop it!".',
          ],
          'Ang 그만하다 ay "tumigil". Para tumigil sa gawain, gamitin ang -는 걸: 게임하는 걸 그만해요 = "Tigilan mo ang paglalaro." Ang 그만해요! ay "Tama na!"',
          'Say 그만! when someone teases you too much, and then say what you want.',
          '그만 is the STOP word. Put it after the action, like a red light.',
          [
            { ko: '그만해요!', en: 'Stop it!' },
            { ko: '게임하는 걸 그만해요.', en: 'Stop playing games.' },
          ],
        ),
        tips: [
          'A softer request uses 좀: 좀 그만해요 ("could you stop a bit?").',
          'Say 그만 with a friend to end the game or a joke.',
        ],
        locals: [
          { ko: '그만 좀 해!', en: 'Stop it already!', note: 'Casual and a little strong. Locals use it with siblings and close friends.' },
          { ko: '이제 그만 먹어요.', en: 'Let us stop eating now.', note: 'Said at the end of a big meal, with a laugh.' },
        ],
      },
      {
        ...dtc(
          'Asking someone to stop',
          [
            'The polite way to ask someone to stop is 그만하세요, or the gentle version 그만해 주세요 ("please stop").',
            'Use -지 마세요 for "do not": 소리 지르지 마세요 ("please do not shout").',
          ],
          'Ang magalang na pagpapatigil ay 그만하세요 o 그만해 주세요. Gamitin ang -지 마세요 para sa "huwag": 소리 지르지 마세요 = "Huwag po kayong sumigaw."',
          'In a shared space, say 조용히 해 주세요 ("please be quiet") with a smile.',
          'Polite stop: 그만하세요. Gentle stop: 그만해 주세요.',
          [
            { ko: '그만하세요.', en: 'Please stop.' },
            { ko: '소리 지르지 마세요.', en: 'Please do not shout.' },
          ],
        ),
        tips: [
          'Use 주세요 after the verb to ask kindly: 조용히 해 주세요.',
          'Avoid 그만하세요 with elders unless you are very close; use 그만해 주세요 instead.',
        ],
        locals: [
          { ko: '조용히 해 주세요.', en: 'Please be quiet.', note: 'Common sign and announcement in trains and libraries.' },
        ],
      },
      ch('Which means "Stop it!" in a friendly way?', '그만해요!', ['그만 가요.', '그만 먹어요.'], '그만해요 means stop. 그만 가요 means leave now and 그만 먹어요 means stop eating.', 'Tama na!'),
      ch('Which means "stop playing games"?', '게임하는 걸 그만해요.', ['게임을 그만 가요.', '게임하고 싶어요.'], 'The -는 걸 그만해요 pattern stops an action. 가요 is go and 싶어요 is want.', 'Tigilan ang paglalaro.'),
    ],
  },
  {
    id: '4.62',
    phase: 4,
    deep: true,
    title: 'What do you think? 어때요?',
    ko: '어때요?',
    blurb: 'Ask for opinions and suggest things politely.',
    items: [
      v('이거어때요', '이거 어때요?', 'How about this?'),
      v('영화어때요', '영화 어때요?', 'How about a movie?'),
      v('맛어때요', '맛이 어때요?', 'How is the taste?'),
    ],
    steps: [
      {
        ...dtc(
          'Asking how something is',
          [
            '어때요? asks "how is it?" or "how about it?". 이거 어때요? is "how about this?". 맛이 어때요? asks "how is the taste?".',
            'Use it to suggest too: 영화 어때요? means "how about a movie?".',
          ],
          'Ang 어때요? ay "kumusta?" o "ano sa tingin mo?". 이거 어때요? = "Ano sa tingin mo dito?" 영화 어때요? = "Manood tayo ng sine?"',
          'Ask 이거 어때요? in a shop before you buy. The staff will tell you what is popular.',
          'How is it: 어때요. Think "a-ddae-yo": how about it?',
          [
            { ko: '이거 어때요?', en: 'How about this?' },
            { ko: '영화 어때요?', en: 'How about a movie?' },
          ],
        ),
        tips: [
          '어떨까요? is softer: 영화 어떨까요? ("how would a movie be?").',
          'Use 어땠어요? for the past: 영화 어땠어요? ("how was the movie?").',
        ],
        locals: [
          { ko: '이거 어때요? 맛있어요!', en: 'How about this? It is delicious!', note: 'Shop staff and friends recommend food this way.' },
          { ko: '어땠어요?', en: 'How was it?', note: 'The first thing people ask after a trip or a date.' },
        ],
      },
      {
        ...dtc(
          'Answering opinions',
          [
            'Reply 좋아요 (good), 괜찮아요 (okay), or 별로예요 (not really). 별로예요 is polite, not rude.',
            'Add 정말 (really) for emphasis: 정말 좋아요.',
          ],
          'Sumagot ng 좋아요 (maganda), 괜찮아요 (okay lang), o 별로예요 (hindi masyado). Magalang ang 별로예요, hindi bastos.',
          'When you do not love something, say 괜찮아요 first. It is kind and honest.',
          'Good is 좋아요, okay is 괜찮아요, not really is 별로예요.',
          [
            { ko: '좋아요!', en: 'Good!' },
            { ko: '별로예요.', en: 'Not really.' },
          ],
        ),
        tips: [
          '최고예요 means "the best", good for a big compliment.',
          'Use 별로 with a negative only: 별로 안 좋아요 means "not that good".',
        ],
        locals: [
          { ko: '음식 어때요?', en: 'How is the food?', note: 'Friends ask this at a restaurant. Answer 맛있어요 or 괜찮아요.' },
        ],
      },
      ch('"How about a movie?" Which is correct?', '영화 어때요?', ['영화 어땠어요?', '영화 어디예요?'], '어때요 suggests or asks an opinion. 어땠어요 is past and 어디예요 asks where.', 'Manood tayo ng sine?'),
      ch('Which means "not really"?', '별로예요.', ['최고예요.', '괜찮아요.'], '별로예요 means not really. 최고예요 means the best, and 괜찮아요 means okay.', 'Hindi masyado.'),
    ],
  },
];

import type { Lesson } from './lessons';
import { ch, tc } from './lessons-everyday';

const v = (id: string, korean: string, english: string) => ({ id: `v11.${id}`, korean, english });
const k = (id: string, korean: string, english: string) => ({ id: `k6.${id}`, korean, english });

export const EXTRA11: Lesson[] = [
  {
    id: '4.43',
    phase: 4,
    title: 'I will do it: -(으)ㄹ게요',
    ko: '-(으)ㄹ게요',
    blurb: 'Promise something, or offer to do it yourself.',
    items: [
      v('할게요', '할게요.', 'I will do it.'),
      v('전화할게요', '내일 전화할게요.', 'I will call tomorrow.'),
      v('먹을게요', '이거 먹을게요.', 'I will eat this.'),
    ],
    steps: [
      tc(
        'Promise or offer: -(으)ㄹ게요',
        [
          'Add -(으)ㄹ게요 to a verb stem to say what you will do, especially when you decide it right now or promise it. 가다 becomes 갈게요 (stem ends in a vowel, just add ㄹ게요). 먹다 becomes 먹을게요 (stem ends in a consonant, add 을게요).',
          'Use 제가 할게요 ("I will do it") to offer help. The action is always your own, so it is used with I.',
        ],
        'Ginagamit ang -(으)ㄹ게요 para sa pangako o alok na ikaw mismo ang gagawa: 제가 할게요 = "Ako na ang gagawa." Patinig ang dulo ng stem: 가다 → 갈게요. Katinig ang dulo: 먹다 → 먹을게요.',
        'Say 제가 할게요 when someone needs help. It sounds kind and natural.',
        'Vowel stem gets ㄹ게요, consonant stem gets 을게요. It is the same split as the future -(으)ㄹ 거예요 (lesson 2.8).',
        [
          { ko: '제가 할게요.', en: 'I will do it.' },
          { ko: '내일 전화할게요.', en: 'I will call tomorrow.' },
          { ko: '이거 먹을게요.', en: 'I will eat this.' },
        ],
      ),
      tc(
        'Keep it short',
        [
          'When you promise something, you can end with 할게요 by itself. Someone asks 누가 해요? ("who will do it?") and you say 제가 할게요.',
          'The form stays the same for every subject that is I. Only the verb stem changes.',
        ],
        'Kapag nangako ka, puwede mong tapusin sa 할게요 lang. Halimbawa: 누가 해요? = "Sino ang gagawa?" Sagot: 제가 할게요 = "Ako na."',
        'Use 할게요 as a quick "I am on it" when your family or friends ask for help.',
        'Think "I promise, I will do it": -ㄹ게요 is the promise ending.',
        [
          { ko: '제가 할게요.', en: 'I will do it.' },
          { ko: '내일 전화할게요.', en: 'I will call tomorrow.' },
        ],
      ),
      ch('Someone asks "Who will wash the dishes?" You offer. What do you say?', '제가 할게요.', ['제가 해요.', '제가 했어요.'], '할게요 is a promise or offer for the future. 해요 is a habit and 했어요 is the past.', '할게요 = pangako o alok. 해요 = ginagawa. 했어요 = ginawa na.'),
      ch('Which form is correct for 먹다 (to eat) when you promise "I will eat"?', '먹을게요', ['먹어요', '먹게요'], '먹다 ends in a consonant, so the form is 먹을게요.', 'Katinig ang dulo ng 먹다, kaya 먹을게요.'),
    ],
  },
  {
    id: '4.44',
    phase: 4,
    title: 'Shall we? -(으)ㄹ까요?',
    ko: '-(으)ㄹ까요?',
    blurb: 'Suggest doing something together.',
    items: [
      v('같이갈까요', '같이 갈까요?', 'Shall we go together?'),
      v('먹을까요', '먹을까요?', 'Shall we eat?'),
      v('같이먹을까요', '같이 먹을까요?', 'Shall we eat together?'),
      v('좋아요', '좋아요!', 'Sounds good!'),
    ],
    steps: [
      tc(
        'Suggesting together: -(으)ㄹ까요?',
        [
          'Add -(으)ㄹ까요? to a verb stem to suggest doing something together. 가다 becomes 갈까요? ("shall we go?"). 먹다 becomes 먹을까요? ("shall we eat?").',
          'Add 같이 (together) to make the suggestion clear: 같이 갈까요? ("shall we go together?").',
        ],
        'Ginagamit ang -(으)ㄹ까요? para magmungkahi ng sabay na gawain: 갈까요? = "Pupunta ba tayo?" 먹을까요? = "Kakain ba tayo?" Idagdag ang 같이 para maging malinaw: 같이 갈까요? = "Sabay ba tayong pupunta?"',
        'Ask 같이 먹을까요? when you are hungry. It is friendly and easy to say.',
        'Same vowel and consonant rule as -(으)ㄹ게요: 갈까요, 먹을까요.',
        [
          { ko: '같이 갈까요?', en: 'Shall we go together?' },
          { ko: '먹을까요?', en: 'Shall we eat?' },
          { ko: '좋아요!', en: 'Sounds good!' },
        ],
      ),
      tc(
        'Asking what someone thinks',
        [
          'The same ending also asks what the other person wants. 커피 마실까요? means "shall we drink coffee?".',
          'If you agree, say 좋아요! ("sounds good!"). If you do not want to, say 다음에요 ("next time").',
        ],
        'Ginagamit din ito para itanong ang gusto ng kausap: 커피 마실까요? = "Iinom ba tayo ng kape?" Kung sang-ayon, sabihin ang 좋아요! = "Sige!" Kung hindi, sabihin ang 다음에요 = "Sa susunod na lang."',
        'Answer 좋아요! with a smile. People feel welcome when you agree warmly.',
        '까요 ends with a rising tone, like a question. The ㄹ is the "we" part of the suggestion.',
        [
          { ko: '커피 마실까요?', en: 'Shall we drink coffee?' },
          { ko: '좋아요!', en: 'Sounds good!' },
          { ko: '다음에요.', en: 'Next time.' },
        ],
      ),
      ch('You want to suggest eating together. Which is correct?', '같이 먹을까요?', ['같이 먹어요?', '같이 먹었어요?'], '-(으)ㄹ까요? is the suggestion ending. 먹어요 is a plain statement and 먹었어요 is past.', '-(으)ㄹ까요? = panukalang sabay. 먹어요 = ginagawa. 먹었어요 = kumain na.'),
      ch('Your friend says 먹을까요? What do you say to agree?', '좋아요!', ['아니요, 먹었어요.', '잘 먹었어요.'], '좋아요 agrees. 아니요, 먹었어요 means "no, I already ate" and 잘 먹었어요 means "thanks for the meal".', '좋아요 = sige. Hindi tugma ang iba.'),
    ],
  },
  {
    id: '4.45',
    phase: 4,
    title: 'Going to do something: -(으)러 가요',
    ko: '-(으)러 가요',
    blurb: 'Go somewhere in order to do something.',
    items: [
      v('먹으러가요', '먹으러 가요.', 'I am going to eat.'),
      v('사러가요', '사러 가요.', 'I am going to buy something.'),
      v('놀러가요', '공원에 놀러 가요.', 'I go to the park to play.'),
      v('놀러와요', '놀러 와요.', 'Come and play.'),
    ],
    steps: [
      tc(
        'Going in order to: -(으)러',
        [
          'Add -(으)러 to a verb stem to say why you are going somewhere. 사다 becomes 사러 가요 ("I am going to buy something"). 먹다 becomes 먹으러 가요 ("I am going to eat").',
          '놀다 becomes 놀러 가요 ("I go to play"). The ㄹ stays because the next sound is a vowel.',
        ],
        'Ginagamit ang -(으)러 para sa "pumunta para gawin ang ...": 사러 가요 = "Pupunta ako para bumili." 먹으러 가요 = "Pupunta ako para kumain." Patinig ang stem: 사다 → 사러. Katinig: 먹다 → 먹으러.',
        'Use it with places: 공원에 놀러 가요 = "I go to the park to play."',
        '-러 sounds like "-ro", as in "go to do". Purpose first, then the movement.',
        [
          { ko: '먹으러 가요.', en: 'I am going to eat.' },
          { ko: '사러 가요.', en: 'I am going to buy something.' },
          { ko: '공원에 놀러 가요.', en: 'I go to the park to play.' },
        ],
      ),
      tc(
        'Going and coming',
        [
          'The main verb after -(으)러 is usually 가요 (go) or 와요 (come). 놀러 와요 means "come and play", as if someone is invited to you.',
          'Put the place with 에 before the verb: 카페에 커피 마시러 가요 ("I go to the cafe to drink coffee").',
        ],
        'Ang pangunahing pandiwa pagkatapos ng -(으)러 ay 가요 (pumunta) o 와요 (pumunta rito): 놀러 와요 = "Pumunta ka rito para maglaro." Ilagay ang lugar na may 에: 카페에 커피 마시러 가요 = "Pupunta ako sa café para uminom ng kape."',
        'Say 밥 먹으러 가요! when you leave for lunch. Your friends will know where you are going.',
        'The reason comes first, then the movement: "eat-to go".',
        [
          { ko: '놀러 와요.', en: 'Come and play.' },
          { ko: '카페에 커피 마시러 가요.', en: 'I go to the cafe to drink coffee.' },
        ],
      ),
      ch('Which means "I am going to buy something"?', '사러 가요.', ['사고 가요.', '사요 가요.'], '-(으)러 gives the reason for going: 사러 가요. 사고 means "buy and", so it is not the reason.', '사러 가요 = pupunta para bumili.'),
      ch('"I go to the park to play." Which is right?', '공원에 놀러 가요.', ['공원에 놀아 가요.', '공원에 놀았어요.'], '놀다 becomes 놀러 before 가요. 놀았어요 is past tense, "I played".', '놀러 가요 = pupunta para maglaro.'),
    ],
  },
  {
    id: '4.46',
    phase: 4,
    title: 'I think it will: -(으)ㄹ 것 같아요',
    ko: '-(으)ㄹ 것 같아요',
    blurb: 'Guess what will happen.',
    items: [
      v('비가올거같아요', '비가 올 것 같아요.', 'I think it will rain.'),
      v('맛있을거같아요', '맛있을 것 같아요.', 'I think it will be delicious.'),
      v('늦을거같아요', '아마 늦을 것 같아요.', 'Maybe I will be late.'),
    ],
    steps: [
      tc(
        'A guess about what will happen: -(으)ㄹ 것 같아요',
        [
          'Add -(으)ㄹ 것 같아요 to a verb or adjective to guess what will happen. 비가 오다 becomes 비가 올 것 같아요 ("I think it will rain"). 맛있다 becomes 맛있을 것 같아요 ("I think it will be delicious").',
          'It is softer than a plain statement. You are not sure, you are guessing.',
        ],
        'Ginagamit ang -(으)ㄹ 것 같아요 para sa hula sa mangyayari: 비가 올 것 같아요 = "Sa tingin ko uulan." Patinig: 가다 → 갈 것 같아요. Katinig: 먹다 → 먹을 것 같아요.',
        'Look at the sky and say 비가 올 것 같아요 to start a chat about the weather.',
        'The 것 means "thing", so the sentence says "it seems like a thing that will happen".',
        [
          { ko: '비가 올 것 같아요.', en: 'I think it will rain.' },
          { ko: '맛있을 것 같아요.', en: 'I think it will be delicious.' },
        ],
      ),
      tc(
        'Adding 아마 for a softer guess',
        [
          'Put 아마 (maybe) before the guess to make it even softer: 아마 늦을 것 같아요 means "maybe I will be late".',
          'Do not confuse it with -(으)ㄴ/는 것 같아요 (lesson 4.28), which guesses about what is true now.',
        ],
        'Puwedeng dagdagan ng 아마 (baka) para mas malambot: 아마 늦을 것 같아요 = "Baka mahuli ako." Huwag itong ipagkamali sa -(으)ㄴ/는 것 같아요 (4.28), na hula tungkol sa kasalukuyan.',
        'When you are running late, say 아마 늦을 것 같아요 and send a text. People will appreciate the warning.',
        '아마 = maybe. The guess comes after it.',
        [
          { ko: '아마 늦을 것 같아요.', en: 'Maybe I will be late.' },
          { ko: '비가 올 것 같아요.', en: 'I think it will rain.' },
        ],
      ),
      ch('It looks like rain soon. What do you say?', '비가 올 것 같아요.', ['비가 왔어요.', '비가 오고 싶어요.'], '-(으)ㄹ 것 같아요 guesses what will happen. 왔어요 is past, and 오고 싶어요 means "want to come".', '비가 올 것 같아요 = sa tingin ko uulan.'),
      ch('Which one is a guess about the future?', '맛있을 것 같아요.', ['맛있어요.', '맛있었어요.'], '맛있어요 states a fact now and 맛있었어요 is a past fact. Only 맛있을 것 같아요 guesses.', 'Hula lang ang 맛있을 것 같아요.'),
    ],
  },
];

export const KIDS6: Lesson[] = [
  {
    id: 'K26',
    phase: 5,
    title: 'At the playground',
    ko: '놀이터에서',
    blurb: 'Swings, slides and playing together.',
    items: [
      k('놀이터', '놀이터', 'playground'),
      k('그네', '그네', 'swing'),
      k('미끄럼틀', '미끄럼틀', 'slide'),
      k('같이놀아요', '같이 놀아요.', 'Let us play together.'),
    ],
    steps: [
      tc(
        'Playground words',
        [
          '놀이터 is a playground. 그네 is a swing. 미끄럼틀 is a slide. 그네를 타요 means "I ride the swing". Ride is 타다.',
          'Say 같이 놀아요 ("let us play together") to invite a friend.',
        ],
        'Ang 놀이터 ay palaruan. Ang 그네 ay swing. Ang 미끄럼틀 ay slide. Sabihin ang 같이 놀아요 = "Maglaro tayo." 그네를 타요 = "Sumasakay ako sa swing."',
        'Ask a friend 같이 놀아요! to start a game.',
        '놀이터 sounds like "no-ri-teo". It is the place where you play.',
        [
          { ko: '놀이터.', en: 'playground' },
          { ko: '그네를 타요.', en: 'I ride the swing.' },
          { ko: '같이 놀아요.', en: 'Let us play together.' },
        ],
      ),
      tc(
        'Taking turns',
        [
          'Say 제 차례예요 ("it is my turn"). 차례 means turn.',
          'After a friend, you can say 다음은 너예요 ("you are next").',
        ],
        'Sabihin ang 제 차례예요 = "Turn ko na." 차례 ay turn. 다음은 너예요 = "Ikaw na ang susunod."',
        'Taking turns is the best part of playing together. Say it clearly.',
        '차례 (cha-rye) sounds like "cha-ray", a turn on a ride.',
        [
          { ko: '제 차례예요.', en: 'It is my turn.' },
          { ko: '다음은 너예요.', en: 'You are next.' },
        ],
      ),
      ch('Which word means "swing"?', '그네', ['미끄럼틀', '놀이터'], '그네 is the swing. 미끄럼틀 is the slide and 놀이터 is the playground.', '그네 = swing.'),
      ch('Which means "I ride the swing"?', '그네를 타요.', ['그네를 먹어요.', '그네를 읽어요.'], '타다 means ride. 먹다 means eat and 읽다 means read.', '타요 = sumasakay.'),
      ch('Your friend says 같이 놀아요! What do you say back?', '좋아요!', ['싫어요! 자요.', '배불러요.'], '좋아요 means sounds good.', 'Ang 좋아요 = sige!'),
    ],
  },
  {
    id: 'K27',
    phase: 5,
    title: 'Brushing my teeth',
    ko: '이를 닦아요',
    blurb: 'Toothbrush, toothpaste and clean teeth.',
    items: [
      k('칫솔', '칫솔', 'toothbrush'),
      k('치약', '치약', 'toothpaste'),
      k('이', '이', 'tooth'),
      k('이를닦아요', '이를 닦아요.', 'I brush my teeth.'),
    ],
    steps: [
      tc(
        'Toothbrush and toothpaste',
        [
          '칫솔 is a toothbrush. 치약 is toothpaste. 이 is a tooth. 이를 닦아요 means "I brush my teeth". 닦다 means to brush or wipe clean.',
          'Brush for a long time. Count 하나, 둘, 셋 as you brush.',
        ],
        'Ang 칫솔 ay toothbrush. Ang 치약 ay toothpaste. Ang 이 ay ngipin. Sabihin ang 이를 닦아요 = "Nagsisipilyo ako ng ngipin." 닦다 ay magsipilyo o magpunas.',
        'Brush after every meal and before bed. Say 이를 닦아요 each time.',
        '닦아요 sounds like "dak-a-yo". Scrub once for each syllable.',
        [
          { ko: '칫솔.', en: 'toothbrush' },
          { ko: '치약.', en: 'toothpaste' },
          { ko: '이를 닦아요.', en: 'I brush my teeth.' },
        ],
      ),
      tc(
        'Did you brush?',
        [
          'Ask 이 닦았어요? ("Did you brush your teeth?"). The past form is 닦았어요 because 닦 has the vowel ㅏ.',
          'Answer 네, 닦았어요 ("yes, I did") or 아직이요 ("not yet").',
        ],
        'Itanong ang 이 닦았어요? = "Nagsipilyo ka na ba?" Sagot: 네, 닦았어요 = "Opo, nagsipilyo na." o 아직이요 = "Hindi pa po."',
        'Ask 이 닦았어요? before bed every night, like a bedtime ritual.',
        'Stems with ㅏ or ㅗ take 았 in the past: 닦 + 았어요 = 닦았어요.',
        [
          { ko: '이 닦았어요?', en: 'Did you brush your teeth?' },
          { ko: '네, 닦았어요.', en: 'Yes, I did.' },
        ],
      ),
      ch('Which word means "toothbrush"?', '칫솔', ['치약', '이'], '칫솔 is the toothbrush. 치약 is the toothpaste.', '칫솔 = sepilyo.'),
      ch('Which is correct for "I brush my teeth"?', '이를 닦아요.', ['이를 먹어요.', '이를 읽어요.'], '닦다 means brush. 먹다 means eat and 읽다 means read.', '닦다 = magsipilyo.'),
    ],
  },
  {
    id: 'K28',
    phase: 5,
    title: 'Feeling sick',
    ko: '아파요',
    blurb: 'Tell a grown-up where it hurts.',
    items: [
      k('아파요', '아파요.', 'It hurts.'),
      k('머리', '머리', 'head'),
      k('배', '배', 'stomach'),
      k('약', '약', 'medicine'),
      k('머리가아파요', '머리가 아파요.', 'My head hurts.'),
    ],
    steps: [
      tc(
        'Ouch, it hurts',
        [
          '아파요 means "it hurts" or "I am sick". 머리 is the head, 배 is the stomach, and 약 is medicine.',
          '머리가 아파요 means "my head hurts". For a stomach ache say 배가 아파요.',
        ],
        'Ang 아파요 ay masakit o may sakit. 머리 = ulo. 배 = tiyan. 약 = gamot. Sabihin ang 머리가 아파요 = "Masakit ang ulo ko."',
        'Point to the part that hurts and say its name: 머리, 배, 손.',
        '아파요 starts with 아, the sound you make when something hurts: "ah!"',
        [
          { ko: '아파요.', en: 'It hurts.' },
          { ko: '머리가 아파요.', en: 'My head hurts.' },
          { ko: '배가 아파요.', en: 'My stomach hurts.' },
        ],
      ),
      tc(
        'Asking and helping',
        [
          'Ask 어디가 아파요? ("Where does it hurt?"). The answer is 머리가 아파요 or 배가 아파요.',
          'When you feel sick, tell a grown-up. If you need medicine, they may say 약 먹어요 ("take the medicine").',
        ],
        'Itanong ang 어디가 아파요? = "Saan masakit?" Sagot: 머리가 아파요 o 배가 아파요. Kung may sakit, sabihin ang 약 먹어요 = "Uminom ng gamot."',
        'Tell a grown-up 아파요! right away. That is the most important word today.',
        'Use 어디 (where) plus 아파요 to ask about pain.',
        [
          { ko: '어디가 아파요?', en: 'Where does it hurt?' },
          { ko: '배가 아파요.', en: 'My stomach hurts.' },
          { ko: '약 먹어요.', en: 'Take the medicine.' },
        ],
      ),
      ch('Your head hurts. Which do you say?', '머리가 아파요.', ['머리가 좋아요.', '머리가 커요.'], '머리가 아파요 means "my head hurts". 좋아요 is good and 커요 is big.', '머리가 아파요 = masakit ang ulo ko.'),
      ch('Which word means "medicine"?', '약', ['배', '머리'], '약 is medicine. 배 is stomach.', '약 = gamot.'),
    ],
  },
];

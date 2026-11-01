import type { Lesson } from './lessons';
import { ch, tc } from './lessons-everyday';

const v = (id: string, korean: string, english: string) => ({ id: `v12.${id}`, korean, english });
const k = (id: string, korean: string, english: string) => ({ id: `k7.${id}`, korean, english });

export const EXTRA12: Lesson[] = [
  {
    id: '4.47',
    phase: 4,
    title: 'Have you ever: -(으)ㄴ 적 있어요',
    ko: '-(으)ㄴ 적 있어요',
    blurb: 'Talk about things you have done before.',
    items: [
      v('가본적', '한국에 간 적 있어요.', 'I have been to Korea.'),
      v('먹은적', '김치를 먹은 적 있어요.', 'I have tried kimchi.'),
      v('없어요', '한 번도 간 적 없어요.', 'I have never been there.'),
    ],
    steps: [
      tc(
        'Done before: -(으)ㄴ 적 있어요',
        [
          'Add -(으)ㄴ 적 있어요 to a verb stem to say you have done something before. 가다 becomes 간 적 있어요 ("I have been there"). 먹다 becomes 먹은 적 있어요 ("I have eaten it").',
          'For never, put 한 번도 (not even once) in front: 한 번도 간 적 없어요 ("I have never been").',
        ],
        'Ginagamit ang -(으)ㄴ 적 있어요 para sabihing nakagawa ka na ng isang bagay dati: 간 적 있어요 = "Nakapunta na ako." 먹은 적 있어요 = "Nakakain na ako nito." Para sa "hindi pa kailanman": 한 번도 간 적 없어요.',
        'Ask a friend 한국 음식 먹은 적 있어요? ("have you ever eaten Korean food?") to start a conversation.',
        '적 means an experience. So the sentence says "there is an experience of having gone".',
        [
          { ko: '한국에 간 적 있어요.', en: 'I have been to Korea.' },
          { ko: '김치를 먹은 적 있어요.', en: 'I have tried kimchi.' },
          { ko: '한 번도 간 적 없어요.', en: 'I have never been there.' },
        ],
      ),
      tc(
        'Asking and answering',
        [
          'Turn it into a question with a rising tone: 먹은 적 있어요? ("have you ever eaten it?").',
          'Answer 네, 있어요 ("yes, I have") or 아니요, 없어요 ("no, I have not").',
        ],
        'Gawing tanong sa pagtaas ng tono: 먹은 적 있어요? = "Nakakain ka na ba nito?" Sagot: 네, 있어요 = "Opo, meron na." o 아니요, 없어요 = "Hindi po, wala pa."',
        'Use 한 번도 to make the answer stronger: 한 번도 없어요 means "not even once".',
        'The answer is 있어요 for yes and 없어요 for no, just like 있다 and 없다 elsewhere in Korean.',
        [
          { ko: '먹은 적 있어요?', en: 'Have you ever eaten it?' },
          { ko: '네, 있어요.', en: 'Yes, I have.' },
          { ko: '아니요, 없어요.', en: 'No, I have not.' },
        ],
      ),
      ch('"I have been to Korea." Which is right?', '한국에 간 적 있어요.', ['한국에 가고 싶어요.', '한국에 가서 있어요.'], '간 적 있어요 means you have been there before. 가고 싶어요 means you want to go.', '간 적 있어요 = nakapunta na.'),
      ch('Someone asks 먹은 적 있어요? You have never tried it. Which answer?', '아니요, 없어요.', ['네, 먹어요.', '네, 먹고 싶어요.'], '아니요, 없어요 says you have no such experience. The other answers say yes.', 'Hindi, wala pa.'),
    ],
  },
  {
    id: '4.48',
    phase: 4,
    title: 'It is better to: -는 게 좋아요',
    ko: '-는 게 좋아요',
    blurb: 'Give friendly advice about what is good to do.',
    items: [
      v('일찍자는게', '일찍 자는 게 좋아요.', 'It is better to sleep early.'),
      v('운동하는게', '매일 운동하는 게 좋아요.', 'It is good to exercise every day.'),
      v('물마시는게', '물을 많이 마시는 게 좋아요.', 'It is good to drink a lot of water.'),
    ],
    steps: [
      tc(
        'Good to do: -는 게 좋아요',
        [
          'Add -는 게 좋아요 to a verb stem to say something is good or better to do. 자다 becomes 자는 게 좋아요 ("it is better to sleep"). 운동하다 becomes 운동하는 게 좋아요 ("it is good to exercise").',
          '게 is short for 것, which means "the thing". So the sentence says "the thing of sleeping is good".',
        ],
        'Ginagamit ang -는 게 좋아요 para sabihing mabuting gawin ang isang bagay: 일찍 자는 게 좋아요 = "Mas mabuting matulog nang maaga." Ang 게 ay hinango sa 것, na ibig sabihin ay "bagay".',
        'When a friend is tired, say 일찍 자는 게 좋아요 with a smile. It sounds caring.',
        '게 is a short form of 것, the thing. Think "doing the thing is good".',
        [
          { ko: '일찍 자는 게 좋아요.', en: 'It is better to sleep early.' },
          { ko: '매일 운동하는 게 좋아요.', en: 'It is good to exercise every day.' },
          { ko: '물을 많이 마시는 게 좋아요.', en: 'It is good to drink a lot of water.' },
        ],
      ),
      tc(
        'A gentle suggestion',
        [
          'This is a soft suggestion, not an order. Compare it with 해야 해요 ("must", lesson about -아/어야 해요), which is stronger.',
          'To agree, say 맞아요 ("that is right") or 그래요 ("okay, you are right").',
        ],
        'Mas malambot ito kaysa sa -아/어야 해요 (dapat). Para sumang-ayon, sabihin ang 맞아요 = "Tama." o 그래요 = "Sige nga, tama ka."',
        'Add 꼭 (definitely) to make the advice stronger: 꼭 먹는 게 좋아요.',
        'The suggestion says "the thing is good", so it sounds gentle, not bossy.',
        [
          { ko: '맞아요.', en: 'That is right.' },
          { ko: '그래요.', en: 'Okay, you are right.' },
          { ko: '꼭 먹는 게 좋아요.', en: 'It is definitely good to eat it.' },
        ],
      ),
      ch('Your friend is tired. You gently suggest sleep. What do you say?', '일찍 자는 게 좋아요.', ['일찍 자고 싶어요.', '일찍 잤어요.'], '-는 게 좋아요 gives advice. 자고 싶어요 means you want to sleep and 잤어요 is past.', 'Payo: 는 게 좋아요.'),
      ch('"It is good to drink water." Which is correct?', '물을 마시는 게 좋아요.', ['물을 마셨어요.', '물을 마시고 싶어요.'], '-는 게 좋아요 is the advice pattern. 마셨어요 is past and 마시고 싶어요 means you want to drink.', 'Mabuting uminom ng tubig.'),
    ],
  },
  {
    id: '4.49',
    phase: 4,
    title: 'No need to: -(으)ㄹ 필요 없어요',
    ko: '-(으)ㄹ 필요 없어요',
    blurb: 'Say something is not necessary.',
    items: [
      v('걱정할필요', '걱정할 필요 없어요.', 'No need to worry.'),
      v('서두를필요', '서두를 필요 없어요.', 'No need to hurry.'),
      v('올필요', '올 필요 없어요.', 'You do not need to come.'),
    ],
    steps: [
      tc(
        'Not necessary: -(으)ㄹ 필요 없어요',
        [
          'Add -(으)ㄹ 필요 없어요 to a verb stem to say there is no need to do something. 걱정하다 becomes 걱정할 필요 없어요 ("no need to worry"). 가다 becomes 갈 필요 없어요 ("no need to go").',
          '필요 means need and 없어요 means there is not. Literally: "there is no need".',
        ],
        'Ginagamit ang -(으)ㄹ 필요 없어요 para sabihing hindi kailangan gawin ang isang bagay: 걱정할 필요 없어요 = "Walang dapat ikabahala." Ang 필요 ay "kailangan", at ang 없어요 ay "wala".',
        'Say 걱정할 필요 없어요! to calm a friend before a test.',
        '필요 없어요 sounds like "pil-yo eop-seo-yo": "need? nope!"',
        [
          { ko: '걱정할 필요 없어요.', en: 'No need to worry.' },
          { ko: '서두를 필요 없어요.', en: 'No need to hurry.' },
          { ko: '올 필요 없어요.', en: 'You do not need to come.' },
        ],
      ),
      tc(
        'Two ways to say you do not have to',
        [
          'Another way is 안 해도 돼요 ("you do not have to do it"). 필요 없어요 says something is unnecessary. 안 해도 돼요 talks about permission.',
          'When someone apologises, reply with 괜찮아요 ("it is okay").',
        ],
        'Ibang paraan: 안 해도 돼요 = "Hindi mo kailangang gawin." Gamitin ang 필요 없어요 kapag sa tingin mo ay hindi kailangan; ang 안 해도 돼요 kapag tungkol sa pahintulot. Kapag humingi ng tawad ang kausap, sabihin ang 괜찮아요 = "Okay lang."',
        'Use 괜찮아요 as a warm reply when someone says sorry.',
        '필요 is need. No need is 필요 없어요.',
        [
          { ko: '안 해도 돼요.', en: 'You do not have to do it.' },
          { ko: '괜찮아요.', en: 'It is okay.' },
        ],
      ),
      ch('Your friend worries about the test. Which do you say?', '걱정할 필요 없어요.', ['걱정했어요.', '걱정하고 싶어요.'], '필요 없어요 says there is no need. 걱정했어요 is past and 걱정하고 싶어요 means you want to worry.', 'Walang dapat ikabahala.'),
      ch('"You do not need to come." Which is right?', '올 필요 없어요.', ['올 수 있어요.', '왔어요.'], '올 필요 없어요 says there is no need to come. 올 수 있어요 means can come and 왔어요 is past.', 'Hindi mo kailangang pumunta.'),
    ],
  },
  {
    id: '4.50',
    phase: 4,
    title: 'After doing: -고 나서',
    ko: '-고 나서',
    blurb: 'Put one action after another, in order.',
    items: [
      v('먹고나서커피', '밥을 먹고 나서 커피를 마셔요.', 'After eating, I drink coffee.'),
      v('공부하고나서', '공부하고 나서 자요.', 'After studying, I sleep.'),
      v('샤워하고나서', '샤워하고 나서 나갔어요.', 'After showering, I went out.'),
    ],
    steps: [
      tc(
        'One thing, then the next: -고 나서',
        [
          'Add -고 나서 to a verb stem to say one action happens after another has finished. 먹다 becomes 먹고 나서 ("after eating"). 공부하다 becomes 공부하고 나서 ("after studying").',
          'The second action comes after 나서: 밥을 먹고 나서 커피를 마셔요 ("after eating, I drink coffee").',
        ],
        'Ginagamit ang -고 나서 para sa "pagkatapos gawin ang ...": 먹고 나서 = "Pagkatapos kumain." 공부하고 나서 = "Pagkatapos mag-aral."',
        'Plan your afternoon with it: 밥 먹고 나서 커피 마셔요.',
        '고 나서 means "and then, after that". Finish one thing, then move on.',
        [
          { ko: '밥을 먹고 나서 커피를 마셔요.', en: 'After eating, I drink coffee.' },
          { ko: '공부하고 나서 자요.', en: 'After studying, I sleep.' },
          { ko: '샤워하고 나서 나갔어요.', en: 'After showering, I went out.' },
        ],
      ),
      tc(
        'After versus before',
        [
          '-고 나서 means after you finish. -기 전에 (lesson on before and after) means before you start. 먹고 나서 is after eating, and 먹기 전에 is before eating.',
          'Both mark the order of two actions, but they point in opposite directions.',
        ],
        'Pareho silang nagpapakita ng pagkakasunod: 먹고 나서 = pagkatapos kumain. 먹기 전에 = bago kumain. Magkasalungat ang direksyon nila.',
        'Wash your hands, then eat: 손 씻고 나서 밥 먹어요.',
        'Think of 나서 as "came out of it": the first action is over.',
        [
          { ko: '손 씻고 나서 밥 먹어요.', en: 'Wash hands, and then eat.' },
          { ko: '밥 먹기 전에 손 씻어요.', en: 'Wash hands before eating.' },
        ],
      ),
      ch('Which means "After eating, I drink coffee"?', '밥 먹고 나서 커피를 마셔요.', ['밥 먹고 싶어요, 커피 마셔요.', '밥 먹어서 커피 마셔요.'], '-고 나서 puts the actions in order: eat first, then drink. 먹어서 means "because I ate".', 'Pagkatapos kumain, umiinom ng kape.'),
      ch('Which uses the "before" pattern to say "wash hands before eating"?', '밥 먹기 전에 손 씻어요.', ['밥 먹고 나서 손 씻어요.', '밥 먹고 싶어요.'], '먹기 전에 means before eating. 먹고 나서 means after eating.', 'Bago kumain = 먹기 전에.'),
    ],
  },
];

export const KIDS7: Lesson[] = [
  {
    id: 'K29',
    phase: 5,
    title: 'Rainy day',
    ko: '비 오는 날',
    blurb: 'Umbrellas and puddles.',
    items: [
      k('우산', '우산', 'umbrella'),
      k('비', '비', 'rain'),
      k('비가와요', '비가 와요.', 'It is raining.'),
      k('우산을써요', '우산을 써요.', 'I open my umbrella.'),
    ],
    steps: [
      tc(
        'Umbrella and rain',
        [
          '우산 is an umbrella. 비 is rain. 비가 와요 means "it is raining". 우산을 써요 means "I open my umbrella". 쓰다 is the verb for opening an umbrella.',
          'When you go out, say 우산 가져가요 ("I take an umbrella").',
        ],
        'Ang 우산 ay payong. Ang 비 ay ulan. Sabihin ang 비가 와요 = "Umuulan." 우산을 써요 = "Binubuksan ko ang payong."',
        'Look outside first. If 비가 와요, grab the 우산!',
        '비 sounds like "bee". Imagine a bee buzzing in the rain.',
        [
          { ko: '우산.', en: 'umbrella' },
          { ko: '비가 와요.', en: 'It is raining.' },
          { ko: '우산을 써요.', en: 'I open my umbrella.' },
        ],
      ),
      tc(
        'Wet or dry',
        [
          '젖어요 means "gets wet". 옷이 젖어요 means "my clothes get wet".',
          'When the rain stops, say 비가 그쳤어요 ("the rain stopped").',
        ],
        'Ang 젖어요 ay nababasa. 옷이 젖어요 = "Nababasa ang damit ko." 비가 그쳤어요 = "Tumigil na ang ulan."',
        'Tell a grown-up 옷이 젖어요! if your clothes get wet.',
        '젖다 sounds like "jut": the jut of a wet puddle.',
        [
          { ko: '옷이 젖어요.', en: 'My clothes get wet.' },
          { ko: '비가 그쳤어요.', en: 'The rain stopped.' },
        ],
      ),
      ch('Which word means "umbrella"?', '우산', ['비', '신발'], '우산 is the umbrella. 비 is rain.', '우산 = payong.'),
      ch('It is raining. What do you say?', '비가 와요.', ['비가 좋아요.', '비가 커요.'], '와요 comes from 오다, which means to come or to fall. 좋아요 means good.', 'Umuulan = 비가 와요.'),
    ],
  },
  {
    id: 'K30',
    phase: 5,
    title: 'Shoes and socks',
    ko: '신발과 양말',
    blurb: 'Putting on and taking off.',
    items: [
      k('신발', '신발', 'shoes'),
      k('양말', '양말', 'socks'),
      k('신발을신어요', '신발을 신어요.', 'I put on my shoes.'),
    ],
    steps: [
      tc(
        'Shoes first',
        [
          '신발 is shoes. 양말 is socks. 신다 is the verb for putting on shoes and socks, so 신발을 신어요 means "I put on my shoes".',
          '양말을 신어요 means "I put on socks".',
        ],
        'Ang 신발 ay sapatos. Ang 양말 ay medyas. Ang 신다 ang pandiwa para sa pagsuot ng sapatos at medyas: 신발을 신어요 = "Sinusuot ko ang sapatos."',
        'Say 신발 신어요! before you leave the house.',
        '신 sounds like "shin". Slip your shin into the shoe.',
        [
          { ko: '신발.', en: 'shoes' },
          { ko: '양말을 신어요.', en: 'I put on socks.' },
          { ko: '신발을 신어요.', en: 'I put on my shoes.' },
        ],
      ),
      tc(
        'Take them off',
        [
          'To take off shoes, use 벗어요 ("I take off"). 신발을 벗어요 means "I take off my shoes".',
          'In many Korean homes, people take off their shoes at the door.',
        ],
        'Para hubarin ang sapatos, gamitin ang 벗어요 = "Hinuhubad ko." 신발을 벗어요 = "Hinuhubad ko ang sapatos." Sa maraming bahay sa Korea, hinuhubad ang sapatos sa pinto.',
        'When you go into a house, take off your shoes first: 집에 들어가면 신발을 벗어요.',
        'Think "bye" to your shoes: 벗어요 takes them off.',
        [
          { ko: '신발을 벗어요.', en: 'I take off my shoes.' },
          { ko: '집에 들어가요.', en: 'I go into the house.' },
        ],
      ),
      ch('Which means "I put on my shoes"?', '신발을 신어요.', ['신발을 벗어요.', '신발을 먹어요.'], '신다 means put on. 벗다 means take off. 먹다 means eat.', 'Sinusuot = 신어요.'),
      ch('Which word means "socks"?', '양말', ['신발', '우산'], '양말 is socks. 신발 is shoes.', 'Ang 양말 = medyas.'),
    ],
  },
  {
    id: 'K31',
    phase: 5,
    title: 'Saying goodbye',
    ko: '안녕히 가세요',
    blurb: 'Who is leaving, and who stays.',
    items: [
      k('안녕히가세요', '안녕히 가세요.', 'Goodbye (you are leaving).'),
      k('안녕히계세요', '안녕히 계세요.', 'Goodbye (I am leaving).'),
      k('잘가요', '잘 가요.', 'Bye, take care.'),
      k('또봐요', '또 봐요.', 'See you again.'),
    ],
    steps: [
      tc(
        'Who is leaving?',
        [
          '안녕히 가세요 is said to someone who is leaving. 안녕히 계세요 is said by the person who is leaving to the people who stay.',
          'With friends, say 또 봐요 ("see you again").',
        ],
        'Sabihin ang 안녕히 가세요 sa taong aalis. Sabihin ang 안녕히 계세요 kapag ikaw ang aalis at ang iba ang maiiwan. Sa kaibigan, sabihin ang 또 봐요 = "Magkita tayo ulit."',
        'Bow a little when you say 안녕히 계세요 to a grown-up. It shows respect.',
        '가세요: they go. 계세요: they stay, so I am the one leaving.',
        [
          { ko: '안녕히 가세요.', en: 'Goodbye (you are leaving).' },
          { ko: '안녕히 계세요.', en: 'Goodbye (I am leaving).' },
          { ko: '또 봐요!', en: 'See you again!' },
        ],
      ),
      tc(
        'Friendly goodbyes',
        [
          '잘 가요 means "go well". It is a friendly bye to a friend who is walking home.',
          'Say 잘 가요! and wave with your hand.',
        ],
        'Ang 잘 가요 ay "ingat ka." Sabihin ito sa kaibigang uuwi.',
        'Wave with your hand, then say 또 봐요!',
        '잘 means well and 가요 means go. Go well!',
        [
          { ko: '잘 가요!', en: 'Bye, take care!' },
          { ko: '또 봐요!', en: 'See you again!' },
        ],
      ),
      ch('Your grandma is leaving the house and you stay. What do you say?', '안녕히 가세요.', ['안녕히 계세요.', '안녕히 드세요.'], '가세요 is said to someone who is leaving. 계세요 is said by the person who leaves.', 'Ang 가세요 ay para sa aalis.'),
      ch('You are leaving your friend at the park. Which goodbye?', '또 봐요!', ['안녕히 계세요.', '안녕히 드세요.'], '또 봐요 is casual and friendly. The other two are polite forms for elders.', 'Sa kaibigan: 또 봐요!'),
    ],
  },
];

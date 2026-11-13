import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const v = (id: string, korean: string, english: string) => ({ id: `v17.${id}`, korean, english });

export const PRACTICAL: Lesson[] = [
  {
    id: '4.76',
    phase: 4,
    deep: true,
    title: 'Ask for a recommendation',
    ko: '추천해 주세요',
    blurb: 'Let a shop or a friend choose for you.',
    items: [
      v('추천해주세요', '추천해 주세요.', 'Please recommend something.'),
      v('제일맛있어요', '제일 맛있는 게 뭐예요?', 'What is the most delicious?'),
      v('이거추천해요', '이거 추천해요?', 'Do you recommend this?'),
    ],
    steps: [
      {
        ...dtc(
          'Let someone choose: 추천해 주세요',
          [
            '추천하다 means "to recommend". Add 해 주세요 to ask someone to recommend: 추천해 주세요 ("please recommend something").',
            'Make the question specific: 제일 맛있는 게 뭐예요? ("what is the most delicious?") gets a better answer than 뭐 있어요?',
          ],
          'Ang 추천하다 ay "magrekomenda". 추천해 주세요 = "Pakirekomenda naman po." Gawing tiyak ang tanong: 제일 맛있는 게 뭐예요? = "Ano ang pinakamasarap?"',
          'At a restaurant, say 추천해 주세요 and tell them what you like: 매운 거 말고요 ("not spicy, please").',
          'Recommend: 추천해 주세요. Ask the best: 제일 뭐예요?',
          [
            { ko: '추천해 주세요.', en: 'Please recommend something.' },
            { ko: '제일 맛있는 게 뭐예요?', en: 'What is the most delicious?' },
          ],
        ),
        tips: [
          'Say what you do not want, too: 매운 거 말고요 ("not spicy").',
          'Ask a shop assistant 뭐가 인기 있어요? ("what is popular?") for a quick pick.',
          'Use 이거 추천해요? when you point at one item.',
        ],
        locals: [
          { ko: '뭐가 제일 인기 있어요?', en: 'What is the most popular?', note: 'Locals ask this at cafes and bakeries. The staff usually have a clear answer.' },
          { ko: '처음 오셨으면 이거 추천해요.', en: 'If it is your first time, I recommend this.', note: 'Staff in Korean restaurants often say this for newcomers.' },
        ],
      },
      {
        ...dtc(
          'Telling what you like',
          [
            'Say what you like with 좋아하다: 단 거 좋아해요 ("I like sweet things"). Then ask 뭐가 좋을까요? ("what would be good?").',
            'Keep the answer short. Staff are happy to help with a clear hint.',
          ],
          'Sabihin ang gusto mo gamit ang 좋아하다: 단 거 좋아해요 = "Gusto ko ng matamis." Itanong ang 뭐가 좋을까요? = "Ano kaya ang maganda?"',
          'Give one hint and one "not": 단 거 좋아해요, 너무 달지 않게요.',
          'Like: 좋아해요. Ask what fits: 뭐가 좋을까요?',
          [
            { ko: '단 거 좋아해요.', en: 'I like sweet things.' },
            { ko: '뭐가 좋을까요?', en: 'What would be good?' },
          ],
        ),
        tips: [
          'Use 좀 to soften a request: 좀 추천해 주실 수 있어요? ("could you recommend something?").',
        ],
        locals: [
          { ko: '그걸로 주세요!', en: 'I will take that one!', note: 'Quick, friendly way to order after a recommendation.' },
        ],
      },
      ch('"Please recommend something." Which is correct?', '추천해 주세요.', ['추천 먹어요.', '추천했어요?'], '추천해 주세요 asks someone to recommend. 먹어요 is eat and 추천했어요 is past.', 'Pakirekomenda po.'),
      ch('Which question asks for the most delicious item?', '제일 맛있는 게 뭐예요?', ['제일 비싼 게 뭐예요?', '제일 가고 싶어요?'], 'The question asks what is most delicious. The others ask for the most expensive or what you want.', 'Ano ang pinakamasarap?'),
    ],
  },
  {
    id: '4.77',
    phase: 4,
    deep: true,
    title: 'Tends to be: -(으)ㄴ 편이에요',
    ko: '-(으)ㄴ 편이에요',
    blurb: 'Describe a habit or a quality without being absolute.',
    items: [
      v('일찍자는편', '저는 일찍 자는 편이에요.', 'I tend to go to bed early.'),
      v('매운편', '이 음식은 매운 편이에요.', 'This food is fairly spicy.'),
      v('비싼편', '여기는 비싼 편이에요.', 'This place is rather expensive.'),
    ],
    steps: [
      {
        ...dtc(
          'More or less: -(으)ㄴ 편이에요',
          [
            '편 means "side" or "tendency". -는 편이에요 describes a habit (자다 becomes 자는 편이에요 "I tend to sleep"). -(으)ㄴ 편이에요 describes a quality (맵다 becomes 매운 편이에요 "it is fairly spicy").',
            'It is softer than a flat statement. You are describing a general tendency, not a rule.',
          ],
          'Ang 편 ay "medyo, kadalasan". 자는 편이에요 = "Madalas akong matulog." 매운 편이에요 = "Medyo maanghang."',
          'Describe yourself kindly: 저는 조용한 편이에요 ("I tend to be quiet").',
          'Tendency: 편이에요. Think of leaning to one side, not standing in the center.',
          [
            { ko: '저는 일찍 자는 편이에요.', en: 'I tend to go to bed early.' },
            { ko: '이 음식은 매운 편이에요.', en: 'This food is fairly spicy.' },
          ],
        ),
        tips: [
          'Use 편이에요 with a verb for habits, and with an adjective for qualities.',
          'Add 좀 or 약간 for less strength: 약간 비싼 편이에요.',
          'Do not use 편 for a strict rule. Use 항상 (always) for that.',
        ],
        locals: [
          { ko: '저는 말이 많은 편이에요.', en: 'I tend to talk a lot.', note: 'A friendly self-description on a first meeting.' },
          { ko: '여기 좀 시끄러운 편이에요.', en: 'This place is a bit noisy.', note: 'A common review about busy cafes and restaurants.' },
        ],
      },
      {
        ...dtc(
          'Comparing and describing people',
          [
            'Use 편이에요 to describe a person or place fairly: 그 친구는 친절한 편이에요 ("that friend is fairly kind").',
            'It is a balanced word, good when you do not want to sound too strong.',
          ],
          'Gamitin ang 편이에요 para sa taong o lugar: 그 친구는 친절한 편이에요 = "Medyo mabait ang kaibigan niya."',
          'When you do not want to overpraise or criticise, add 편이에요 at the end.',
          'Balanced: 편이에요. Fair, not extreme.',
          [
            { ko: '그 친구는 친절한 편이에요.', en: 'That friend is fairly kind.' },
          ],
        ),
        tips: [
          'The 편 comes after the verb or adjective, with the attributive form before it.',
        ],
        locals: [
          { ko: '가격은 싼 편이에요.', en: 'The price is on the cheap side.', note: 'Shop staff use this to set expectations kindly.' },
        ],
      },
      ch('"I tend to go to bed early." Which is correct?', '저는 일찍 자는 편이에요.', ['저는 일찍 자고 싶어요.', '저는 일찍 잤어요.'], '-는 편이에요 describes a habit. 자고 싶어요 is want and 잤어요 is past.', 'Madalas akong matulog nang maaga.'),
      ch('Which means "this food is fairly spicy"?', '이 음식은 매운 편이에요.', ['이 음식은 매워요?', '이 음식은 매웠어요.'], '매운 편이에요 says fairly spicy. 매워요 is a flat statement and 매웠어요 is past.', 'Medyo maanghang ang pagkain.'),
    ],
  },
  {
    id: '4.78',
    phase: 4,
    deep: true,
    title: 'No choice: -(으)ㄹ 수밖에 없어요',
    ko: '-(으)ㄹ 수밖에 없어요',
    blurb: 'Say you have no other option.',
    items: [
      v('기다릴수밖에', '기다릴 수밖에 없어요.', 'I have no choice but to wait.'),
      v('걸을수밖에', '버스가 없어서 걸을 수밖에 없어요.', 'There is no bus, so I have to walk.'),
      v('할수밖에', '그건 할 수밖에 없어요.', 'I have to do it.'),
    ],
    steps: [
      {
        ...dtc(
          'Only option: -(으)ㄹ 수밖에 없어요',
          [
            '-(으)ㄹ 수밖에 없어요 means "there is no other way but to". 기다리다 becomes 기다릴 수밖에 없어요 ("I have no choice but to wait").',
            'Use it when circumstances force you. It is not a personal wish.',
          ],
          'Ang -(으)ㄹ 수밖에 없어요 ay "wala nang ibang paraan kundi". 기다릴 수밖에 없어요 = "Wala akong magawa kundi maghintay."',
          'When the bus is late, say 기다릴 수밖에 없어요 with a sigh and a smile.',
          'No other way: 수밖에 없어요. The 수 is the way, and only one.',
          [
            { ko: '기다릴 수밖에 없어요.', en: 'I have no choice but to wait.' },
            { ko: '그건 할 수밖에 없어요.', en: 'I have to do it.' },
          ],
        ),
        tips: [
          'Use 수밖에 without 없어요 for "only": 두 개밖에 없어요 ("there are only two").',
          'Do not use it for your choice. Use -기로 했어요 for a choice.',
          'Friends say it casually as 수밖에 없어 with a shrug.',
        ],
        locals: [
          { ko: '비가 와서 택시 탈 수밖에 없어요.', en: 'It is raining, so I have no choice but to take a taxi.', note: 'Common when a plan is changed by the weather in Seoul.' },
          { ko: '그럴 수밖에 없었어요.', en: 'There was nothing else to do.', note: 'A kind way to say you understand someone had no choice.' },
        ],
      },
      {
        ...dtc(
          'Reason and result',
          [
            'Give the reason with -아/어서 first, then the result with 수밖에 없어요: 버스가 없어서 걸을 수밖에 없어요 ("there is no bus, so I must walk").',
            'The reason makes the sentence feel natural.',
          ],
          'Ibigay ang dahilan gamit ang -아/어서, tapos ang resulta gamit ang 수밖에 없어요: 버스가 없어서 걸을 수밖에 없어요.',
          'Tell a friend the reason, then the result, like a story.',
          'Reason first, then no way out: 서, 수밖에.',
          [
            { ko: '버스가 없어서 걸을 수밖에 없어요.', en: 'There is no bus, so I have to walk.' },
          ],
        ),
        tips: [
          'Use 수밖에 없다 after a noun by adding 일: 학생일 수밖에 없어요 (must be a student).',
        ],
        locals: [
          { ko: '늦을 수밖에 없었어요.', en: 'I could not help being late.', note: 'A polite apology with a reason.' },
        ],
      },
      ch('"I have no choice but to wait." Which is correct?', '기다릴 수밖에 없어요.', ['기다리고 싶어요.', '기다렸어요.'], '수밖에 없어요 says no other option. 기다리고 싶어요 is want and 기다렸어요 is past.', 'Wala akong magawa kundi maghintay.'),
      ch('Which means "there are only two"?', '두 개밖에 없어요.', ['두 개 없어요.', '두 개 있어요.'], '밖에 없어요 means only. 없어요 alone is not there, and 있어요 is there.', 'Dalawa lang.'),
    ],
  },
  {
    id: '4.79',
    phase: 4,
    deep: true,
    title: 'Gradually: -아/어 가다 and -아/어 오다',
    ko: '-아/어 가다 · -아/어 오다',
    blurb: 'Show change moving forward, or coming to you over time.',
    items: [
      v('배워가요', '한국어를 조금씩 배워 가요.', 'I am learning Korean little by little.'),
      v('걸어왔어요', '여기까지 걸어 왔어요.', 'I have walked all the way here.'),
      v('따뜻해져와요', '날씨가 점점 따뜻해져 와요.', 'The weather is gradually getting warmer.'),
    ],
    steps: [
      {
        ...dtc(
          'Moving forward: -아/어 가다',
          [
            '-아/어 가다 shows a change moving forward over time. 배우다 becomes 배워 가요 ("I am learning, step by step").',
            'It is about progress that is still going on.',
          ],
          'Ang -아/어 가다 ay "unti-unting umuusad". 배워 가요 = "Unti-unting natututo."',
          'Say 천천히 배워 가요 ("I am learning slowly") to be kind to yourself.',
          'Go forward: 가다. Changing as you go.',
          [
            { ko: '한국어를 조금씩 배워 가요.', en: 'I am learning Korean little by little.' },
          ],
        ),
        tips: [
          'Use 가다 for change that goes away from now, and 오다 for change coming toward you.',
          'Add 조금씩 (little by little) or 천천히 (slowly) to add feeling.',
        ],
        locals: [
          { ko: '점점 좋아져 가요!', en: 'It is getting better little by little!', note: 'Encouraging phrase a teacher or a friend says during progress.' },
        ],
      },
      {
        ...dtc(
          'Arriving over time: -아/어 오다',
          [
            '-아/어 오다 shows something that has been happening up to now. 걷다 becomes 걸어 왔어요 ("I have walked to here").',
            'It fits a past story that reaches the present.',
          ],
          'Ang -아/어 오다 ay "hanggang ngayon, nagawa na". 걸어 왔어요 = "Naglakad ako hanggang dito."',
          'Describe a long trip: 여기까지 걸어 왔어요 ("I walked all the way here").',
          'Come up to now: 오다. The past leads to here.',
          [
            { ko: '여기까지 걸어 왔어요.', en: 'I have walked all the way here.' },
            { ko: '날씨가 점점 따뜻해져 와요.', en: 'The weather is gradually getting warmer.' },
          ],
        ),
        tips: [
          'ㄷ verbs change: 걷다 becomes 걸어. Learn this one as a special case.',
        ],
        locals: [
          { ko: '열심히 살아 왔어요.', en: 'I have lived diligently up to now.', note: 'A reflective line people use at speeches and milestones.' },
        ],
      },
      ch('"I am learning Korean little by little." Which is correct?', '한국어를 조금씩 배워 가요.', ['한국어를 조금씩 배웠어요.', '한국어를 조금씩 배우고 싶어요.'], '-아/어 가다 shows gradual progress. 배웠어요 is past and 배우고 싶어요 is want.', 'Unti-unti akong natututo.'),
      ch('Which means "I have walked all the way here"?', '여기까지 걸어 왔어요.', ['여기까지 걸었어요.', '여기까지 걷고 싶어요.'], '-아/어 오다 shows a path up to now. 걸었어요 is simple past, and 걷고 싶어요 is want to walk.', 'Naglakad ako hanggang dito.'),
    ],
  },
  {
    id: '4.80',
    phase: 4,
    deep: true,
    title: 'I think it is because: -아/어서 그런 것 같아요',
    ko: '-아/어서 그런 것 같아요',
    blurb: 'Guess the reason behind a feeling or a situation.',
    items: [
      v('못자서그런', '잠을 못 자서 그런 것 같아요.', 'I think it is because I did not sleep.'),
      v('추워서그런', '날씨가 추워서 그런 것 같아요.', 'I think it is because the weather is cold.'),
    ],
    steps: [
      {
        ...dtc(
          'Guessing the reason',
          [
            '-아/어서 그런 것 같아요 means "I think it is because ...". 잠을 못 자다 becomes 잠을 못 자서 그런 것 같아요 ("I think it is because I did not sleep").',
            'It is a gentle guess. Use it when you are not sure of the cause.',
          ],
          'Ang -아/어서 그런 것 같아요 ay "siguro dahil sa ...". 잠을 못 자서 그런 것 같아요 = "Siguro dahil hindi ako nakatulog."',
          'When a friend looks tired, say 어제 잠을 못 자서 그런 것 같아요 to explain.',
          'Because + I think: 서 그런 것 같아요. The reason, then the guess.',
          [
            { ko: '잠을 못 자서 그런 것 같아요.', en: 'I think it is because I did not sleep.' },
            { ko: '날씨가 추워서 그런 것 같아요.', en: 'I think it is because the weather is cold.' },
          ],
        ),
        tips: [
          'Use 그래서 (so) for a confirmed result and 그런 것 같아요 for a guess.',
          'Add 아마 (maybe) to soften it more: 아마 날씨 때문인 것 같아요.',
        ],
        locals: [
          { ko: '피곤해 보이네요. 일이 많아서 그런 것 같아요.', en: 'You look tired. I think it is because of the workload.', note: 'A caring question in Korean workplaces.' },
        ],
      },
      {
        ...dtc(
          'Explaining a problem',
          [
            'Use it when something feels wrong: 기계가 고장 나서 그런 것 같아요 ("I think the machine is broken").',
            'It turns a problem into a friendly guess, which helps the other person think of a fix.',
          ],
          'Gamitin kapag may mali: 기계가 고장 나서 그런 것 같아요 = "Siguro sira ang makina."',
          'Describe the problem, then the guess, and ask for help.',
          'Problem, guess, help: 그런 것 같아요.',
          [
            { ko: '기계가 고장 나서 그런 것 같아요.', en: 'I think the machine is broken.' },
          ],
        ),
        tips: [
          'Do not use it for facts you are sure of. Use -아/어서 by itself.',
        ],
        locals: [
          { ko: '인터넷이 느려서 그런 것 같아요.', en: 'I think the internet is slow.', note: 'A common line when a video call stutters.' },
        ],
      },
      ch('"I think it is because I did not sleep." Which is correct?', '잠을 못 자서 그런 것 같아요.', ['잠을 못 잤어요.', '잠을 못 자고 싶어요.'], '-아/어서 그런 것 같아요 gives a guess about the reason. 잤어요 is past and 자고 싶어요 is want.', 'Siguro dahil hindi ako nakatulog.'),
      ch('Which means "I think the weather is cold, that is the reason"?', '날씨가 추워서 그런 것 같아요.', ['날씨가 추워요.', '날씨가 추웠어요.'], 'The reason and guess form is -아/어서 그런 것 같아요. The others are plain statements.', 'Siguro dahil malamig.'),
    ],
  },
  {
    id: '4.81',
    phase: 4,
    deep: true,
    title: 'Describing people: appearance and personality',
    ko: '사람 묘사하기',
    blurb: 'Describe someone in a few clear, kind sentences.',
    items: [
      v('키가크고', '키가 크고 머리가 짧아요.', 'She is tall and has short hair.'),
      v('친절한사람', '친절한 사람이에요.', 'He is a kind person.'),
      v('성격이밝은', '성격이 밝은 편이에요.', 'Her personality is fairly cheerful.'),
    ],
    steps: [
      {
        ...dtc(
          'Appearance: -고 and adjectives',
          [
            'Link two features with -고: 키가 크고 머리가 짧아요 ("tall and short hair"). 크다 becomes 크고, and 짧다 becomes 짧아요.',
            'Start with the most visible feature, then add one or two more.',
          ],
          'Pagsamahin ang dalawang katangian gamit ang -고: 키가 크고 머리가 짧아요 = "Matangkad at maikli ang buhok."',
          'Describe a person in a photo: 키가 크고 안경을 써요 ("tall and wears glasses").',
          'Two features: -고. Start tall, end with hair.',
          [
            { ko: '키가 크고 머리가 짧아요.', en: 'She is tall and has short hair.' },
            { ko: '안경을 써요.', en: 'He wears glasses.' },
          ],
        ),
        tips: [
          'Use 있다 for features: 눈이 커요 (has big eyes). 키가 있다 is not used, so use 키가 크다.',
          'Keep people descriptions kind. Start with what is nice.',
        ],
        locals: [
          { ko: '얼굴이 동그랗고 웃는 게 예뻐요.', en: 'Her face is round and her smile is pretty.', note: 'Common compliment when describing a friend.' },
        ],
      },
      {
        ...dtc(
          'Personality: a kind person',
          [
            'Turn an adjective into a description of a person with -ㄴ 사람: 친절하다 becomes 친절한 사람 ("a kind person").',
            'For personality, 성격이 밝은 편이에요 ("her personality is fairly cheerful") is softer than a flat statement.',
          ],
          'Gawing paglalarawan ng tao ang pang-uri gamit ang -ㄴ 사람: 친절한 사람 = "Mabait na tao." 성격이 밝은 편이에요 = "Medyo masayahin ang ugali niya."',
          'Describe a friend kindly: 친구는 유머가 있는 사람이에요 ("my friend is a person with humour").',
          'A kind person: 친절한 사람. A cheerful nature: 성격이 밝은 편.',
          [
            { ko: '친절한 사람이에요.', en: 'He is a kind person.' },
            { ko: '성격이 밝은 편이에요.', en: 'Her personality is fairly cheerful.' },
          ],
        ),
        tips: [
          'Use 성격 (personality) with an adjective: 성격이 좋아요 (good personality).',
          'Say 많은 편이에요 for "quite a lot" and 적은 편이에요 for "quite few".',
        ],
        locals: [
          { ko: '말이 재미있는 사람이에요.', en: 'He is someone who is fun to talk to.', note: 'A warm way to describe a new friend in a group chat.' },
        ],
      },
      ch('"She is tall and has short hair." Which is correct?', '키가 크고 머리가 짧아요.', ['키가 크고 싶어요.', '키가 커서 짧아요?'], '-고 links two features. 크고 싶어요 is want to be tall, and 커서 is because tall.', 'Matangkad at maikli ang buhok.'),
      ch('Which means "a kind person"?', '친절한 사람', ['친절하게 사람', '친절해요 사람'], 'The adjective becomes 친절한 before 사람. The others are not correct forms.', 'Mabait na tao.'),
    ],
  },
];

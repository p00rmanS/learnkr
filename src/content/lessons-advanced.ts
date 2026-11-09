import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const v = (id: string, korean: string, english: string) => ({ id: `v15.${id}`, korean, english });

export const ADVANCED: Lesson[] = [
  {
    id: '4.63',
    phase: 4,
    deep: true,
    title: 'Almost happened: -(으)ㄹ 뻔했어요',
    ko: '-(으)ㄹ 뻔했어요',
    blurb: 'Describe something that nearly happened.',
    items: [
      v('넘어질뻔', '넘어질 뻔했어요.', 'I almost fell.'),
      v('늦을뻔', '늦을 뻔했어요.', 'I was almost late.'),
      v('잊을뻔', '잊을 뻔했어요.', 'I almost forgot.'),
    ],
    steps: [
      {
        ...dtc(
          'Almost: 뻔하다',
          [
            '뻔하다 means "nearly" or "almost happened". Put -(으)ㄹ 뻔했어요 after a verb stem to describe something that nearly happened but did not: 넘어지다 becomes 넘어질 뻔했어요 ("I almost fell").',
            'Use the same rule as the future: stems ending in a vowel add ㄹ, stems ending in a consonant add 을. 늦다 becomes 늦을 뻔했어요 ("I was almost late").',
          ],
          'Ang -(으)ㄹ 뻔했어요 ay "muntik na". 넘어질 뻔했어요 = "Muntik na akong madapa." Pareho ang hati sa future: patinig + ㄹ, katinig + 을.',
          'Use it to tell a funny story: 버스를 놓칠 뻔했어요 ("I almost missed the bus").',
          'Almost happened: 뻔했어요. "Ppeon" is the near miss, a little "pop".',
          [
            { ko: '넘어질 뻔했어요.', en: 'I almost fell.' },
            { ko: '늦을 뻔했어요.', en: 'I was almost late.' },
          ],
        ),
        tips: [
          '뻔했어요 always means "nearly, but not really". If it did happen, use the past tense: 넘어졌어요.',
          'Add 정말 (really) for drama: 정말 잊을 뻔했어요 ("I really almost forgot").',
          'Pair it with 다행이에요 (lucky): 다행이에요! ("what a relief!").',
        ],
        locals: [
          { ko: '큰일 날 뻔했어요.', en: 'Something bad nearly happened.', note: 'Locals use 큰일 날 뻔했어요 for a close call, from a near accident to a missed flight.' },
          { ko: '하마터면 넘어질 뻔했어요.', en: 'I almost fell, phew.', note: '하마터면 adds a dramatic "nearly" in storytelling.' },
        ],
      },
      {
        ...dtc(
          'Almost done, not done',
          [
            'Compare 뻔했어요 with 했어요. 넘어졌어요 means "I fell", but 넘어질 뻔했어요 means "I nearly fell and did not".',
            'The sentence is about the near miss, so keep the story short and clear for the listener.',
          ],
          'Ihambing: 넘어졌어요 = "Nadapa ako." Ang 넘어질 뻔했어요 = "Muntik na akong madapa, pero hindi."',
          'Use the contrast to tell a story: 넘어질 뻔했어요, 그런데 안 넘어졌어요 ("I almost fell, but I did not").',
          'Did fall = 졌어요, nearly fell = 질 뻔했어요. Add 뻔 for the almost.',
          [
            { ko: '넘어질 뻔했어요, 그런데 안 넘어졌어요.', en: 'I almost fell, but I did not.' },
          ],
        ),
        tips: [
          '그런데 links the near miss to the happy ending.',
          'Do not put 뻔 after a noun. Use a verb stem only.',
        ],
        locals: [
          { ko: '잊을 뻔했다!', en: 'I almost forgot!', note: 'Casual friends drop 요: 뻔했다 is the chatty ending.' },
        ],
      },
      ch('"I almost fell." Which is correct?', '넘어질 뻔했어요.', ['넘어졌어요.', '넘어질 뻔해요?'], '넘어졌어요 means fell. 넘어질 뻔해요? is a question form that does not fit.', 'Muntik na akong madapa.'),
      ch('Which means "I was almost late"?', '늦을 뻔했어요.', ['늦었어요.', '늦고 싶어요.'], '늦었어요 means was late. 늦고 싶어요 means want to be late.', 'Muntik na akong mahuli.'),
    ],
  },
  {
    id: '4.64',
    phase: 4,
    deep: true,
    title: 'I found out: -더라고요',
    ko: '-더라고요',
    blurb: 'Share something you discovered yourself.',
    items: [
      v('맛있더라고요', '그 식당 맛있더라고요.', 'That restaurant was delicious, I found.'),
      v('재미있더라고요', '영화가 재미있더라고요.', 'The movie was fun, I found.'),
      v('좋더라고요', '날씨가 좋더라고요.', 'The weather was nice, I found.'),
    ],
    steps: [
      {
        ...dtc(
          'Discovering: -더라고요',
          [
            '-더라고요 is used when you discovered something yourself, through your own experience. 맛있다 becomes 맛있더라고요 ("it was delicious, I found").',
            'The -더- shows what you saw or felt, and -라고요 is the polite way to share it.',
          ],
          'Ang -더라고요 ay para sa natuklasan mo mismo sa sariling karanasan. 맛있더라고요 = "Masarap pala, nalaman ko."',
          'Use it to recommend a place: 그 카페 좋더라고요! ("that cafe was really good, I found").',
          '더 is "I saw it myself". 라고요 is "I am telling you".',
          [
            { ko: '그 식당 맛있더라고요.', en: 'That restaurant was delicious, I found.' },
            { ko: '영화가 재미있더라고요.', en: 'The movie was fun, I found.' },
          ],
        ),
        tips: [
          'Do not use -더라고요 for things you were told. Use -대요 (reported speech) for that.',
          'It works for people too: 그 사람 친절하더라고요 ("that person was kind, I found").',
          'Keep the eyes wide: it is a little bit of surprise in the voice.',
        ],
        locals: [
          { ko: '여기 좋더라고요!', en: 'This place is really nice, I found!', note: 'Koreans share a new place they found, often on social media, with this ending.' },
          { ko: '생각보다 비싸더라고요.', en: 'It was more expensive than I thought.', note: '생각보다 means "more than I thought". Very common complaint.' },
        ],
      },
      {
        ...dtc(
          'Plain past versus found-out',
          [
            '맛있었어요 is a plain past statement: "it was delicious". 맛있더라고요 says "I found out it was delicious".',
            'The found-out form is softer and more personal, so use it to share your own discovery.',
          ],
          'Ang 맛있었어요 ay simpleng "masarap nga." Ang 맛있더라고요 ay "Nalaman kong masarap pala."',
          'When you recommend something, prefer -더라고요 over plain statements. It sounds like a friend talking.',
          'Plain past is a fact. Found-out is a discovery.',
          [
            { ko: '맛있었어요.', en: 'It was delicious.' },
            { ko: '맛있더라고요.', en: 'It was delicious, I found.' },
          ],
        ),
        tips: [
          'Use 것 같아요 for guesses and -더라고요 for things you already experienced.',
          'Add 정말 for more feeling: 정말 좋더라고요.',
        ],
        locals: [
          { ko: '사람 많더라고요.', en: 'There were a lot of people, I found.', note: 'A common review about a busy place, said with a shrug.' },
        ],
      },
      ch('Which sounds like you tried a restaurant and liked it?', '그 식당 맛있더라고요.', ['그 식당 맛있을 거예요.', '그 식당 맛있겠어요.'], '-더라고요 shares a discovery. 맛있을 거예요 is a future guess and 맛있겠어요 is a guess from appearance.', 'Nalaman kong masarap.'),
      ch('Which ending shares something you discovered yourself?', '-더라고요', ['-대요', '-(으)ㄹ 거예요'], '-더라고요 is for your own discovery. -대요 reports what others say.', 'Ang -더라고요 ay sariling natuklasan.'),
    ],
  },
  {
    id: '4.65',
    phase: 4,
    deep: true,
    title: 'Since: -(으)ㄴ 지',
    ko: '-(으)ㄴ 지',
    blurb: 'Say how long ago something started.',
    items: [
      v('공부한지', '한국어를 공부한 지 일 년 됐어요.', 'It has been one year since I started studying Korean.'),
      v('산지', '여기 산 지 오래됐어요.', 'It has been a long time since I lived here.'),
      v('만난지', '친구를 만난 지 한 달 됐어요.', 'It has been a month since I met my friend.'),
    ],
    steps: [
      {
        ...dtc(
          'How long since: -(으)ㄴ 지',
          [
            '-(으)ㄴ 지 means "since" a past action started, and 됐어요 counts the time that has passed. 한국어를 공부한 지 일 년 됐어요 means "it has been one year since I started studying Korean".',
            'Use the past attributive form of the verb (공부하다 becomes 공부한) and then 지.',
          ],
          'Ang -(으)ㄴ 지 ay "mula nang". 한국어를 공부한 지 일 년 됐어요 = "Isang taon na mula nang mag-aral ako ng Korean."',
          'Count with Sino numbers for years and months: 일 년, 한 달 (one month uses native 한 달).',
          'Since: -(으)ㄴ 지. The 지 is the clock that started.',
          [
            { ko: '한국어를 공부한 지 일 년 됐어요.', en: 'It has been one year since I started studying Korean.' },
            { ko: '친구를 만난 지 한 달 됐어요.', en: 'It has been a month since I met my friend.' },
          ],
        ),
        tips: [
          'Months are 한 달, 두 달, 세 달 (native). Years are 일 년, 이 년 (Sino).',
          'For a long time, say 오래됐어요: 여기 산 지 오래됐어요.',
          'Answer a question 얼마나 됐어요? ("how long has it been?") with the time plus 됐어요.',
        ],
        locals: [
          { ko: '만난 지 얼마나 됐어요?', en: 'How long has it been since you met?', note: 'Friends ask this to start a catch-up conversation.' },
          { ko: '이사 온 지 3년 됐어요.', en: 'It has been three years since I moved here.', note: 'Neighbours chat like this about how long they have lived somewhere.' },
        ],
      },
      {
        ...dtc(
          'Asking and answering',
          [
            'Ask 얼마나 됐어요? ("how long has it been?") and answer with the period and 됐어요.',
            'Use 전에 (ago) for a past moment: 일 년 전에 시작했어요 ("I started a year ago").',
          ],
          'Itanong ang 얼마나 됐어요? = "Gaano na katagal?" Sagutin ng tagal at 됐어요. Ang 전에 ay "noon": 일 년 전에 시작했어요.',
          'Compare the two: 일 년 됐어요 is "it has been a year", and 일 년 전에 is "a year ago".',
          'Since = 지 (how long it has been). Ago = 전에 (when it started).',
          [
            { ko: '얼마나 됐어요?', en: 'How long has it been?' },
            { ko: '일 년 전에 시작했어요.', en: 'I started a year ago.' },
          ],
        ),
        tips: [
          'Do not confuse 전에 (ago) with 후에 (later).',
          'Use 되다 (to become) with 됐어요 when counting elapsed time.',
        ],
        locals: [
          { ko: '처음 본 지 오래됐네요!', en: 'It has been a long time since we first met!', note: 'Friends say this when they meet again. 네요 shows surprise.' },
        ],
      },
      ch('"It has been one year since I started studying." Which is correct?', '공부한 지 일 년 됐어요.', ['공부할 지 일 년 됐어요.', '공부하고 일 년 됐어요.'], 'The past attributive 한 plus 지 shows since. 할 is a future form and 하고 means and.', 'Isang taon na mula nang mag-aral.'),
      ch('Which means "a year ago"?', '일 년 전에', ['일 년 후에', '일 년 됐어요'], '전에 means ago. 후에 means later and 됐어요 counts time passed.', 'Isang taon na ang nakalipas.'),
    ],
  },
  {
    id: '4.66',
    phase: 4,
    deep: true,
    title: 'The more, the more: -(으)ㄹ수록',
    ko: '-(으)ㄹ수록',
    blurb: 'Two things that grow together.',
    items: [
      v('공부할수록', '공부할수록 재미있어요.', 'The more I study, the more fun it is.'),
      v('매울수록', '매울수록 맛있어요.', 'The spicier it is, the tastier.'),
      v('연습할수록', '연습할수록 쉬워져요.', 'The more you practise, the easier it gets.'),
    ],
    steps: [
      {
        ...dtc(
          'Growing together: -(으)ㄹ수록',
          [
            '-(으)ㄹ수록 links two changes that happen together: the more one grows, the more the other grows. 공부하다 becomes 공부할수록 ("the more you study").',
            'The second part is usually -아/어요 or a similar stem: 공부할수록 재미있어요 ("the more I study, the more fun it is").',
          ],
          'Ang -(으)ㄹ수록 ay "habang lalo, lalo rin". 공부할수록 재미있어요 = "Kapag mas nag-aaral, mas nagiging masaya."',
          'Use it to encourage a friend: 연습할수록 쉬워져요 ("the more you practise, the easier it gets").',
          'The more, the more: 할수록. Each step pushes the other.',
          [
            { ko: '공부할수록 재미있어요.', en: 'The more I study, the more fun it is.' },
            { ko: '연습할수록 쉬워져요.', en: 'The more you practise, the easier it gets.' },
          ],
        ),
        tips: [
          'The stem uses the same rule as the future: 맵다 becomes 매울수록 (the ㅂ drops).',
          'Use it for advice: 자주 말할수록 늘어요 ("the more you speak, the more it grows").',
          'Keep both halves parallel. It sounds natural and clear.',
        ],
        locals: [
          { ko: '비싸을수록 좋은 건 아니에요.', en: 'Expensive is not always better.', note: 'A common saying about shopping. 건 is 것은, the thing.' },
          { ko: '먹을수록 맛있어요!', en: 'The more you eat, the tastier it is!', note: 'Said at a restaurant when friends love the food.' },
        ],
      },
      {
        ...dtc(
          'Practice and change',
          [
            'The verb after the second part often becomes 되다 or 지다 to show change: 쉬워지다 (to become easy).',
            'Say 점점 (more and more) to add emphasis: 점점 쉬워져요 ("it gets easier and easier").',
          ],
          'Ang 점점 ay "unti-unti, lalo pang". 점점 쉬워져요 = "Lalo itong gumagaan."',
          'Use 점점 with -(으)ㄹ수록 for a strong feeling of progress.',
          'Growing: 점점. Changing: 지다. Together: 점점 쉬워져요.',
          [
            { ko: '점점 쉬워져요.', en: 'It gets easier and easier.' },
            { ko: '매울수록 맛있어요.', en: 'The spicier it is, the tastier.' },
          ],
        ),
        tips: [
          'Use 점점 for slow change, and 더 for quantity: 더 많이 먹을수록.',
          'Do not use -(으)ㄹ수록 with a noun. Use a verb or adjective.',
        ],
        locals: [
          { ko: '한국어 배울수록 재밌어요.', en: 'The more I learn Korean, the more fun it is.', note: 'Learners say this often. 재밌어요 is a casual 재미있어요.' },
        ],
      },
      ch('"The more I study, the more fun." Which is correct?', '공부할수록 재미있어요.', ['공부하고 재미있어요.', '공부해서 재미있었어요.'], '-(으)ㄹ수록 links two growing changes. 하고 is and, and 해서 is because.', 'Habang lalo, lalo rin.'),
      ch('Which means "the spicier, the tastier"?', '매울수록 맛있어요.', ['매우면 맛있어요.', '맵고 맛있어요.'], '매울수록 is the growing-together form. 매우면 is if it is spicy, and 맵고 is and spicy.', 'Lalong maanghang, lalong masarap.'),
    ],
  },
  {
    id: '4.67',
    phase: 4,
    deep: true,
    title: 'As soon as: -자마자',
    ko: '-자마자',
    blurb: 'Describe an action that follows right away.',
    items: [
      v('도착하자마자', '도착하자마자 전화했어요.', 'I called as soon as I arrived.'),
      v('일어나자마자', '일어나자마자 씻었어요.', 'As soon as I woke up, I washed.'),
      v('끝나자마자', '수업이 끝나자마자 나갔어요.', 'As soon as class ended, I left.'),
    ],
    steps: [
      {
        ...dtc(
          'Right after: -자마자',
          [
            '-자마자 means "as soon as". The second action happens immediately after the first. 도착하다 becomes 도착하자마자 ("as soon as I arrive").',
            'The first verb is the trigger, and the second verb is the result: 일어나자마자 씻었어요 ("as soon as I woke up, I washed").',
          ],
          'Ang -자마자 ay "pagkatapos agad". 도착하자마자 전화했어요 = "Tumawag ako agad pagdating ko."',
          'Use it for daily routines: 일어나자마자 물을 마셔요 ("as soon as I wake up, I drink water").',
          'As soon as: 자마자. "Ja-ma-ja" like a quick jump.',
          [
            { ko: '도착하자마자 전화했어요.', en: 'I called as soon as I arrived.' },
            { ko: '일어나자마자 씻었어요.', en: 'As soon as I woke up, I washed.' },
          ],
        ),
        tips: [
          'The two actions must share a subject, like the same person doing both.',
          'Do not use -자마자 with a future plan that has not happened yet; it needs a real sequence.',
          'Add 바로 (right away) for emphasis: 바로 끝나자마자 ("the instant it ended").',
        ],
        locals: [
          { ko: '집에 도착하자마자 연락해 주세요.', en: 'Please contact me as soon as you get home.', note: 'Parents and friends ask this in Korea. 연락 means contact.' },
          { ko: '들어오자마자 신발 벗었어요.', en: 'As soon as I came in, I took off my shoes.', note: 'Korean homes: shoes off right at the door.' },
        ],
      },
      {
        ...dtc(
          'Same subject, fast sequence',
          [
            '-자마자 works best when the same person does both actions quickly. Compare 도착했어요 (I arrived) with 도착하자마자 (as soon as I arrived).',
            'Keep the second verb in the past for a finished story: 도착하자마자 전화했어요.',
          ],
          'Pareho ang gumagawa ng dalawang kilos. 도착했어요 = "Dumating ako." 도착하자마자 = "Pagdating ko agad."',
          'When telling a story, chain your actions: 일어나자마자, 씻고, 나갔어요.',
          'One after another, no pause: 자마자 is the hop from one action to the next.',
          [
            { ko: '수업이 끝나자마자 나갔어요.', en: 'As soon as class ended, I left.' },
          ],
        ),
        tips: [
          'Do not use -자마자 for two different people. Use -(으)니까 or a simple sentence.',
          'In casual speech say 하자마자 without 요 with friends.',
        ],
        locals: [
          { ko: '보자마자 알았어요!', en: 'I knew as soon as I saw it!', note: 'Friends use this to say an instant reaction.' },
        ],
      },
      ch('"As soon as I woke up, I washed." Which is correct?', '일어나자마자 씻었어요.', ['일어나서 씻었어요?', '일어나고 싶어요.'], '-자마자 means as soon as. -아서 is because, and 싶어요 is want.', 'Pagkagising ko, agad akong naghugas.'),
      ch('Which means "as soon as I arrived"?', '도착하자마자', ['도착하고 싶어요', '도착해서'], '도착하자마자 means as soon as I arrived. 도착하고 싶어요 means want to arrive, and 도착해서 means because I arrived.', 'Pagdating ko agad.'),
    ],
  },
  {
    id: '4.68',
    phase: 4,
    deep: true,
    title: 'Since I am already here: -(으)ㄴ 김에',
    ko: '-(으)ㄴ 김에',
    blurb: 'Do something extra while you are already doing something.',
    items: [
      v('온김에', '온 김에 커피 마셔요.', 'Since I am here, I will have coffee.'),
      v('간김에', '장 보러 간 김에 우유도 샀어요.', 'While I was out shopping, I also bought milk.'),
      v('나온김에', '나온 김에 산책해요.', 'Since I came out, let us take a walk.'),
    ],
    steps: [
      {
        ...dtc(
          'Taking the chance: -(으)ㄴ 김에',
          [
            '-(으)ㄴ 김에 means "since you are already doing something, you might as well do another thing". 오다 becomes 온 김에 ("since I am here").',
            'The first action is the reason, and the second is the bonus: 장 보러 간 김에 우유도 샀어요 ("while I was shopping, I also bought milk").',
          ],
          'Ang -(으)ㄴ 김에 ay "dahil nandito na rin". 온 김에 커피 마셔요 = "Dahil nandito na ako, iinom na rin ako ng kape."',
          'Use it when a free moment appears: 나온 김에 산책해요 ("since we are out, let us take a walk").',
          'Kim (김) means the moment you are in. Use it when you are already in motion.',
          [
            { ko: '온 김에 커피 마셔요.', en: 'Since I am here, I will have coffee.' },
            { ko: '나온 김에 산책해요.', en: 'Since we are out, let us take a walk.' },
          ],
        ),
        tips: [
          'The first part is usually a verb of movement: 가다, 오다, 나오다.',
          'Say 하는 김에 when a task is already in progress: 청소하는 김에 정리했어요 ("while cleaning, I tidied up too").',
          'Use 말이 나온 김에 to bring up something new: 말이 나온 김에 물어볼게요 ("since it came up, let me ask").',
        ],
        locals: [
          { ko: '지나가는 김에 들렀어요.', en: 'I stopped by since I was passing.', note: 'Locals say this when visiting a friend on the way somewhere. It is polite and warm.' },
          { ko: '하는 김에 같이 해요!', en: 'Since you are doing it, let us do it together!', note: 'A friendly invite to share a small task.' },
        ],
      },
      {
        ...dtc(
          'Keep it light',
          [
            'Use -(으)ㄴ 김에 for small extras, not big plans. 여행 간 김에 친구도 만났어요 ("since I went on a trip, I also met a friend").',
            'The tone is relaxed. It says "while I was at it, I also did this".',
          ],
          'Gamitin ito para sa maliliit na dagdag, hindi malalaking plano. 여행 간 김에 친구도 만났어요 = "Habang nasa biyahe, nakita ko na rin ang kaibigan."',
          'Plan a day: 시장 간 김에 과일도 사요 ("since we are going to the market, let us buy fruit too").',
          'The kim is a chance. Grab it, and add one more small thing.',
          [
            { ko: '여행 간 김에 친구도 만났어요.', en: 'Since I went on a trip, I also met a friend.' },
            { ko: '시장 간 김에 과일도 사요.', en: 'Since we are going to the market, let us buy fruit too.' },
          ],
        ),
        tips: [
          'Do not use 김에 for a plan you have not started. It needs a real first action.',
          'Use 어차피 (anyway) to add a second thought: 어차피 나온 김에.',
        ],
        locals: [
          { ko: '가는 김에 쓰레기 버려 줘요.', en: 'Since you are going out, please throw out the trash.', note: 'A household request. Locals ask this to save a trip.' },
        ],
      },
      ch('"Since I am here, I will have coffee." Which is correct?', '온 김에 커피 마셔요.', ['와서 커피 마셔요.', '오고 싶어요.'], '온 김에 means since I am here. 와서 means and came, and 오고 싶어요 means want to come.', 'Dahil nandito na rin.'),
      ch('Which uses 김에 to add a small extra?', '장 보러 간 김에 우유도 샀어요.', ['장 보고 싶어요.', '장 보러 가요.'], 'The 김에 phrase shows an extra action while already doing another. The others do not add an extra.', 'Habang nasa labas, may dagdag.'),
    ],
  },
];

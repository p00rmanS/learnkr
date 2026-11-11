import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const v = (id: string, korean: string, english: string) => ({ id: `v16.${id}`, korean, english });

export const INTERMEDIATE: Lesson[] = [
  {
    id: '4.69',
    phase: 4,
    deep: true,
    title: 'Maybe: -(으)ㄹ지도 몰라요',
    ko: '-(으)ㄹ지도 몰라요',
    blurb: 'Say something might happen, without being sure.',
    items: [
      v('비가올지도', '비가 올지도 몰라요.', 'It might rain.'),
      v('늦을지도', '늦을지도 몰라요.', 'I might be late.'),
      v('그사람이올지도', '그 사람이 올지도 몰라요.', 'He might come.'),
    ],
    steps: [
      {
        ...dtc(
          'Might happen: -(으)ㄹ지도 몰라요',
          [
            '-(으)ㄹ지도 몰라요 says that something might happen, with no certainty. 오다 becomes 올지도 몰라요 ("it might come" or "it might rain"). 늦다 becomes 늦을지도 몰라요 ("I might be late").',
            'It is softer than -(으)ㄹ 거예요 (will), because you are guessing.',
          ],
          'Ang -(으)ㄹ지도 몰라요 ay "baka". 비가 올지도 몰라요 = "Baka umulan." Mas malambot ito kaysa -(으)ㄹ 거예요 dahil hula lang.',
          'Use it when you plan: 오늘 늦을지도 몰라요, 먼저 가세요 ("I might be late today, go ahead").',
          'Might is 지도 몰라요: "jee-do", the "also" of maybe.',
          [
            { ko: '비가 올지도 몰라요.', en: 'It might rain.' },
            { ko: '늦을지도 몰라요.', en: 'I might be late.' },
          ],
        ),
        tips: [
          'Take an umbrella when you hear 비가 올지도 몰라요. It is a quiet warning.',
          'Put 아마 before it to sound even softer: 아마 늦을지도 몰라요.',
          'Do not use it for things you are sure about. Use 거예요 instead.',
        ],
        locals: [
          { ko: '오늘 바쁠지도 몰라요.', en: 'I might be busy today.', note: 'Locals say this to keep plans flexible. It is polite and does not promise anything.' },
          { ko: '그럴지도 몰라요.', en: 'That might be true.', note: 'A gentle way to agree without fully agreeing.' },
        ],
      },
      {
        ...dtc(
          'Might not: 지도 모르다',
          [
            'Make it negative with 안: 안 올지도 몰라요 ("he might not come"). The 몰라요 part stays the same.',
            'Locals often shorten it casually to 올지도 몰라 with friends.',
          ],
          'Gawing negatibo sa 안: 안 올지도 몰라요 = "Baka hindi siya pumunta." Sa kaibigan, pinaikli: 올지도 몰라.',
          'Use 안 올지도 몰라요 when you are not sure someone will come.',
          'Might not: 안 + 지도 몰라요. The 안 goes before the verb.',
          [
            { ko: '안 올지도 몰라요.', en: 'He might not come.' },
          ],
        ),
        tips: [
          'The verb 모르다 means "not know", so the phrase literally means "I do not know if it will".',
          'Use 모르겠어요 for "I do not know" in everyday chat.',
        ],
        locals: [
          { ko: '내일 안 될지도 몰라.', en: 'It might not work out tomorrow.', note: 'Casual speech with friends drops 요.' },
        ],
      },
      ch('"It might rain." Which is correct?', '비가 올지도 몰라요.', ['비가 올 거예요.', '비가 왔어요.'], '-(으)ㄹ지도 몰라요 is a guess, while 올 거예요 is a sure future and 왔어요 is past.', 'Baka umulan.'),
      ch('Which means "he might not come"?', '안 올지도 몰라요.', ['올지도 몰라요.', '왔어요.'], '안 makes the guess negative. The others mean he might come, or he came.', 'Baka hindi siya pumunta.'),
    ],
  },
  {
    id: '4.70',
    phase: 4,
    deep: true,
    title: 'Not only, but also: 뿐만 아니라',
    ko: '뿐만 아니라',
    blurb: 'Add a second point to a first one.',
    items: [
      v('한국음식뿐만', '한국 음식뿐만 아니라 일본 음식도 좋아해요.', 'Not only Korean food, I also like Japanese food.'),
      v('친구뿐만', '친구뿐만 아니라 가족도 와요.', 'Not only friends, family is also coming.'),
    ],
    steps: [
      {
        ...dtc(
          'Not only X but also Y',
          [
            '뿐만 아니라 means "not only ... but also". Put it after a noun: 한국 음식뿐만 아니라 일본 음식도 좋아해요 ("not only Korean food, I also like Japanese food").',
            'The second part uses 도 (also), so the two halves match neatly.',
          ],
          'Ang 뿐만 아니라 ay "hindi lang ... kundi pati". 한국 음식뿐만 아니라 일본 음식도 좋아해요 = "Hindi lang Korean food, gusto ko rin ang Japanese."',
          'Use it to add a point with force: 말뿐만 아니라 행동도 중요해요 ("not only words but actions matter too").',
          'Not only: 뿐만 아니라. Think "bbun-man a-ni-ra" as a double add.',
          [
            { ko: '친구뿐만 아니라 가족도 와요.', en: 'Not only friends, family is also coming.' },
          ],
        ),
        tips: [
          'Shorten it to 뿐만 아니라 in writing, and 뿐 only when you are chatting.',
          'Put 도 after the second noun so the sentence stays balanced.',
          'Use it with verbs too: 공부할 뿐만 아니라 운동도 해요.',
        ],
        locals: [
          { ko: '맛뿐만 아니라 분위기도 좋아요.', en: 'Not only the taste, the atmosphere is good too.', note: 'Reviewers in Korea praise restaurants this way on social media.' },
        ],
      },
      {
        ...dtc(
          'Keep the same subject',
          [
            'Use 뿐만 아니라 to show two good or two important things about one subject: 이 카페는 커피뿐만 아니라 디저트도 맛있어요.',
            'Choose a clear order: the bigger point usually comes second.',
          ],
          'Gamitin para sa dalawang magandang bagay sa iisang paksa: 이 카페는 커피뿐만 아니라 디저트도 맛있어요 = "Hindi lang kape, masarap din ang dessert."',
          'When you recommend something, add two reasons with 뿐만 아니라.',
          'Two good things about one place: 뿐만 아니라. The second one is the surprise.',
          [
            { ko: '이 카페는 커피뿐만 아니라 디저트도 맛있어요.', en: 'This cafe is good for coffee and also desserts.' },
          ],
        ),
        tips: [
          'Do not use 뿐만 아니라 with a sentence that has two subjects. Keep it simple.',
        ],
        locals: [
          { ko: '가격뿐만 아니라 서비스도 좋아요.', en: 'Not only the price, the service is good too.', note: 'Common when giving a shop a good review.' },
        ],
      },
      ch('"Not only Korean food, Japanese food too." Which is correct?', '한국 음식뿐만 아니라 일본 음식도.', ['한국 음식뿐만 일본 음식도 아니라.', '한국 음식이 아니라 일본 음식.'], '뿐만 아니라 pairs the two halves, with 도 on the second. The other options break the pattern.', 'Hindi lang Korean food, pati Japanese.'),
      ch('Which means "not only coffee, desserts too"?', '커피뿐만 아니라 디저트도', ['커피뿐만 디저트', '커피 디저트'], 'The full pattern is noun + 뿐만 아니라 + noun + 도.', 'Hindi lang kape, pati dessert.'),
    ],
  },
  {
    id: '4.71',
    phase: 4,
    deep: true,
    title: 'Until: -(으)ㄹ 때까지',
    ko: '-(으)ㄹ 때까지',
    blurb: 'Keep doing something until a point is reached.',
    items: [
      v('올때까지', '올 때까지 기다렸어요.', 'I waited until he came.'),
      v('끝날때까지', '끝날 때까지 공부해요.', 'I study until it ends.'),
    ],
    steps: [
      {
        ...dtc(
          'Until: -(으)ㄹ 때까지',
          [
            '-(으)ㄹ 때까지 means "until". The action continues until the point that follows. 오다 becomes 올 때까지 ("until he comes"). 끝나다 becomes 끝날 때까지 ("until it ends").',
            'Use 까지 as the end point: 집에 올 때까지 기다렸어요 ("I waited until he came home").',
          ],
          'Ang -(으)ㄹ 때까지 ay "hanggang". 올 때까지 기다렸어요 = "Naghintay ako hanggang dumating siya."',
          'Practise with a simple phrase: 밥 먹을 때까지 기다려요 ("I will wait until we eat").',
          'Until: 때까지. The 때 is the moment, the 까지 is the limit.',
          [
            { ko: '올 때까지 기다렸어요.', en: 'I waited until he came.' },
            { ko: '끝날 때까지 공부해요.', en: 'I study until it ends.' },
          ],
        ),
        tips: [
          'The 때까지 pattern is the time limit, while 전까지 is "by". 오기 전까지 means "before he comes".',
          'Do not confuse 때까지 with 때 (when). The 까지 turns it into an end point.',
          'In casual speech, 때까지 pairs well with 계속 (continuously).',
        ],
        locals: [
          { ko: '다 먹을 때까지 기다려.', en: 'Wait until you finish eating.', note: 'A parent or friend says this at the table.' },
          { ko: '나을 때까지 쉬세요.', en: 'Rest until you get better.', note: 'Common advice from a doctor or family member.' },
        ],
      },
      {
        ...dtc(
          'Until vs by',
          [
            '-(으)ㄹ 때까지 means "keep going until". -기 전까지 means "by the time before". 출발하기 전까지 준비하세요 ("prepare before you leave").',
            'Choose the one that matches whether the action continues or stops.',
          ],
          'Ang -(으)ㄹ 때까지 ay "hanggang" na patuloy. Ang -기 전까지 ay "bago ang". 출발하기 전까지 준비하세요 = "Maghanda bago umalis."',
          'Say 끝날 때까지 when you want to keep going, and 시작하기 전까지 for a deadline.',
          'Keep going: 때까지. Before a deadline: 전까지.',
          [
            { ko: '출발하기 전까지 준비하세요.', en: 'Prepare before you leave.' },
          ],
        ),
        tips: [
          'Use it with 계속 to show you kept at it: 계속 노력할 때까지.',
        ],
        locals: [
          { ko: '해결될 때까지 얘기해요.', en: 'Let us talk until it is solved.', note: 'Used in workplaces and families when a problem needs time.' },
        ],
      },
      ch('"I waited until he came." Which is correct?', '올 때까지 기다렸어요.', ['올 때 기다렸어요.', '오기 전까지 기다렸어요.'], '때까지 means until the point. 올 때 means when he came, and 오기 전까지 means before he comes.', 'Naghintay hanggang dumating.'),
      ch('Which means "I study until it ends"?', '끝날 때까지 공부해요.', ['끝나기 전까지 공부해요.', '끝나서 공부해요.'], '때까지 keeps going until the end. 끝나기 전까지 means before it ends, and 끝나서 means because it ended.', 'Nag-aaral hanggang matapos.'),
    ],
  },
  {
    id: '4.72',
    phase: 4,
    deep: true,
    title: 'While doing: -다가',
    ko: '-다가',
    blurb: 'Interrupt one action with another.',
    items: [
      v('공부하다가', '공부하다가 잠들었어요.', 'I fell asleep while studying.'),
      v('가다가', '가다가 친구를 만났어요.', 'While going, I met a friend.'),
    ],
    steps: [
      {
        ...dtc(
          'Stopping in the middle: -다가',
          [
            '-다가 means "while doing something, then something else happened". 공부하다 becomes 공부하다가 ("while studying"). The second action interrupts the first.',
            'The first action is not finished; it is cut off by the second: 공부하다가 잠들었어요 ("I fell asleep while studying").',
          ],
          'Ang -다가 ay "habang ginagawa, tapos biglang". 공부하다가 잠들었어요 = "Nakatulog ako habang nag-aaral."',
          'Use it for everyday surprises: 요리하다가 불을 껐어요 ("while cooking, I turned off the fire").',
          'Doing, then the surprise: -다가. Like pausing a song in the middle.',
          [
            { ko: '공부하다가 잠들었어요.', en: 'I fell asleep while studying.' },
            { ko: '가다가 친구를 만났어요.', en: 'While going, I met a friend.' },
          ],
        ),
        tips: [
          'Use -다가 only with verbs. Do not use it with adjectives.',
          'The second clause is usually a surprise, not a plan.',
          'Do not confuse with -(으)면서 (at the same time). -다가 means one action stops the other.',
        ],
        locals: [
          { ko: '보다가 울었어요.', en: 'I cried while watching.', note: 'A common line about K-dramas. 울었어요 means cried.' },
          { ko: '걷다가 넘어졌어요.', en: 'I fell while walking.', note: 'Locals tell this story casually to laugh about a small accident.' },
        ],
      },
      {
        ...dtc(
          'Two verbs, one story',
          [
            'Use -다가 to tell a story with a turn: 자다가 깼어요 ("I woke up while sleeping").',
            'The first verb is ongoing, the second verb is the change.',
          ],
          'Gamitin para sa kuwento na may pagbabago: 자다가 깼어요 = "Nagising ako habang natutulog."',
          'Tell a short story with -다가 and a surprise ending.',
          'Sleeping, then waking: 자다가 깼어요.',
          [
            { ko: '자다가 깼어요.', en: 'I woke up while sleeping.' },
          ],
        ),
        tips: [
          'The second part is often the past tense.',
          'Add 그만 for a stop: 먹다가 그만 먹었어요 ("I stopped eating").',
        ],
        locals: [
          { ko: '얘기하다가 시간 가는 줄 몰랐어요.', en: 'I did not notice the time while talking.', note: 'Friends say this when a chat runs long. 줄 몰랐어요 means did not realize.' },
        ],
      },
      ch('"I fell asleep while studying." Which is correct?', '공부하다가 잠들었어요.', ['공부하고 잠들었어요.', '공부하면서 잠들었어요.'], '-다가 is an action interrupted by another. -고 is and, and -(으)면서 is at the same time.', 'Nakatulog habang nag-aaral.'),
      ch('Which means "I woke up while sleeping"?', '자다가 깼어요.', ['자고 깼어요.', '자면서 깼어요.'], '-다가 is the interrupt: sleeping, then waking. The others mean and woke up, or at the same time.', 'Nagising habang natutulog.'),
    ],
  },
  {
    id: '4.73',
    phase: 4,
    deep: true,
    title: 'It ended up happening: -게 되다',
    ko: '-게 되다',
    blurb: 'Describe how something came to happen, often without planning.',
    items: [
      v('공부하게됐어요', '한국어를 공부하게 됐어요.', 'I ended up studying Korean.'),
      v('살게됐어요', '이 동네에 살게 됐어요.', 'I came to live in this neighbourhood.'),
    ],
    steps: [
      {
        ...dtc(
          'Ended up: -게 되다',
          [
            '-게 되다 means something came to happen, often through circumstances rather than a plan. 공부하다 becomes 공부하게 됐어요 ("I ended up studying").',
            'It describes a change, so it often pairs with 됐어요 (became).',
          ],
          'Ang -게 되다 ay "nauwi sa". 한국어를 공부하게 됐어요 = "Napunta akong nag-aral ng Korean."',
          'Use it to tell a life story: 한국에 가게 됐어요 ("I ended up going to Korea").',
          'Came to be: 게 됐어요. The 게 turns the action into a result.',
          [
            { ko: '한국어를 공부하게 됐어요.', en: 'I ended up studying Korean.' },
            { ko: '이 동네에 살게 됐어요.', en: 'I came to live in this neighbourhood.' },
          ],
        ),
        tips: [
          'Use -게 되다 for things that happened through events, not for things you decided.',
          'For a decision, use -기로 했어요 (lesson on plans and decisions).',
          'You can say 게 됐어요 casually in speech.',
        ],
        locals: [
          { ko: '좋아하게 됐어요.', en: 'I came to like it.', note: 'Locals say this about a food, a song, or a person they grew to love.' },
          { ko: '이사 가게 됐어요.', en: 'It turns out I am moving.', note: 'A friendly way to share news that came up suddenly.' },
        ],
      },
      {
        ...dtc(
          'Results of change',
          [
            'Use 되다 with 게 to mark a change: 잘하게 됐어요 ("I came to do it well"). Add 되었다 or 됐어요 for the finished result.',
            'In formal speech, use 되었습니다. Casual speech uses 됐어요.',
          ],
          'Gamitin ang 게 됐어요 para sa pagbabago: 잘하게 됐어요 = "Naging magaling na ako." Sa pormal, 되었습니다.',
          'Use 게 됐어요 when telling someone the result of a change.',
          'The 게 says "to the point where". The 됐어요 says "it became".',
          [
            { ko: '잘하게 됐어요.', en: 'I came to do it well.' },
          ],
        ),
        tips: [
          'Do not add 게 to a plain negative: 안 하게 됐어요 means "it turned out I did not".',
        ],
        locals: [
          { ko: '친구 때문에 여기 오게 됐어요.', en: 'I ended up coming here because of a friend.', note: 'Common when explaining how you ended up somewhere new.' },
        ],
      },
      ch('"I ended up studying Korean." Which is correct?', '한국어를 공부하게 됐어요.', ['한국어를 공부하기로 했어요.', '한국어를 공부하고 싶어요.'], '-게 되다 is an event that happened to you. -기로 했어요 is a decision, and 싶어요 is a wish.', 'Napunta akong nag-aral ng Korean.'),
      ch('Which means "I came to like it"?', '좋아하게 됐어요.', ['좋아했어요.', '좋아해도 돼요.'], '좋아하게 됐어요 is a change that happened. 좋아했어요 is plain past, and 좋아해도 돼요 is permission.', 'Nagustuhan ko na.'),
    ],
  },
  {
    id: '4.74',
    phase: 4,
    deep: true,
    title: 'To the extent that: -(으)ㄹ 정도로',
    ko: '-(으)ㄹ 정도로',
    blurb: 'Show how far something goes.',
    items: [
      v('웃을정도로', '웃을 정도로 재미있어요.', 'It is funny enough to make you laugh.'),
      v('아플정도로', '배가 아플 정도로 먹었어요.', 'I ate until my stomach hurt.'),
    ],
    steps: [
      {
        ...dtc(
          'To the point of: -(으)ㄹ 정도로',
          [
            '-(으)ㄹ 정도로 means "to the point that" or "so much that". 웃다 becomes 웃을 정도로 ("to the point of laughing"). 아프다 becomes 아플 정도로 ("to the point of hurting").',
            'It describes how far an action or quality goes.',
          ],
          'Ang -(으)ㄹ 정도로 ay "hanggang sa punto na". 웃을 정도로 재미있어요 = "Sobrang nakakatawa, hanggang sa mapatawa ka."',
          'Use it for strong reactions: 배가 아플 정도로 웃었어요 ("I laughed until my stomach hurt").',
          'To the point: 정도로. Picture the line on a ruler reaching the mark.',
          [
            { ko: '웃을 정도로 재미있어요.', en: 'It is funny enough to make you laugh.' },
            { ko: '배가 아플 정도로 먹었어요.', en: 'I ate until my stomach hurt.' },
          ],
        ),
        tips: [
          'Use 정도 alone to mean "about the level of": 이 정도면 괜찮아요 ("this level is fine").',
          'Keep the exaggeration friendly, not too negative.',
        ],
        locals: [
          { ko: '죽을 정도로 힘들어요.', en: 'It is so hard it is killing me.', note: 'A common expression for being exhausted. Locals often exaggerate with it.' },
          { ko: '이 정도면 충분해요.', en: 'This much is enough.', note: 'Used to end a shopping or ordering conversation politely.' },
        ],
      },
      {
        ...dtc(
          'Degree and level',
          [
            'Use 정도 to name a level: 한 시간 정도 ("about one hour"), 이만 원 정도 ("about 20,000 won").',
            'Use 정도 with a noun to estimate. It is a soft, approximate word.',
          ],
          'Gamitin ang 정도 para sa tantiya: 한 시간 정도 = "Mga isang oras." 이만 원 정도 = "Mga dalawampung libong won."',
          'When you ask for a price, add 정도: 얼마 정도예요? ("about how much is it?").',
          'Level: 정도. Estimate: 정도 with a number.',
          [
            { ko: '한 시간 정도 걸려요.', en: 'It takes about one hour.' },
            { ko: '얼마 정도예요?', en: 'About how much is it?' },
          ],
        ),
        tips: [
          'Use 정도 to soften a number instead of saying a fixed price.',
        ],
        locals: [
          { ko: '이만 원 정도 할 거예요.', en: 'It will be around 20,000 won.', note: 'Shop staff give estimates this way.' },
        ],
      },
      ch('"It is funny enough to make you laugh." Which is correct?', '웃을 정도로 재미있어요.', ['웃어서 재미있어요.', '웃고 싶어요.'], '-(으)ㄹ 정도로 shows the extent. 웃어서 is because I laughed, and 웃고 싶어요 is want to laugh.', 'Nakakatawa, mapapatawa ka.'),
      ch('"About one hour." Which phrase fits?', '한 시간 정도', ['한 시간 동안만', '한 시간 전에'], '정도 gives an approximate amount. 동안 means during and 전에 means before.', 'Mga isang oras.'),
    ],
  },
  {
    id: '4.75',
    phase: 4,
    deep: true,
    title: 'Right in the middle: -는 중이에요',
    ko: '-는 중이에요',
    blurb: 'Say that something is in progress right now.',
    items: [
      v('밥먹는중', '지금 밥 먹는 중이에요.', 'I am eating right now.'),
      v('숙제하는중', '숙제하는 중이에요.', 'I am doing homework.'),
    ],
    steps: [
      {
        ...dtc(
          'In progress: -는 중이에요',
          [
            '-는 중이에요 says that an action is in progress at this moment. 먹다 becomes 먹는 중이에요 ("I am in the middle of eating"). 중 means "middle".',
            'It sounds more formal than -고 있어요, and it is used a lot in offices and when you call someone.',
          ],
          'Ang -는 중이에요 ay "nasa gitna ng". 밥 먹는 중이에요 = "Kumakain ako ngayon." Mas pormal ito kaysa -고 있어요.',
          'When someone calls and you are busy, say 지금 일하는 중이에요 ("I am working right now").',
          '중 is the middle. The sentence says you are in the middle of it.',
          [
            { ko: '지금 밥 먹는 중이에요.', en: 'I am eating right now.' },
            { ko: '숙제하는 중이에요.', en: 'I am doing homework.' },
          ],
        ),
        tips: [
          'Use -고 있어요 for an everyday "right now". Use -는 중이에요 when it sounds like a process or a task.',
          'Add 지금 (now) to make the time clear.',
          'Do not add 중 to a noun unless it is a process: 회의 중이에요 ("I am in a meeting").',
        ],
        locals: [
          { ko: '지금 회의 중이에요.', en: 'I am in a meeting right now.', note: 'The most common way to decline a call at work in Korea.' },
          { ko: '잠깐만요, 전화 받는 중이에요.', en: 'Just a moment, I am taking a call.', note: 'Polite phrase when someone walks in during a call.' },
        ],
      },
      {
        ...dtc(
          'Telling someone you are busy',
          [
            'Add 좀 (a bit) or 지금 to soften the message: 지금 좀 바빠요 ("I am a bit busy right now").',
            'After the activity, say 끝나면 연락할게요 ("I will contact you when it ends").',
          ],
          'Idagdag ang 좀 o 지금 para lumambot: 지금 좀 바빠요 = "Medyo abala ako ngayon." Pagkatapos, sabihin ang 끝나면 연락할게요.',
          'Tell a friend 끝나면 연락할게요 when you cannot talk now.',
          'Busy now: 중이에요. Free later: 끝나면 연락할게요.',
          [
            { ko: '지금 좀 바빠요.', en: 'I am a bit busy right now.' },
            { ko: '끝나면 연락할게요.', en: 'I will contact you when it is over.' },
          ],
        ),
        tips: [
          'Keep the message short on the phone: 지금 통화 중이에요 ("I am on a call").',
        ],
        locals: [
          { ko: '수업 중이라 나중에 연락드릴게요.', en: 'I am in class, so I will contact you later.', note: 'Polite message in Korean workplaces and schools.' },
        ],
      },
      ch('Which means "I am eating right now"?', '지금 밥 먹는 중이에요.', ['지금 밥 먹었어요.', '지금 밥 먹고 싶어요.'], '-는 중이에요 means in progress now. 먹었어요 is past and 먹고 싶어요 is want to eat.', 'Kumakain ako ngayon.'),
      ch('Which is the best reply when you are in a meeting?', '지금 회의 중이에요.', ['회의 했어요.', '회의 가고 싶어요.'], '중이에요 says you are in the middle of a meeting now. The others are past or want.', 'Nasa meeting ako ngayon.'),
    ],
  },
];

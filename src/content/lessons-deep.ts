import type { Lesson, Step } from './lessons';
import { ch, tc } from './lessons-everyday';

const dtc = (...a: Parameters<typeof tc>) => tc(...a) as Extract<Step, { kind: 'teach' }>;
const v = (id: string, korean: string, english: string) => ({ id: `v13.${id}`, korean, english });

export const DEEP: Lesson[] = [
  {
    id: '4.51',
    phase: 4,
    deep: true,
    title: 'Word order: how a sentence fits together',
    ko: '문장의 순서',
    blurb: 'Subject, object, then verb. Why the ending matters most.',
    items: [
      v('저는밥', '저는 밥을 먹어요.', 'I eat rice.'),
      v('밥먹었어요', '밥 먹었어요?', 'Did you eat?'),
      v('어디가요', '어디 가요?', 'Where are you going?'),
    ],
    steps: [
      {
        ...dtc(
          'The verb comes last',
          [
            'A Korean sentence usually runs subject, then object, then verb. 저는 밥을 먹어요 word by word is "I, rice, eat". The verb sits at the end and carries the tense and the politeness level.',
            'Because the verb is last, you hear the whole sentence before the final word tells you what happened. Listen for the ending.',
          ],
          'Ang ayos ng pangungusap ay paksa, layon, tapos pandiwa. 저는 밥을 먹어요 = "Ako, kanin, kumain." Nasa dulo ang pandiwa, kaya doon mo makikita kung kailan nangyari ang kilos at kung gaano kagalang ang pananalita.',
          'Wait for the last word before you decide what a sentence means.',
          'The verb goes to the back of the bus. The ending tells you the time and how polite the speaker is.',
          [
            { ko: '저는 밥을 먹어요.', en: 'I eat rice.' },
            { ko: '밥 먹었어요?', en: 'Did you eat?' },
          ],
        ),
        tips: [
          'Subject particles drop out when the context is clear. 밥 먹었어요? is complete.',
          'Put the time word early: 어제 밥을 먹었어요 means "I ate yesterday".',
          'Question words stay before the verb: 어디 가요? (where are you going?).',
        ],
        locals: [
          { ko: '밥 먹었어요?', en: 'Did you eat?', note: 'Koreans greet each other around meals with this. It works like "how are you" more than a real question.' },
          { ko: '어디 가요?', en: 'Where are you going?', note: 'Said as small talk when you leave. It is friendly, not nosy.' },
        ],
      },
      {
        ...dtc(
          'Dropping the subject, like locals do',
          [
            'In everyday talk Koreans often leave out the subject when everyone knows who or what they mean. 먹었어요 alone can mean "I ate" or "you ate". Context decides.',
            'Say the subject only to contrast, like 저는 ("as for me") against 너는 ("as for you").',
          ],
          'Madalas tanggalin ng mga Koreano ang paksa kapag alam na ng kausap. Ang 먹었어요 lang ay puwedeng "kumain ako" o "kumain ka", depende sa usapan. Ilagay lang ang 저는 kapag kailangan mong ihambing.',
          'Copy the rhythm of a native speaker: short sentences, no subject.',
          'If everyone knows who you mean, leave the name out.',
          [
            { ko: '먹었어요.', en: 'I ate. (Or you ate.)' },
            { ko: '지금 가요.', en: 'I am going now.' },
          ],
        ),
        tips: [
          '저 (I) sounds stiff in casual chat. Use it mainly when introducing yourself.',
          'When you introduce yourself, keep the subject: 저는 샘이에요 (I am Sam).',
        ],
        locals: [
          { ko: '지금 가요.', en: 'I am going now.', note: 'Used in shops and offices to say you are leaving. The subject is implied.' },
        ],
      },
      ch('In 저는 밥을 먹어요, which word comes last?', '먹어요', ['저는', '밥을'], 'The verb always comes last in a Korean sentence.', 'Ang pandiwa ang laging nasa dulo.'),
      ch('Which sentence is in natural Korean word order?', '밥을 먹어요.', ['먹어요 밥을.', '먹어요 밥을 저는.'], 'Object comes before the verb, and the verb closes the sentence.', 'Layon bago ang pandiwa.'),
    ],
  },
  {
    id: '4.52',
    phase: 4,
    deep: true,
    title: 'Sound linking: when letters jump',
    ko: '연음',
    blurb: 'Why 옷이 sounds like "o-shi".',
    items: [
      v('옷이', '옷이', 'clothes'),
      v('꽃이', '꽃이', 'flower'),
      v('한국어', '한국어', 'Korean language'),
      v('좋아요', '좋아요.', 'It is good.'),
    ],
    steps: [
      {
        ...dtc(
          'The last consonant moves over',
          [
            'When a syllable ends in a consonant (batchim) and the next syllable starts with the silent ㅇ, the final consonant slides into the next block. 옷이 is read "o-shi", not "ot-i".',
            'The spelling stays the same. Only the sound links across the block boundary.',
          ],
          'Kapag may katinig sa dulo ng pantig at ang susunod ay nagsisimula sa tahimik na ㅇ, lilipat ang katinig sa susunod na pantig. 옷이 = "o-shi", hindi "ot-i". Hindi nagbabago ang baybay; ang tunog lang ang nagdudugtong.',
          'Say the last consonant together with the next vowel, like one smooth word.',
          'The silent ㅇ opens the door, so the last consonant walks through it.',
          [
            { ko: '옷이', en: 'clothes' },
            { ko: '한국어', en: 'Korean language' },
          ],
        ),
        tips: [
          'Linking happens only when the next syllable starts with the silent ㅇ.',
          'ㅎ disappears before a vowel: 좋아요 is read "jo-a-yo".',
          'The spelling never changes: 한국어 is written with ㄱ but read "han-gu-geo".',
        ],
        locals: [
          { ko: '좋아요.', en: 'It is good.', note: 'Locals say 조아요 in fast speech. Friends say this constantly, so listen for it.' },
          { ko: '한국어 해요?', en: 'Do you speak Korean?', note: 'The 어 pulls the ㄱ forward, so it flows as 한구거 해요.' },
        ],
      },
      {
        ...dtc(
          'Neither sound is lost',
          [
            'Linking is not the same as dropping a sound. The consonant and the vowel both survive, just in a new place. 밥을 is read "ba-beul", and 책이 is read "chae-gi".',
            'Practice with a small set: 옷이, 꽃이, 밥을, all in one breath.',
          ],
          'Hindi pagkawala ng tunog ang linking. Nandoon pa rin ang katinig at patinig, nasa bagong lugar lang. 밥을 = "ba-beul". Magsanay sa 옷이, 꽃이, 밥을 sa isang hinga.',
          'Shadow a native speaker: hear the whole phrase, then repeat the whole phrase.',
          'Linking keeps the sound and moves house.',
          [
            { ko: '꽃이 예뻐요.', en: 'The flower is pretty.' },
            { ko: '밥이 맛있어요.', en: 'The food is delicious.' },
          ],
        ),
        tips: [
          'Practise on 꽃이 (kkoch-i) and 밥이 (bap-i). Hear the link, then say it.',
          'Learn whole phrases. Linking only sounds natural inside a phrase.',
        ],
        locals: [
          { ko: '꽃이 예뻐요.', en: 'The flower is pretty.', note: 'Locals treat this as one wave of sound. Do not stop between the two blocks.' },
        ],
      },
      ch('How is 옷이 read in natural speech?', '오시', ['옫이', '오지'], 'The ㅅ moves into the next block, so 옷이 is read 오시.', 'Lumilipat ang ㅅ, kaya 오시.'),
      ch('In 좋아요, what happens to the ㅎ before the vowel?', 'It disappears.', ['It becomes very sharp.', 'It doubles.'], 'ㅎ is silent before a vowel, so 좋아요 sounds like 조아요.', 'Nawawala ang ㅎ bago ang patinig.'),
    ],
  },
  {
    id: '4.53',
    phase: 4,
    deep: true,
    title: 'Sound changes: why 국물 sounds like 궁물',
    ko: '소리가 바뀌어요',
    blurb: 'Spelling is one thing. What you hear is another.',
    items: [
      v('국물', '국물', 'broth'),
      v('입니다', '입니다', 'it is (formal)'),
      v('학교', '학교', 'school'),
    ],
    steps: [
      {
        ...dtc(
          'Before ㄴ and ㅁ, sounds turn nasal',
          [
            'A stop consonant (ㄱ, ㄷ, ㅂ) becomes a nasal sound (ㅇ, ㄴ, ㅁ) when the next syllable starts with ㄴ or ㅁ. 국물 is read "gung-mul", and 입니다 is read "im-ni-da".',
            'The mouth prepares for the next sound early, so the first sound changes to match it.',
          ],
          'Kapag ang ㄱ, ㄷ, o ㅂ ay sinundan ng ㄴ o ㅁ, nagiging ilong na tunog ito. 국물 = "gung-mul", 입니다 = "im-ni-da". Naghahanda ang bibig para sa susunod na tunog, kaya nagbabago ang una.',
          'Say 국물 with a light nasal hum. The "ng" sound is already in your mouth when you say the "mul".',
          'Stops turn into noses before noses. Say gung-mul, not guk-mul.',
          [
            { ko: '국물', en: 'broth' },
            { ko: '입니다.', en: 'It is. (formal)' },
          ],
        ),
        tips: [
          'The ㅂ in 입니다 becomes ㅁ before ㄴ, so it reads im-ni-da.',
          'The same change happens in 합니다 (ham-ni-da), so formal endings flow smoothly.',
          'Spelling is unchanged. Write 국물, say 궁물.',
        ],
        locals: [
          { ko: '한국말 잘해요.', en: 'You speak Korean well.', note: 'Locals say 한궁말. The ㄱ turns into ㅇ before ㅁ.' },
          { ko: '감사합니다.', en: 'Thank you (formal).', note: 'Locals say 감사함니다. Notice the ㅂ turning into ㅁ.' },
        ],
      },
      {
        ...dtc(
          'Tightening after a hard stop',
          [
            'After ㄱ, ㄷ, ㅂ, or ㅅ, a plain consonant often becomes a tense sound. 학교 is read "hak-kyo", and 국밥 is read "guk-ppap".',
            'Locals do this automatically. It is why 학교 sounds sharper than its spelling suggests.',
          ],
          'Pagkatapos ng ㄱ, ㄷ, ㅂ, o ㅅ, kadalasang nagiging matigas ang kasunod na katinig. 학교 = "hak-kyo". Ginagawa ito ng mga lokal nang hindi nila namamalayan.',
          'Hold the stop a tiny bit, then release with a firm push.',
          'After a hard stop, the next sound tightens up, like a fist.',
          [
            { ko: '학교 가요.', en: 'I go to school.' },
            { ko: '국밥 먹을까요?', en: 'Shall we eat gukbap?' },
          ],
        ),
        tips: [
          'Common examples: 학생 (hak-ssaeng) and 학교 (hak-kkyo).',
          'Do not add letters. The spelling stays; only the sound tightens.',
        ],
        locals: [
          { ko: '학교 가요?', en: 'Are you going to school?', note: 'Locals say 학꾜 가요 without thinking about it.' },
          { ko: '국밥 먹을까요?', en: 'Shall we eat gukbap?', note: 'A classic lunch in Seoul. Say 국빱 먹을까요.' },
        ],
      },
      ch('How do locals pronounce 국물 in fast speech?', '궁물', ['국물', '굴물'], 'ㄱ before the nasal ㅁ turns into ㅇ, so 국물 is read 궁물.', 'Nagiging 궁물 ang 국물.'),
      ch('In fast speech, 학교 sounds closest to:', '학꾜', ['학교', '학꼬'], 'After the hard ㄱ, 교 tightens into 꾜.', 'Nagiging 꾜 ang 교 pagkatapos ng ㄱ.'),
    ],
  },
  {
    id: '4.54',
    phase: 4,
    deep: true,
    title: 'Softening words: 좀, 조금, 약간',
    ko: '좀 · 조금 · 약간',
    blurb: 'How locals make a complaint or a request sound gentle.',
    items: [
      v('좀비싸요', '좀 비싸요.', 'It is a bit expensive.'),
      v('조금더', '조금 더 주세요.', 'A little more, please.'),
      v('약간매워요', '약간 매워요.', 'It is a little spicy.'),
    ],
    steps: [
      {
        ...dtc(
          'Small words, big difference',
          [
            '좀 (a bit), 조금 (a little), and 약간 (slightly) soften an adjective or a request. 좀 비싸요 means "it is a bit expensive", which is gentler than 비싸요 on its own.',
            '좀 is short for 조금, and locals use it far more in speech.',
          ],
          'Pampalambot ang 좀 (medyo), 조금 (kaunti), at 약간 (bahagya) sa pang-uri o sa hiling. Mas magaan pakinggan ang 좀 비싸요 kaysa 비싸요 lang. Ang 좀 ay pinaikling 조금.',
          'At a shop, start with 좀 when you disagree: the staff will respect a soft comment.',
          'The word 좀 is a cushion. Put it before the adjective and the sentence feels soft.',
          [
            { ko: '좀 비싸요.', en: 'It is a bit expensive.' },
            { ko: '조금 더 주세요.', en: 'A little more, please.' },
          ],
        ),
        tips: [
          '좀 with a verb makes a gentle request: 좀 도와주세요 (could you help me a little?).',
          '조금 is more formal. 좀 is what friends say.',
          '약간 suits taste and feelings: 약간 달아요 (slightly sweet).',
        ],
        locals: [
          { ko: '좀 도와주세요.', en: 'Could you help me a little?', note: 'Used at a counter, at a desk and at home. It is the friendliest way to ask.' },
          { ko: '좀 더 주세요.', en: 'A little more, please.', note: 'Said at restaurants, usually with a smile.' },
        ],
      },
      {
        ...dtc(
          'Softening a no',
          [
            'Locals rarely say a flat no. They soften it with 좀 or 글쎄요: 좀 어려울 것 같아요 means "it might be a bit hard".',
            'This keeps the conversation warm, which is why Korean talk often sounds gentle.',
          ],
          'Bihira ang tuwirang hindi ng mga lokal. Pinapalambot nila ito ng 좀 o 글쎄요: 좀 어려울 것 같아요 = "Medyo mahirap yata." Pinapanatili nitong maayos ang usapan.',
          'Start with 글쎄요, then give your reason. It buys you a moment to think.',
          'Soft start, clear finish.',
          [
            { ko: '글쎄요... 좀 어려울 것 같아요.', en: 'Well... it might be a bit hard.' },
            { ko: '다음에 해요.', en: 'Let us do it next time.' },
          ],
        ),
        tips: [
          '어려울 것 같아요 uses the guessing pattern from lesson 4.46.',
          'Do not overuse 좀. Too many softeners can sound unsure of yourself.',
        ],
        locals: [
          { ko: '다음에 해요.', en: 'Let us do it next time.', note: 'Locals use this to say no to a plan. It means "not now", not "never".' },
        ],
      },
      ch('Which sounds gentler when you say the price is high?', '좀 비싸요.', ['비싸요!', '너무 비싸요!'], '좀 softens the adjective. 너무 means too much and sounds harsh.', 'Ang 좀 ay pampalambot. Ang 너무 ay matindi.'),
      ch('Which means "a little more, please"?', '조금 더 주세요.', ['많이 주세요.', '조금 많아요.'], '많이 means a lot. 조금 많아요 says "a little is many", which does not fit.', 'Konting dagdag po.'),
    ],
  },
  {
    id: '4.55',
    phase: 4,
    deep: true,
    title: 'And between nouns: 와/과, 하고, 랑',
    ko: '그리고 (명사 사이)',
    blurb: 'Three ways to say "and" between two nouns.',
    items: [
      v('사과와배', '사과와 배', 'apples and pears'),
      v('커피하고빵', '커피하고 빵', 'coffee and bread'),
      v('친구랑가요', '친구랑 가요.', 'I go with my friend.'),
    ],
    steps: [
      {
        ...dtc(
          'Pick the right "and"',
          [
            '와 and 과 are formal "and" between nouns. 와 follows a word that ends in a vowel (사과와 배). 과 follows a word that ends in a consonant (책과 연필, book and pencil).',
            '하고 is the everyday spoken form and works with any noun: 커피하고 빵. 랑 and 이랑 are the chatty versions: 친구랑.',
          ],
          'Ang 와 at 과 ay pormal na "at" sa pagitan ng pangngalan. 와 kapag patinig ang dulo ng salita, 과 kapag katinig: 사과와 배, 책과 연필. Ang 하고 ay pang-araw-araw. Ang 랑 at 이랑 ay mas kaswal: 친구랑.',
          'In daily speech use 하고 or 랑. Save 와 and 과 for writing and presentations.',
          'Vowel ends take 와 (wa). Consonant ends take 과 (gwa). Chatty speech takes 랑.',
          [
            { ko: '사과와 배', en: 'apples and pears' },
            { ko: '책과 연필', en: 'book and pencil' },
          ],
        ),
        tips: [
          'Batchim decides 랑 or 이랑 too: 친구랑 (no batchim), but 밥이랑 (ㅂ at the end).',
          '와 and 과 join nouns only. Do not put them before a verb.',
        ],
        locals: [
          { ko: '커피랑 케이크 먹을래요?', en: 'Want to eat coffee and cake?', note: 'Locals say 랑 with friends. It is quick and warm.' },
          { ko: '언니랑 같이 가요.', en: 'I go with my older sister.', note: 'A woman says 언니 for her older sister. 랑 fits close relationships.' },
        ],
      },
      {
        ...dtc(
          'When "and" means "with"',
          [
            '랑 and 이랑 also mean "with" when you go somewhere: 친구랑 가요 means "I go with a friend".',
            'Context decides: 사과랑 배 joins two fruits, but 친구랑 가요 names a companion.',
          ],
          'Ang 랑 o 이랑 ay "kasama" din: 친구랑 가요 = "Sumasama ako sa kaibigan." Ang usapan ang nagsasabi kung "at" o "kasama" ang ibig sabihin.',
          'Listen to the verb. If it is 가요 (go) or 먹어요 (eat), 랑 usually means "with someone".',
          'A friend goes along with you: 랑.',
          [
            { ko: '친구랑 가요.', en: 'I go with my friend.' },
            { ko: '같이 먹을래요?', en: 'Want to eat together?' },
          ],
        ),
        tips: [
          'When 랑 comes before 가다 or 오다, it means "with".',
          'In casual speech you can drop 랑 when the meaning is clear.',
        ],
        locals: [
          { ko: '같이 먹을래요?', en: 'Want to eat together?', note: 'Locals often drop 랑 and say 같이, which feels cozy.' },
          { ko: '밥이랑 국 주세요.', en: 'Rice and soup, please.', note: 'Ordering at a home-style restaurant. 이랑 follows 밥 because 밥 ends in ㅂ.' },
        ],
      },
      ch('Which "and" follows 책 (book, ends in a consonant)?', '책과', ['책와', '책야'], '과 follows a consonant-ending word. 와 follows a vowel-ending word.', 'Katinig ang dulo, kaya 과.'),
      ch('In 친구랑 가요, what does 랑 mean?', 'with', ['and', 'but'], 'Here 가요 is a movement, so 랑 means "with" a companion.', 'Kasama ang kaibigan.'),
    ],
  },
  {
    id: '4.56',
    phase: 4,
    deep: true,
    title: 'Yes, no, and "you are welcome"',
    ko: '네 · 아니요 · 아니에요',
    blurb: 'The small words locals use a hundred times a day.',
    items: [
      v('네', '네.', 'Yes, I am listening.'),
      v('아니요', '아니요.', 'No.'),
      v('아니에요', '아니에요.', 'You are welcome.'),
    ],
    steps: [
      {
        ...dtc(
          '네 is not always yes',
          [
            '네 means "yes", but it also means "I am listening", "I hear you", or "okay". When a teacher or friend is talking, 네 shows you are following.',
            'On the phone, a local may say 네, 네 many times to keep the conversation going.',
          ],
          'Ang 네 ay "opo" o "oo", pero puwede ring "nakikinig ako" o "sige". Sa usapan, madalas itong sabihin para ipakitang sumusunod ka.',
          'Use 네 while you listen, not only when you agree.',
          '네 is the nod you can say out loud.',
          [
            { ko: '네, 알겠습니다.', en: 'Yes, understood.' },
            { ko: '응, 나중에 봐.', en: 'Yeah, see you later.' },
          ],
        ),
        tips: [
          'Use 네 with a teacher or any older person.',
          'Friends say 응 instead of 네. Never use 응 with elders.',
        ],
        locals: [
          { ko: '네, 알겠습니다.', en: 'Yes, understood.', note: 'Common at work. 알겠습니다 means "understood" in a formal way.' },
          { ko: '응, 나중에 봐.', en: 'Yeah, see you later.', note: 'Casual speech with friends. 응 replaces 네 here.' },
        ],
      },
      {
        ...dtc(
          'Not at all: 아니에요',
          [
            'When someone thanks you, locals reply 아니에요, which means "it is nothing" or "you are welcome". It sounds more natural than a bare 네.',
            'Literally it means "it is not", but here it turns down the thanks politely.',
          ],
          'Kapag nagpasalamat ang kausap, sumasagot ang mga lokal ng 아니에요 = "Walang anuman." Mas natural ito kaysa 네 lang.',
          'Reply to 감사합니다 with 아니에요 and a smile.',
          'Thanks in, nothing back: 아니에요, it was nothing.',
          [
            { ko: '감사합니다!', en: 'Thank you!' },
            { ko: '아니에요, 괜찮아요.', en: 'No, it is fine.' },
          ],
        ),
        tips: [
          '괜찮아요 (it is okay) is the common reply when someone apologises.',
          'Do not use 아니에요 to answer a yes-or-no question. Use 아니요.',
        ],
        locals: [
          { ko: '아니에요, 괜찮아요.', en: 'No, it is fine.', note: 'Locals say this to ease an apology. It is warm and very common.' },
        ],
      },
      ch('Someone says 감사합니다. What do you reply?', '아니에요.', ['아니요.', '그래요?'], '아니에요 is the reply to thanks. 아니요 means no.', 'Walang anuman ang tamang sagot.'),
      ch('A friend asks "Did you finish?" and you did. Which is clearest?', '네, 끝났어요.', ['아니에요, 끝났어요.', '아니요, 끝났어요.'], '네 means yes. 아니요 would mean no, and 아니에요 is for thanks.', 'Oo, tapos na ako.'),
    ],
  },
];

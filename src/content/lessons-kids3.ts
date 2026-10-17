import type { Lesson } from './lessons';
import { ch, tc } from './lessons-everyday';

const k = (id: string, korean: string, english: string) => ({ id: `k3.${id}`, korean, english });

export const KIDS3: Lesson[] = [
  {
    id: 'K19',
    phase: 5,
    title: 'A day at the zoo',
    ko: '동물원에 가요',
    blurb: 'Tigers, giraffes, penguins and crocodiles.',
    items: [
      k('동물원', '동물원', 'zoo'),
      k('호랑이', '호랑이', 'tiger'),
      k('기린', '기린', 'giraffe'),
      k('사슴', '사슴', 'deer'),
      k('펭귄', '펭귄', 'penguin'),
      k('악어', '악어', 'crocodile'),
      k('동물원에가요', '동물원에 가요.', 'I go to the zoo.'),
      k('기린은목이길어요', '기린은 목이 길어요.', 'The giraffe has a long neck.'),
    ],
    steps: [
      tc(
        'Meet the zoo animals',
        ['동물원 is a zoo. 호랑이 is a tiger. 기린 is a giraffe. 사슴 is a deer. 펭귄 is a penguin. 악어 is a crocodile.', 'Tell your friend: 동물원에 가요! ("I am going to the zoo!"). Then point and say each name.'],
        'Mga hayop sa zoo: 동물원 (zoo), 호랑이 (tigre), 기린 (dyirap), 사슴 (usa), 펭귄 (penguin), 악어 (buwaya). 동물원에 가요! = "Pupunta ako sa zoo!" Ituro ang bawat hayop at sabihin ang pangalan. Isang paglalakbay, maraming bagong salita.',
        'Next time you see a zoo, a picture book or a video, name the animals out loud in Korean. Ten animals, ten names, ten times. Real animals are the best flashcards.',
        '호랑이 is the national animal of Korea. Hear it: ho-rang-i. "Ho! Rang!" like a tiger roar with a Korean twist. 어흥! is the roar.',
        [
          { ko: '동물원', en: 'zoo' },
          { ko: '호랑이', en: 'tiger' },
          { ko: '기린', en: 'giraffe' },
          { ko: '사슴', en: 'deer' },
          { ko: '펭귄', en: 'penguin' },
          { ko: '악어', en: 'crocodile' },
          { ko: '동물원에 가요!', en: 'I go to the zoo!' },
        ],
      ),
      tc(
        'What are they like?',
        ['Use words from the Opposites lesson (K16): 기린은 목이 길어요 ("the giraffe has a long neck"), 호랑이는 무서워요 ("the tiger is scary"), 펭귄은 귀여워요 ("the penguin is cute").', 'Penguins waddle: 뒤뚱뒤뚱 걸어요. 뒤뚱뒤뚱 is the sound of waddling, like 멍멍 is the sound of a dog.'],
        'Gamitin ang mga salita sa K16: 기린은 목이 길어요 = "Mahaba ang leeg ng dyirap." 호랑이는 무서워요 = "Nakakatakot ang tigre." 펭귄은 귀여워요 = "Cute ang penguin." Ang penguin ay naglalakad nang 뒤뚱뒤뚱 (waddle!). Parang 멍멍 ng aso: ginagaya ang galaw.',
        'Waddle like a penguin while you say 뒤뚱뒤뚱! Kids remember actions better than words, and so do adults.',
        '뒤뚱뒤뚱 sounds like "dwi-ttung dwi-ttung". Rock side to side with each beat. The sound is the movement.',
        [
          { ko: '기린은 목이 길어요.', en: 'The giraffe has a long neck.' },
          { ko: '호랑이는 무서워요.', en: 'The tiger is scary.' },
          { ko: '펭귄은 귀여워요.', en: 'The penguin is cute.' },
          { ko: '펭귄은 뒤뚱뒤뚱 걸어요.', en: 'The penguin waddles.' },
        ],
      ),
      ch('Which animal is a giraffe?', '기린', ['사슴', '악어'], '기린 is a giraffe.', '기린 = dyirap.', { big: '기린' }),
      ch('How do you say "I go to the zoo"?', '동물원에 가요.', ['동물원을 먹어요.', '동물원이에요.'], '에 가요 means go to.', '에 가요 = pupunta sa.'),
      ch('Listen. Which animal do you hear?', '펭귄', ['악어', '호랑이'], '펭귄 is a penguin.', '펭귄 = penguin.', { speak: '펭귄' }),
    ],
  },
  {
    id: 'K20',
    phase: 5,
    title: 'The garden',
    ko: '정원',
    blurb: 'Flowers, trees and little crawling friends.',
    items: [
      k('정원', '정원', 'garden'),
      k('꽃', '꽃', 'flower'),
      k('나무', '나무', 'tree'),
      k('풀', '풀', 'grass'),
      k('벌', '벌', 'bee'),
      k('개미', '개미', 'ant'),
      k('거미', '거미', 'spider'),
      k('달팽이', '달팽이', 'snail'),
    ],
    steps: [
      tc(
        'Plants and bugs',
        ['정원 is a garden. 꽃 is a flower. 나무 is a tree. 풀 is grass. 벌 is a bee. 개미 is an ant. 거미 is a spider. 달팽이 is a snail.', 'Go outside and look. Say what you see: 꽃이 있어요! ("there is a flower!"), 개미가 있어요! ("there is an ant!"). You know 있어요 from lesson 1.5.'],
        '정원 (hardin), 꽃 (bulaklak), 나무 (puno), 풀 (damo), 벌 (bubuyog), 개미 (langgam), 거미 (gagamba), 달팽이 (kuhol). Lumabas at tingnan: 꽃이 있어요! = "May bulaklak!" 개미가 있어요! = "May langgam!" Ang 있어요 ay mula sa lesson 1.5.',
        'Take a short walk with a kid or just by yourself. Name five things you see in Korean. This one habit teaches more than a worksheet.',
        '벌 means "bee", and it also means "punishment" in another context. Context tells you which: 벌이 꽃에 있어요 is about a bee on a flower.',
        [
          { ko: '정원', en: 'garden' },
          { ko: '꽃', en: 'flower' },
          { ko: '나무', en: 'tree' },
          { ko: '벌', en: 'bee' },
          { ko: '개미', en: 'ant' },
          { ko: '달팽이', en: 'snail' },
          { ko: '꽃이 있어요!', en: 'There is a flower!' },
        ],
      ),
      tc(
        'Describing them',
        ['Use the opposites from K16: 꽃이 예뻐요 ("the flower is pretty"), 나무가 커요 ("the tree is big"), 개미는 작아요 ("the ant is small"), 달팽이는 느려요 ("the snail is slow").', 'Spiders are scary to some people: 거미는 무서워요. Is it true for you?'],
        'Gamitin ang mga kabaligtaran sa K16: 꽃이 예뻐요 (maganda ang bulaklak), 나무가 커요 (malaki ang puno), 개미는 작아요 (maliit ang langgam), 달팽이는 느려요 (mabagal ang kuhol). Takot ka ba sa gagamba? 거미는 무서워요.',
        'Make your own sentence about something in your room: 침대가 커요, 책이 많아요. Describing real things is the fastest way to remember adjectives.',
        '달팽이 sounds like "dal-paeng-i". It has "paeng" like "pang"... slowly, "dal... paeng... i". Say it slowly like a snail!',
        [
          { ko: '꽃이 예뻐요.', en: 'The flower is pretty.' },
          { ko: '나무가 커요.', en: 'The tree is big.' },
          { ko: '개미는 작아요.', en: 'The ant is small.' },
          { ko: '달팽이는 느려요.', en: 'The snail is slow.' },
        ],
      ),
      ch('Which word is a snail?', '달팽이', ['개미', '거미'], '달팽이 is a snail.', '달팽이 = kuhol.', { big: '달팽이' }),
      ch('The ant is tiny. What do you say?', '개미는 작아요.', ['개미는 커요.', '개미는 느려요.'], '작아요 means small.', '작아요 = maliit.'),
      ch('Listen. Which garden word do you hear?', '나무', ['꽃', '풀'], '나무 is a tree.', '나무 = puno.', { speak: '나무' }),
    ],
  },
];

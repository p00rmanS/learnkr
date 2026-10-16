const supported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (!supported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith('ko')) ?? null;
}

/** Resolves true when the device has a Korean text-to-speech voice. */
export function koreanVoiceAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!supported()) return resolve(false);
    const found = pickVoice();
    if (found) {
      cachedVoice = found;
      return resolve(true);
    }
    // Voices load asynchronously in most browsers
    const done = () => {
      cachedVoice = pickVoice();
      resolve(!!cachedVoice);
    };
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1500);
  });
}

function build(text: string, rate: number): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = rate;
  const v = cachedVoice ?? pickVoice();
  if (v) u.voice = v;
  return u;
}

export async function speakKorean(text: string, rate: number = 1): Promise<void> {
  if (!supported()) {
    console.warn('Web Speech API not supported');
    return;
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(build(text, rate));
}

/** Speaks and resolves when finished (or immediately if speech is unavailable). */
export function speakAndWait(text: string, rate: number = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!supported()) return resolve();
    const u = build(text, rate);
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  });
}

export function cancelSpeech(): void {
  if (supported()) window.speechSynthesis.cancel();
}

export function startListening(): Promise<string> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as Record<string, new () => SpeechRecognitionLike>;
    const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Recognition) {
      reject(new Error('Speech Recognition not supported'));
      return;
    }
    const recognition = new Recognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => resolve(event.results[0][0].transcript);
    recognition.onerror = (event) => reject(new Error(`Speech recognition error: ${event.error}`));
    recognition.start();
  });
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onerror: (e: { error: string }) => void;
  start: () => void;
}

const NOTE_KEY = 'hg.voiceNoteDismissed';

/** Whether the "no Korean voice" notice was dismissed this browser session. */
export function voiceNoteDismissed(): boolean {
  try {
    return sessionStorage.getItem(NOTE_KEY) === '1';
  } catch {
    return false;
  }
}

export function dismissVoiceNote(): void {
  try {
    sessionStorage.setItem(NOTE_KEY, '1');
  } catch {
    /* private window: the notice may come back, which is acceptable */
  }
}

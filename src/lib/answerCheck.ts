export function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:—–\s]+/g, ' ')
    .trim();
}

export function checkAnswer(userAnswer: string, expectedAnswer: string, acceptedVariants?: string[]): boolean {
  const normalized = normalizeAnswer(userAnswer);
  const normalizedExpected = normalizeAnswer(expectedAnswer);

  if (normalized === normalizedExpected) {
    return true;
  }

  if (acceptedVariants) {
    for (const variant of acceptedVariants) {
      if (normalized === normalizeAnswer(variant)) {
        return true;
      }
    }
  }

  return false;
}

export function generateFeedback(
  userAnswer: string,
  expectedAnswer: string,
  explanationIfWrong?: string
): { correct: boolean; message: string } {
  const isCorrect = checkAnswer(userAnswer, expectedAnswer);

  if (isCorrect) {
    return {
      correct: true,
      message: '맞았어요! (Correct!)',
    };
  }

  return {
    correct: false,
    message: explanationIfWrong || `Expected: ${expectedAnswer}`,
  };
}

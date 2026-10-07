export function checkAnswer(
  numbers: readonly number[],
  submittedAnswer: number,
) {
  const correctAnswer = numbers.reduce((sum, number) => sum + number, 0);

  return {
    submittedAnswer,
    correctAnswer,
    isCorrect: submittedAnswer === correctAnswer,
  };
}

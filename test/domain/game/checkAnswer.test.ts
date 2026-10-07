import { expect, test } from "vitest";
import { checkAnswer } from "../../../src/domain/game/checkAnswer";

test.each([
  { numbers: [1, 2, 3], answer: 6, correctAnswer: 6, isCorrect: true },
  { numbers: [1, 2, 3], answer: 5, correctAnswer: 6, isCorrect: false },
  { numbers: [1, 2, 3], answer: 0, correctAnswer: 6, isCorrect: false },
  {
    numbers: [999, 999, 999],
    answer: 2997,
    correctAnswer: 2997,
    isCorrect: true,
  },
])(
  "grades $answer against $numbers",
  ({ numbers, answer, correctAnswer, isCorrect }) => {
    expect(checkAnswer(numbers, answer)).toEqual({
      submittedAnswer: answer,
      correctAnswer,
      isCorrect,
    });
  },
);

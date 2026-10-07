import { expect, test } from "vitest";
import { generateNumbers } from "../../../src/domain/game/generateNumbers";

test.each([5, 10, 15])("generates exactly %i numbers", (numberCount) => {
  const numbers = generateNumbers({ numberCount, maximumDigits: 3 }, () => 0.5);

  expect(numbers).toHaveLength(numberCount);
});

test.each([1, 2, 3])(
  "generates positive integers within the %i-digit maximum",
  (maximumDigits) => {
    const randomValues = [0, 0.1, 0.5, 0.9, 1 - Number.EPSILON];
    let index = 0;
    const numbers = generateNumbers(
      { numberCount: randomValues.length, maximumDigits },
      () => randomValues[index++],
    );
    const maximumValue = 10 ** maximumDigits - 1;

    expect(numbers[0]).toBe(1);
    expect(numbers.at(-1)).toBe(maximumValue);
    for (const number of numbers) {
      expect(Number.isInteger(number)).toBe(true);
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(maximumValue);
    }
  },
);

test("uses a fresh random value for each number in sequence", () => {
  const randomValues = [0.8, 0, 0.4, 0.8, 0.2];
  let index = 0;
  const numbers = generateNumbers(
    { numberCount: 5, maximumDigits: 1 },
    () => randomValues[index++],
  );

  expect(numbers).toEqual([8, 1, 4, 8, 2]);
});

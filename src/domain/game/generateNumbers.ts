type NumberGenerationSettings = {
  numberCount: number;
  maximumDigits: number;
};

export function generateNumbers(
  { numberCount, maximumDigits }: NumberGenerationSettings,
  random: () => number,
): number[] {
  const maximumValue = 10 ** maximumDigits - 1;

  return Array.from(
    { length: numberCount },
    () => Math.floor(random() * maximumValue) + 1,
  );
}

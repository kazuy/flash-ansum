import { useEffect, useState } from "react";

type GamePageProps = {
  numbers: readonly number[];
  displayInterval: number;
  onFinish: () => void;
};

export default function GamePage({
  numbers,
  displayInterval,
  onFinish,
}: GamePageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (currentIndex === numbers.length - 1) {
        onFinish();
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, displayInterval);

    return () => window.clearTimeout(timeout);
  }, [currentIndex, numbers.length, displayInterval, onFinish]);

  return (
    <main className="game-screen" aria-label="ゲーム">
      <p className="game-number">{numbers[currentIndex]}</p>
    </main>
  );
}

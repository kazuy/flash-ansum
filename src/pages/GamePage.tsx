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
  const [isNumberVisible, setIsNumberVisible] = useState(true);
  const blankDuration = Math.min(100, displayInterval / 6);
  const numberDuration = displayInterval - blankDuration;

  useEffect(() => {
    const hideTimeout = window.setTimeout(() => {
      setIsNumberVisible(false);
    }, numberDuration);
    const timeout = window.setTimeout(() => {
      if (currentIndex === numbers.length - 1) {
        onFinish();
      } else {
        setCurrentIndex(currentIndex + 1);
        setIsNumberVisible(true);
      }
    }, displayInterval);

    return () => {
      window.clearTimeout(hideTimeout);
      window.clearTimeout(timeout);
    };
  }, [currentIndex, numbers.length, displayInterval, numberDuration, onFinish]);

  return (
    <main className="game-screen" aria-label="ゲーム">
      <p
        className="game-number"
        style={{ visibility: isNumberVisible ? "visible" : "hidden" }}
      >
        {numbers[currentIndex]}
      </p>
    </main>
  );
}

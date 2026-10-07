import { useState } from "react";
import { generateNumbers } from "./domain/game/generateNumbers";
import AnswerPage from "./pages/AnswerPage";
import GamePage from "./pages/GamePage";
import GameSettingsPage, { type GameSettings } from "./pages/GameSettingsPage";
import TopPage from "./pages/TopPage";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "top" | "settings" | "game" | "answer"
  >("top");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [settings, setSettings] = useState<GameSettings>({
    numberCount: 5,
    displayInterval: 800,
    maximumDigits: 1,
  });

  if (currentScreen === "top") {
    return <TopPage onStart={() => setCurrentScreen("settings")} />;
  }

  if (currentScreen === "game") {
    return (
      <GamePage
        numbers={numbers}
        displayInterval={settings.displayInterval}
        onFinish={() => setCurrentScreen("answer")}
      />
    );
  }

  if (currentScreen === "answer") {
    return <AnswerPage />;
  }

  return (
    <GameSettingsPage
      settings={settings}
      onChange={setSettings}
      onStart={() => {
        setNumbers(generateNumbers(settings, Math.random));
        setCurrentScreen("game");
      }}
    />
  );
}

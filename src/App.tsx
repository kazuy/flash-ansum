import { useState } from "react";
import GameSettingsPage, { type GameSettings } from "./pages/GameSettingsPage";
import TopPage from "./pages/TopPage";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"top" | "settings">("top");
  const [settings, setSettings] = useState<GameSettings>({
    numberCount: 5,
    displayInterval: 800,
    maximumDigits: 1,
  });

  if (currentScreen === "top") {
    return <TopPage onStart={() => setCurrentScreen("settings")} />;
  }

  return <GameSettingsPage settings={settings} onChange={setSettings} />;
}

import DisplayIntervalSetting, {
  type DisplayInterval,
} from "../components/DisplayIntervalSetting";
import MaximumDigitsSetting, {
  type MaximumDigits,
} from "../components/MaximumDigitsSetting";
import NumberCountSetting, {
  type NumberCount,
} from "../components/NumberCountSetting";

export type GameSettings = {
  numberCount: NumberCount;
  displayInterval: DisplayInterval;
  maximumDigits: MaximumDigits;
};

type GameSettingsPageProps = {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onStart: () => void;
};

export default function GameSettingsPage({
  settings,
  onChange,
  onStart,
}: GameSettingsPageProps) {
  return (
    <main className="settings-screen">
      <h1>ゲームの設定</h1>
      <NumberCountSetting
        value={settings.numberCount}
        onChange={(numberCount) => onChange({ ...settings, numberCount })}
      />
      <DisplayIntervalSetting
        value={settings.displayInterval}
        onChange={(displayInterval) =>
          onChange({ ...settings, displayInterval })
        }
      />
      <MaximumDigitsSetting
        value={settings.maximumDigits}
        onChange={(maximumDigits) => onChange({ ...settings, maximumDigits })}
      />
      <button type="button" onClick={onStart}>
        ゲームをはじめる
      </button>
    </main>
  );
}

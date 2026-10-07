import SettingOptions from "./SettingOptions";

const displayIntervals = [1000, 900, 800, 500, 300] as const;

export type DisplayInterval = (typeof displayIntervals)[number];

type DisplayIntervalSettingProps = {
  value: DisplayInterval;
  onChange: (value: DisplayInterval) => void;
};

export default function DisplayIntervalSetting({
  value,
  onChange,
}: DisplayIntervalSettingProps) {
  return (
    <fieldset>
      <legend>表示間隔</legend>
      <SettingOptions
        name="display-interval"
        options={displayIntervals}
        value={value}
        onChange={onChange}
        formatLabel={(option) => `${option} ms`}
      />
    </fieldset>
  );
}

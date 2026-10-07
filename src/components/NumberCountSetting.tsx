import SettingOptions from "./SettingOptions";

const numberCounts = [5, 10, 15] as const;

export type NumberCount = (typeof numberCounts)[number];

type NumberCountSettingProps = {
  value: NumberCount;
  onChange: (value: NumberCount) => void;
};

export default function NumberCountSetting({
  value,
  onChange,
}: NumberCountSettingProps) {
  return (
    <fieldset>
      <legend>数字の個数</legend>
      <SettingOptions
        name="number-count"
        options={numberCounts}
        value={value}
        onChange={onChange}
        formatLabel={(option) => `${option}個`}
      />
    </fieldset>
  );
}

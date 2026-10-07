import SettingOptions from "./SettingOptions";

const maximumDigits = [1, 2, 3] as const;

export type MaximumDigits = (typeof maximumDigits)[number];

type MaximumDigitsSettingProps = {
  value: MaximumDigits;
  onChange: (value: MaximumDigits) => void;
};

export default function MaximumDigitsSetting({
  value,
  onChange,
}: MaximumDigitsSettingProps) {
  return (
    <fieldset aria-describedby="maximum-digits-description">
      <legend>最大桁数</legend>
      <SettingOptions
        name="maximum-digits"
        options={maximumDigits}
        value={value}
        onChange={onChange}
        formatLabel={(option) => `${option}桁`}
      />
      <p id="maximum-digits-description">
        1〜{10 ** value - 1}の数字が出ます。
      </p>
    </fieldset>
  );
}

import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import DisplayIntervalSetting from "../../src/components/DisplayIntervalSetting";
import MaximumDigitsSetting from "../../src/components/MaximumDigitsSetting";
import NumberCountSetting from "../../src/components/NumberCountSetting";

test.each([
  {
    name: "数字の個数",
    renderSetting: (onChange: (value: number) => void) => (
      <NumberCountSetting value={5} onChange={onChange} />
    ),
    labels: ["5個", "10個", "15個"],
    selected: "5個",
    next: "10個",
    nextValue: 10,
  },
  {
    name: "表示間隔",
    renderSetting: (onChange: (value: number) => void) => (
      <DisplayIntervalSetting value={800} onChange={onChange} />
    ),
    labels: ["1000 ms", "800 ms", "500 ms", "300 ms"],
    selected: "800 ms",
    next: "500 ms",
    nextValue: 500,
  },
  {
    name: "最大桁数",
    renderSetting: (onChange: (value: number) => void) => (
      <MaximumDigitsSetting value={1} onChange={onChange} />
    ),
    labels: ["1桁", "2桁", "3桁"],
    selected: "1桁",
    next: "2桁",
    nextValue: 2,
  },
])(
  "displays $name options and forwards selection changes",
  ({ name, renderSetting, labels, selected, next, nextValue }) => {
    const onChange = vi.fn();
    render(renderSetting(onChange));

    expect(screen.getByRole("group", { name })).toBeVisible();
    expect(screen.getAllByRole("radio")).toHaveLength(labels.length);
    for (const label of labels) {
      expect(screen.getByRole("radio", { name: label })).toBeVisible();
    }
    expect(screen.getByRole("radio", { name: selected })).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: next }));

    expect(onChange).toHaveBeenCalledExactlyOnceWith(nextValue);
  },
);

test.each([
  [1, "1〜9の数字が出ます。"],
  [2, "1〜99の数字が出ます。"],
  [3, "1〜999の数字が出ます。"],
] as const)("explains the upper bound for %s digits", (value, description) => {
  render(<MaximumDigitsSetting value={value} onChange={vi.fn()} />);

  expect(
    screen.getByRole("group", { name: "最大桁数" }),
  ).toHaveAccessibleDescription(description);
});

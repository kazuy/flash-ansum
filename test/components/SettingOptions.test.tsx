import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import SettingOptions from "../../src/components/SettingOptions";

const options = [5, 10, 15] as const;

test("displays all labels and reflects the supplied selection on rerender", () => {
  const onChange = vi.fn();
  const { rerender } = render(
    <SettingOptions
      name="count"
      options={options}
      value={5}
      onChange={onChange}
      formatLabel={(value) => `${value}個`}
    />,
  );

  expect(screen.getAllByRole("radio")).toHaveLength(3);
  for (const value of options) {
    expect(screen.getByRole("radio", { name: `${value}個` })).toBeVisible();
  }
  expect(screen.getByRole("radio", { name: "5個" })).toBeChecked();
  expect(screen.getAllByRole("radio", { checked: true })).toHaveLength(1);

  rerender(
    <SettingOptions
      name="count"
      options={options}
      value={15}
      onChange={onChange}
      formatLabel={(value) => `${value}個`}
    />,
  );

  expect(screen.getByRole("radio", { name: "15個" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "5個" })).not.toBeChecked();
  expect(screen.getAllByRole("radio", { checked: true })).toHaveLength(1);
  expect(onChange).not.toHaveBeenCalled();
});

test.each([10, 15] as const)(
  "notifies the selected numeric value %s",
  (value) => {
    const onChange = vi.fn();
    render(
      <SettingOptions
        name="count"
        options={options}
        value={5}
        onChange={onChange}
        formatLabel={(value) => `${value}個`}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: `${value}個` }));

    expect(onChange).toHaveBeenCalledExactlyOnceWith(value);
  },
);

import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import GameSettingsPage from "../../src/pages/GameSettingsPage";

test("displays setting groups, supplied values, and a disabled start button", () => {
  render(
    <GameSettingsPage
      settings={{ numberCount: 10, displayInterval: 500, maximumDigits: 2 }}
      onChange={vi.fn()}
    />,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "ゲームの設定" }),
  ).toBeVisible();
  for (const name of ["数字の個数", "表示間隔", "最大桁数"]) {
    expect(screen.getByRole("group", { name })).toBeVisible();
  }
  for (const name of ["10個", "500 ms", "2桁"]) {
    expect(screen.getByRole("radio", { name })).toBeChecked();
  }
  expect(
    screen.getByRole("button", { name: "ゲームをはじめる" }),
  ).toBeDisabled();
});

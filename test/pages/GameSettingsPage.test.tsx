import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import GameSettingsPage from "../../src/pages/GameSettingsPage";

test("displays setting groups, supplied values, and an enabled start button", () => {
  render(
    <GameSettingsPage
      settings={{ numberCount: 10, displayInterval: 500, maximumDigits: 2 }}
      onChange={vi.fn()}
      onStart={vi.fn()}
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
  ).toBeEnabled();
});

test("starts a game when the start button is clicked", () => {
  const onStart = vi.fn();
  render(
    <GameSettingsPage
      settings={{ numberCount: 5, displayInterval: 800, maximumDigits: 1 }}
      onChange={vi.fn()}
      onStart={onStart}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));

  expect(onStart).toHaveBeenCalledOnce();
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import App from "../src/App";

function openSettings() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

test.each([
  { numberCount: 5, displayInterval: 800, maximumDigits: 1 },
  { numberCount: 10, displayInterval: 500, maximumDigits: 2 },
  { numberCount: 15, displayInterval: 300, maximumDigits: 3 },
])(
  "runs a game with settings $numberCount/$displayInterval/$maximumDigits",
  (settings) => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(1 - Number.EPSILON);
    openSettings();
    for (const name of [
      `${settings.numberCount}個`,
      `${settings.displayInterval} ms`,
      `${settings.maximumDigits}桁`,
    ]) {
      fireEvent.click(screen.getByRole("radio", { name }));
    }
    fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));

    for (let index = 0; index < settings.numberCount; index++) {
      expect(screen.getByRole("main", { name: "ゲーム" }).textContent).toBe(
        String(10 ** settings.maximumDigits - 1),
      );
      expect(screen.queryByRole("textbox")).toBeNull();
      act(() => vi.advanceTimersByTime(settings.displayInterval - 1));
      expect(screen.getByRole("main", { name: "ゲーム" })).toBeVisible();
      act(() => vi.advanceTimersByTime(1));
    }

    expect(screen.queryByRole("main", { name: "ゲーム" })).toBeNull();
    expect(screen.getByRole("textbox", { name: "あなたの答え" })).toHaveValue(
      "",
    );
    expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
  },
);

test("starts on the top page", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "フラッシュ暗算" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "ゲームの設定" })).toBeNull();
});

test("opens the settings page with default settings", () => {
  openSettings();

  expect(screen.getByRole("heading", { name: "ゲームの設定" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "フラッシュ暗算" })).toBeNull();
  expect(screen.getByRole("radio", { name: "5個" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "800 ms" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "1桁" })).toBeChecked();
});

test("preserves selected settings when changing other settings", () => {
  openSettings();
  fireEvent.click(screen.getByRole("radio", { name: "15個" }));
  fireEvent.click(screen.getByRole("radio", { name: "300 ms" }));
  fireEvent.click(screen.getByRole("radio", { name: "3桁" }));

  expect(screen.getByRole("radio", { name: "15個" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "300 ms" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "3桁" })).toBeChecked();
  expect(screen.getAllByRole("radio", { checked: true })).toHaveLength(3);
});

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
  { numberCount: 5, displayInterval: 900, maximumDigits: 1 },
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

test.each([
  { answer: "45", verdict: "正解！" },
  { answer: "0", verdict: "不正解" },
])(
  "shows $verdict after submitting $answer and returns to a fresh flow",
  ({ answer, verdict }) => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(1 - Number.EPSILON);
    openSettings();
    fireEvent.click(screen.getByRole("radio", { name: "300 ms" }));
    fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));
    for (let index = 0; index < 5; index++) {
      act(() => vi.advanceTimersByTime(300));
    }

    expect(screen.queryByText("正しい答え")).toBeNull();
    expect(screen.queryByText("45")).toBeNull();
    fireEvent.change(screen.getByRole("textbox", { name: "あなたの答え" }), {
      target: { value: answer },
    });
    expect(screen.queryByText("正しい答え")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("heading", { name: "結果" })).toBeVisible();
    expect(screen.getByText(verdict)).toBeVisible();
    expect(
      screen.getByText("あなたの答え").nextElementSibling,
    ).toHaveTextContent(answer);
    expect(screen.getByText("正しい答え").nextElementSibling).toHaveTextContent(
      "45",
    );
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: /リトライ/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "トップに戻る" }));
    expect(
      screen.getByRole("heading", { name: "フラッシュ暗算" }),
    ).toBeVisible();
    expect(screen.queryByText("正しい答え")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));
    expect(screen.getByRole("radio", { name: "800 ms" })).toBeChecked();
    vi.mocked(Math.random).mockReturnValue(0);
    fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));
    for (let index = 0; index < 5; index++) {
      act(() => vi.advanceTimersByTime(800));
    }
    expect(screen.getByRole("textbox", { name: "あなたの答え" })).toHaveValue(
      "",
    );
    fireEvent.change(screen.getByRole("textbox", { name: "あなたの答え" }), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByText("正解！")).toBeVisible();
    expect(screen.getByText("正しい答え").nextElementSibling).toHaveTextContent(
      "5",
    );
  },
);

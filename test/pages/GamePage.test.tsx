import { act, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, expect, test, vi } from "vitest";
import GamePage from "../../src/pages/GamePage";

afterEach(() => {
  vi.useRealTimers();
});

test.each([
  { displayInterval: 1000, numberDuration: 900 },
  { displayInterval: 800, numberDuration: 700 },
  { displayInterval: 500, numberDuration: 500 - 500 / 6 },
  { displayInterval: 300, numberDuration: 250 },
])(
  "separates consecutive numbers while preserving the $displayInterval ms interval",
  ({ displayInterval, numberDuration }) => {
    vi.useFakeTimers();
    const onFinish = vi.fn();
    render(
      <StrictMode>
        <GamePage
          numbers={[12, 34, 34, 56, 78]}
          displayInterval={displayInterval}
          onFinish={onFinish}
        />
      </StrictMode>,
    );

    for (const number of [12, 34, 34, 56, 78]) {
      expect(screen.getByRole("main", { name: "ゲーム" }).textContent).toBe(
        String(number),
      );
      act(() => vi.advanceTimersByTime(Math.floor(numberDuration) - 1));
      expect(screen.getByText(String(number))).toBeVisible();
      act(() => vi.advanceTimersByTime(1));
      expect(screen.getByText(String(number))).not.toBeVisible();
      act(() =>
        vi.advanceTimersByTime(
          displayInterval - Math.floor(numberDuration) - 1,
        ),
      );
      expect(screen.getByText(String(number))).not.toBeVisible();
      expect(onFinish).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(1));
    }

    expect(onFinish).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(displayInterval));
    expect(onFinish).toHaveBeenCalledOnce();
  },
);

test("does not finish after the game page is unmounted", () => {
  vi.useFakeTimers();
  const onFinish = vi.fn();
  const { unmount } = render(
    <GamePage numbers={[9]} displayInterval={800} onFinish={onFinish} />,
  );
  unmount();
  act(() => vi.advanceTimersByTime(800));

  expect(onFinish).not.toHaveBeenCalled();
});

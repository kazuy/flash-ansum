import { act, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, expect, test, vi } from "vitest";
import GamePage from "../../src/pages/GamePage";

afterEach(() => {
  vi.useRealTimers();
});

test.each([1000, 800, 500, 300])(
  "shows each number for %i ms before finishing",
  (displayInterval) => {
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
      act(() => vi.advanceTimersByTime(displayInterval - 1));
      expect(screen.getByText(String(number))).toBeVisible();
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

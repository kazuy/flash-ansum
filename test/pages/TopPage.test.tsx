import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TopPage from "../../src/pages/TopPage";

test("displays the application name and enabled start button", () => {
  render(<TopPage onStart={vi.fn()} />);

  expect(
    screen.getByRole("heading", { level: 1, name: "フラッシュ暗算" }),
  ).toBeVisible();
  expect(
    screen.getByRole("button", { name: "ゲームをはじめる" }),
  ).toBeEnabled();
});

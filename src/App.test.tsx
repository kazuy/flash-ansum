import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("displays the top screen with the application name and start button", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: "フラッシュ暗算" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "ゲームをはじめる" }),
  ).toBeVisible();
});

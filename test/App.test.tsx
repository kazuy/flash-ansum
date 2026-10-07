import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../src/App";

function openSettings() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "ゲームをはじめる" }));
}

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

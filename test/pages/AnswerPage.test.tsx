import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AnswerPage from "../../src/pages/AnswerPage";

test("allows answer entry without grading or showing a result", () => {
  render(<AnswerPage />);
  const answer = screen.getByRole("textbox", { name: "あなたの答え" });

  expect(answer).toHaveValue("");
  expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
  fireEvent.change(answer, { target: { value: "123" } });
  expect(answer).toHaveValue("123");
  expect(screen.getByRole("heading", { name: "答えを入力" })).toBeVisible();
  expect(screen.queryByText(/正解|不正解|結果/)).toBeNull();
});

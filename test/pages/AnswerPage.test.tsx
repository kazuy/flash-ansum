import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import AnswerPage from "../../src/pages/AnswerPage";

test.each(["", " ", "abc", "1.5", "-1", "1e2", "9007199254740992"])(
  "prevents submission of invalid answer %j",
  (value) => {
    const onSubmit = vi.fn();
    render(<AnswerPage onSubmit={onSubmit} />);
    const answer = screen.getByRole("textbox", { name: "あなたの答え" });
    fireEvent.change(answer, { target: { value } });
    expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
    const form = answer.closest("form");
    if (!form) throw new Error("Answer form is missing");
    fireEvent.submit(form);
    expect(onSubmit).not.toHaveBeenCalled();
  },
);

test.each(["0", "123", "00123"])("submits numeric answer %j", (value) => {
  const onSubmit = vi.fn();
  render(<AnswerPage onSubmit={onSubmit} />);
  fireEvent.change(screen.getByRole("textbox", { name: "あなたの答え" }), {
    target: { value },
  });
  expect(screen.queryByText(/正解|不正解|結果/)).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "採点する" }));
  expect(onSubmit).toHaveBeenCalledExactlyOnceWith(Number(value));
});

test("disables grading again when the answer is cleared", () => {
  render(<AnswerPage onSubmit={vi.fn()} />);
  const answer = screen.getByRole("textbox", { name: "あなたの答え" });
  fireEvent.change(answer, { target: { value: "123" } });
  expect(screen.getByRole("button", { name: "採点する" })).toBeEnabled();
  fireEvent.change(answer, { target: { value: "" } });
  expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
});

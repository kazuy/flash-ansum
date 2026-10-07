import { useState } from "react";

type AnswerPageProps = {
  onSubmit: (answer: number) => void;
};

export default function AnswerPage({ onSubmit }: AnswerPageProps) {
  const [answer, setAnswer] = useState("");
  const isValid = /^\d+$/.test(answer) && Number.isSafeInteger(Number(answer));

  return (
    <main className="answer-screen">
      <h1>答えを入力</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) {
            onSubmit(Number(answer));
          }
        }}
      >
        <label htmlFor="answer">あなたの答え</label>
        <input
          id="answer"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button type="submit" disabled={!isValid}>
          採点する
        </button>
      </form>
    </main>
  );
}

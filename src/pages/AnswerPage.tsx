export default function AnswerPage() {
  return (
    <main className="answer-screen">
      <h1>答えを入力</h1>
      <label htmlFor="answer">あなたの答え</label>
      <input id="answer" type="text" inputMode="numeric" autoComplete="off" />
      <button type="button" disabled>
        採点する
      </button>
    </main>
  );
}

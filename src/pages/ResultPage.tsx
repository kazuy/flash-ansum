type ResultPageProps = {
  submittedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  onReturnToTop: () => void;
};

export default function ResultPage({
  submittedAnswer,
  correctAnswer,
  isCorrect,
  onReturnToTop,
}: ResultPageProps) {
  return (
    <main className="result-screen">
      <h1>結果</h1>
      <p className="result-verdict">{isCorrect ? "正解！" : "不正解"}</p>
      <dl>
        <dt>あなたの答え</dt>
        <dd>{submittedAnswer}</dd>
        <dt>正しい答え</dt>
        <dd>{correctAnswer}</dd>
      </dl>
      <button type="button" onClick={onReturnToTop}>
        トップに戻る
      </button>
    </main>
  );
}

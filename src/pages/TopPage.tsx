type TopPageProps = {
  onStart: () => void;
};

export default function TopPage({ onStart }: TopPageProps) {
  return (
    <main className="top-screen">
      <h1>フラッシュ暗算</h1>
      <button type="button" onClick={onStart}>
        ゲームをはじめる
      </button>
    </main>
  );
}

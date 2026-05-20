interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export function Result({ score, total, onRestart }: Props) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div>
      <h2>Quiz beendet!</h2>
      <p>
        {score} von {total} richtig ({percentage}%)
      </p>
      <button onClick={onRestart}>Nochmal spielen</button>
    </div>
  );
}

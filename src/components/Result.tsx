interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export function Result({ score, total, onRestart }: Props) {
  const percentage = Math.round((score / total) * 100);
  const emoji = percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪";

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{emoji}</h1>
      <div className="score-big">{percentage}%</div>
      <p className="score-label">
        {score} von {total} Fragen richtig
      </p>
      <button className="btn-primary" onClick={onRestart}>
        Nochmal spielen
      </button>
    </div>
  );
}

import { useState } from "react";
import { useQuiz } from "./hooks/useQuiz";
import { Question } from "./components/Question";
import { Result } from "./components/Result";
import { fetchQuestions } from "./api/quizApi";
import { Difficulty } from "./types/quiz";
import "./App.css";

export default function App() {
  const { state, start, answer, reset } = useQuiz();
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [error, setError] = useState<string | null>(null);

  async function handleStart() {
    setError(null);
    try {
      const questions = await fetchQuestions(10, difficulty);
      start(questions);
    } catch (e) {
      setError("Fragen konnten nicht geladen werden. Versuche es nochmal!");
    }
  }

  if (state.status === "idle" || state.status === "error") {
    return (
      <div className="container">
        <h1>Quiz App</h1>
        <p>Teste dein Wissen!</p>
        <div className="difficulty">
          <label>Schwierigkeit:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <option value="easy">Einfach</option>
            <option value="medium">Mittel</option>
            <option value="hard">Schwer</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn-primary" onClick={handleStart}>
          Starten
        </button>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="container">
        <p>Fragen werden geladen...</p>
      </div>
    );
  }

  if (state.status === "finished") {
    return (
      <div className="container">
        <Result
          score={state.score}
          total={state.questions.length}
          onRestart={reset}
        />
      </div>
    );
  }

  const current = state.questions[state.currentIndex];

  return (
    <div className="container">
      <Question
        question={current}
        onAnswer={answer}
        questionNumber={state.currentIndex + 1}
        total={state.questions.length}
      />
    </div>
  );
}

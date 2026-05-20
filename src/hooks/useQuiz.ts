import { useState } from "react";
import { Question, QuizState } from "../types/quiz";

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    status: "idle",
  });

  function answer(selectedIndex: number) {
    const current = state.questions[state.currentIndex];
    const correct = selectedIndex === current.correctIndex;
    const isLast = state.currentIndex + 1 >= state.questions.length;

    setState((prev) => ({
      ...prev,
      score: correct ? prev.score + 1 : prev.score,
      answers: [...prev.answers, correct],
      currentIndex: prev.currentIndex + 1,
      status: isLast ? "finished" : "playing",
    }));
  }

  function start(questions: Question[]) {
    setState({
      questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      status: "playing",
    });
  }

  function reset() {
    setState({
      questions: [],
      currentIndex: 0,
      score: 0,
      answers: [],
      status: "idle",
    });
  }

  return { state, answer, start, reset };
}

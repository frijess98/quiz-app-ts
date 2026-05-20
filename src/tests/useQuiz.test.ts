import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuiz } from "../hooks/useQuiz";
import { Question } from "../types/quiz";

const mockQuestions: Question[] = [
  {
    question: "Was ist 2+2?",
    answers: ["3", "4", "5", "6"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Math",
  },
  {
    question: "Hauptstadt der Schweiz?",
    answers: ["Zürich", "Basel", "Bern", "Genf"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Geography",
  },
];

describe("useQuiz", () => {
  test("startet mit idle status", () => {
    const { result } = renderHook(() => useQuiz());
    expect(result.current.state.status).toBe("idle");
  });

  test("start setzt status auf playing", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.start(mockQuestions));
    expect(result.current.state.status).toBe("playing");
  });

  test("korrekte Antwort erhöht score", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.start(mockQuestions));
    act(() => result.current.answer(1));
    expect(result.current.state.score).toBe(1);
  });

  test("falsche Antwort erhöht score nicht", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.start(mockQuestions));
    act(() => result.current.answer(0));
    expect(result.current.state.score).toBe(0);
  });

  test("letzte Frage setzt status auf finished", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.start(mockQuestions));
    act(() => result.current.answer(1));
    act(() => result.current.answer(2));
    expect(result.current.state.status).toBe("finished");
  });

  test("reset setzt alles zurück", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.start(mockQuestions));
    act(() => result.current.answer(1));
    act(() => result.current.reset());
    expect(result.current.state.status).toBe("idle");
    expect(result.current.state.score).toBe(0);
  });
});

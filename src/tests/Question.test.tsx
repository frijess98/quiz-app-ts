import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Question } from "../components/Question";
import { QuizQuestion, Difficulty } from "../types/quiz";

const mockQuestion: QuizQuestion = {
  question: "Was ist 2+2?",
  answers: ["3", "4", "5", "6"],
  correctIndex: 1,
  difficulty: "easy" as Difficulty,
  category: "Math",
};

describe("Question", () => {
  test("zeigt die Frage an", () => {
    render(
      <Question
        question={mockQuestion}
        onAnswer={vi.fn()}
        questionNumber={1}
        total={10}
      />,
    );
    expect(screen.getByText("Was ist 2+2?")).toBeInTheDocument();
  });

  test("zeigt alle 4 Antworten an", () => {
    render(
      <Question
        question={mockQuestion}
        onAnswer={vi.fn()}
        questionNumber={1}
        total={10}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  test("zeigt Fortschritt an", () => {
    render(
      <Question
        question={mockQuestion}
        onAnswer={vi.fn()}
        questionNumber={3}
        total={10}
      />,
    );
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  test("ruft onAnswer mit richtigem Index auf", async () => {
    const onAnswer = vi.fn();
    render(
      <Question
        question={mockQuestion}
        onAnswer={onAnswer}
        questionNumber={1}
        total={10}
      />,
    );
    await userEvent.click(screen.getByText("4"));
    expect(onAnswer).toHaveBeenCalledWith(1);
  });
});

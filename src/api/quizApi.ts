import { ApiQuestion, Difficulty, QuizQuestion } from "../types/quiz";
import localQuestions from "../data/questions.json";

export function transformQuestion(apiQuestion: ApiQuestion): QuizQuestion {
  const answers = [
    ...apiQuestion.incorrect_answers,
    apiQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return {
    question: apiQuestion.question,
    answers,
    correctIndex: answers.indexOf(apiQuestion.correct_answer),
    difficulty: apiQuestion.difficulty,
    category: apiQuestion.category,
  };
}

export async function fetchQuestions(
  amount: number = 10,
  difficulty: Difficulty = "medium",
): Promise<QuizQuestion[]> {
  const filtered = (localQuestions as ApiQuestion[])
    .filter((q) => q.difficulty === difficulty)
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);

  return filtered.map(transformQuestion);
}

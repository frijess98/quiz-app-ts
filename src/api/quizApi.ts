import { ApiQuestion, Difficulty, Question } from "../types/quiz";

export function transformQuestion(apiQuestion: ApiQuestion): Question {
  const answers = [
    ...apiQuestion.incorrect_answers,
    apiQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return {
    question: decodeURIComponent(apiQuestion.question),
    answers,
    correctIndex: answers.indexOf(apiQuestion.correct_answer),
    difficulty: apiQuestion.difficulty,
    category: apiQuestion.category,
  };
}

export async function fetchQuestions(
  amount: number = 10,
  difficulty: Difficulty = "medium",
): Promise<Question[]> {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`,
  );
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const data = await res.json();
  if (data.response_code !== 0) throw new Error("No questions available");
  return data.results.map(transformQuestion);
}

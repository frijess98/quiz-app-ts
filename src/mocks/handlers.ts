import { http, HttpResponse } from "msw";

export const mockQuestions = [
  {
    question: "What is 2+2?",
    correct_answer: "4",
    incorrect_answers: ["3", "5", "6"],
    difficulty: "medium",
    category: "Math",
  },
  {
    question: "What color is the sky?",
    correct_answer: "Blue",
    incorrect_answers: ["Red", "Green", "Yellow"],
    difficulty: "easy",
    category: "General",
  },
];

export const handlers = [
  http.get("https://opentdb.com/api.php", () => {
    return HttpResponse.json({
      response_code: 0,
      results: mockQuestions,
    });
  }),
];

import { describe, test, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { fetchQuestions, transformQuestion } from "../api/quizApi";
import { mockQuestions } from "../mocks/handlers";

describe("transformQuestion", () => {
  test("dekodiert HTML-Entities im question-Text", () => {
    const raw = { ...mockQuestions[0], question: "What%20is%202%2B2%3F" };
    const result = transformQuestion(raw as any);
    expect(result.question).toBe("What is 2+2?");
  });

  test("correct_answer ist in answers enthalten", () => {
    const result = transformQuestion(mockQuestions[0] as any);
    expect(result.answers).toContain("4");
  });

  test("correctIndex zeigt auf die richtige Antwort", () => {
    const result = transformQuestion(mockQuestions[0] as any);
    expect(result.answers[result.correctIndex]).toBe("4");
  });

  test("answers hat genau 4 Einträge", () => {
    const result = transformQuestion(mockQuestions[0] as any);
    expect(result.answers).toHaveLength(4);
  });
});

describe("fetchQuestions", () => {
  test("gibt transformierte Fragen zurück", async () => {
    const questions = await fetchQuestions();
    expect(questions).toHaveLength(2);
    expect(questions[0]).toHaveProperty("correctIndex");
    expect(questions[0]).toHaveProperty("answers");
  });

  test("wirft Error bei HTTP 500", async () => {
    server.use(
      http.get("https://opentdb.com/api.php", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    await expect(fetchQuestions()).rejects.toThrow("API Error: 500");
  });

  test("wirft Error bei response_code !== 0", async () => {
    server.use(
      http.get("https://opentdb.com/api.php", () => {
        return HttpResponse.json({ response_code: 1, results: [] });
      }),
    );
    await expect(fetchQuestions()).rejects.toThrow("No questions available");
  });

  test("wirft Error bei Netzwerkproblem", async () => {
    server.use(
      http.get("https://opentdb.com/api.php", () => {
        return HttpResponse.error();
      }),
    );
    await expect(fetchQuestions()).rejects.toThrow();
  });
});

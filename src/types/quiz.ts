export type Difficulty = "easy" | "medium" | "hard";

export interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: Difficulty;
  category: string;
}

export interface QuizQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
  difficulty: Difficulty;
  category: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  answers: boolean[];
  status: "idle" | "loading" | "playing" | "finished" | "error";
}

import { QuizQuestion } from "../types/quiz";

interface Props {
  question: QuizQuestion;
  onAnswer: (index: number) => void;
  questionNumber: number;
  total: number;
}

export function Question({ question, onAnswer, questionNumber, total }: Props) {
  const progress = (questionNumber / total) * 100;

  return (
    <div>
      <p className="progress">
        Frage {questionNumber} von {total}
      </p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(index)}>
            {answer}
          </button>
        ))}
      </ul>
    </div>
  );
}

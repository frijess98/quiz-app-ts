import { Question as QuestionType } from "../types/quiz";

interface Props {
  question: QuestionType;
  onAnswer: (index: number) => void;
  questionNumber: number;
  total: number;
}

export function Question({ question, onAnswer, questionNumber, total }: Props) {
  return (
    <div>
      <p>
        {questionNumber} / {total}
      </p>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <ul>
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(index)}>
            {answer}
          </button>
        ))}
      </ul>
    </div>
  );
}

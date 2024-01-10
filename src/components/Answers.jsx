import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelectAns,
}) {
  const shuffledAnsRef = useRef();

  if (!shuffledAnsRef.current) {
    shuffledAnsRef.current = [...answers];
    shuffledAnsRef.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnsRef.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssCls = "";

        if (answerState === "answered" && isSelected) {
          cssCls = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssCls = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAns(answer)}
              className={cssCls}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

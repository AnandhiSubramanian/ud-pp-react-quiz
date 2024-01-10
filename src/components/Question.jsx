import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../question.js";

import { useState } from "react";

export default function Question({ quesIndex, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect != null) {
    timer = 2000;
  }
  function handleSelectAnswer(ans) {
    setAnswer({
      selectedAnswer: ans,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: ans,
        isCorrect: QUESTIONS[quesIndex].answers[0] === ans,
      });

      setTimeout(() => {
        onSelectAnswer(ans);
      }, 2000);
    }, 1000);
  }

  let ansState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    ansState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    ansState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={ansState}
      />
      <h2> {QUESTIONS[quesIndex].text}</h2>
      <Answers
        answers={QUESTIONS[quesIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={ansState}
        onSelectAns={handleSelectAnswer}
      ></Answers>
    </div>
  );
}

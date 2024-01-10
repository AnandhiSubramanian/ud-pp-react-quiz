import { useCallback, useState } from "react";
import QUESTIONS from "../question.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleAnswerSelection = useCallback(function handleAnswerSelection(
    answer
  ) {
    setUserAnswers((prevAns) => {
      return [...prevAns, answer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleAnswerSelection(null),
    [handleAnswerSelection]
  );

  if (quizIsComplete) {
    return <Summary userAns={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        quesIndex={activeQuestionIndex}
        onSelectAnswer={handleAnswerSelection}
        onSkipAnswer={handleSkipAnswer}
      ></Question>
    </div>
  );
}

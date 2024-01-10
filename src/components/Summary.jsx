import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../question.js";

export default function Summary({ userAns }) {
  const skippedAns = userAns.filter((ans) => ans === null);
  let correctAns = userAns.filter(
    (ans, index) => ans === QUESTIONS[index].answers[0]
  );

  const skippedAnsShare = Math.round(
    (skippedAns.length / userAns.length) * 100
  );
  const correctAnsShare = Math.round(
    (correctAns.length / userAns.length) * 100
  );
  const incorrectAnsShare = 100 - skippedAnsShare - correctAnsShare;
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="trophy icon" />
      <h2>Quiz completed!!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnsShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnsShare}%</span>
          <span className="text">Correct Answers</span>
        </p>
        <p>
          <span className="number">{incorrectAnsShare}%</span>
          <span className="text">Incorrect Answers</span>
        </p>
      </div>
      <ol>
        {userAns.map((ans, index) => {
          let cssCls = "user-answer";
          if (ans === null) {
            cssCls += " skipped";
          } else if (ans === QUESTIONS[index].answers[0]) {
            cssCls += " correct";
          } else {
            cssCls += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssCls}>{ans ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

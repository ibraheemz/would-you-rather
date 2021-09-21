import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Question from "./Question";

const Home = ({ questionIds, userAnswers }) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const [showNotanswered, setShownotanswered] = useState(true);
  if (questionIds === undefined) {
    return <Redirect to="/Login" />;
  }
  console.log("question", questionIds);
  const notAnswered = questionIds.filter((qid) => !userAnswers.includes(qid));
  return (
    <div className="row bg-primary">
      <div className="row justify-content-between">
        <button
          className="btn btn-secondary border border-light col-6"
          onClick={() => {
            setShowAnswered(true);
            setShownotanswered(false);
          }}
        >
          Show answered questions
        </button>
        <button
          className="btn btn-secondary border border-light col-6"
          onClick={() => {
            setShowAnswered(false);
            setShownotanswered(true);
          }}
        >
          Show not answered questions
        </button>
      </div>

      <div className={showAnswered ? "col-4" : "d-none"}>
        <h2 className="ml-5 btn "> Answered </h2>
        <ul>
          {userAnswers.map((qId) => (
            <li key={qId}>
              <Question id={qId} />
            </li>
          ))}
        </ul>
      </div>
      <div className={showNotanswered ? "col-4" : "d-none"}>
        <h2 className="btn">Not answered</h2>
        <ul>
          {notAnswered.map((qId) => (
            <li key={qId}>
              <Question id={qId} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  let user = "";
  if (authedUser) {
    user = users[authedUser];
    return {
      questionIds: Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamb
      ),
      userAnswers: Object.keys(user.answers).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamb
      ),
    };
  }
};
export default connect(mapStateToProps)(Home);

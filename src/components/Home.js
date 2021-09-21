import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Question from "./Question";

const Home = ({ answered, unanswered, authedUser }) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const [showNotanswered, setShownotanswered] = useState(true);
  if (authedUser === undefined) {
    return <Redirect to="/Login" />;
  }
  console.log(answered, unanswered);

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
          {answered.map((q) => (
            <li key={q.id}>
              <Question id={q.id} />
            </li>
          ))}
        </ul>
      </div>
      <div className={showNotanswered ? "col-4" : "d-none"}>
        <h2 className="btn">Not answered</h2>
        <ul>
          {unanswered.map((q) => (
            <li key={q.id}>
              <Question id={q.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const answeredIds = Object.keys(users[authedUser].answers);
  const answered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answered,
    unanswered,
    authedUser,
  };
};
export default connect(mapStateToProps)(Home);

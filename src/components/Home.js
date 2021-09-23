/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Question from "./Question";

const Home = () => {
  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);

  const history = useHistory();

  const [answered, setAnswered] = useState(null);
  const [unanswered, setUnanswered] = useState(null);

  useEffect(() => {
    authedUser === null && history.push("/Login");
    const answeredIds =
      users[authedUser] && Object.keys(users[authedUser].answers);
    const answered =
      answeredIds &&
      Object.values(questions)
        .filter((question) => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    setAnswered(answered);

    const unanswered =
      answeredIds &&
      Object.values(questions)
        .filter((question) => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    setUnanswered(unanswered);
  }, [questions, authedUser, users]);

  const [showAnswered, setShowAnswered] = useState(false);
  const [showNotanswered, setShownotanswered] = useState(true);

  return (
    <div>
      {answered && unanswered ? (
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;

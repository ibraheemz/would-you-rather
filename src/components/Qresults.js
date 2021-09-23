/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
const Qresults = () => {
  const { id } = useParams();
  const history = useHistory();

  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);

  const [question, setQuestion] = useState(null);
  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null);
  const [numOfAnswers, setNumOfAnswers] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    authedUser === null &&
      history.push({
        pathname: "/Login",
        state: { lastURL: `/Qresults/${id}` },
      });

    setQuestion(questions[id]);
    setAuthor(question && question.author);
    setUser(users[author]);
    setNumOfAnswers(
      question &&
        question.optionOne.votes.length + question.optionTwo.votes.length
    );
    if (question) {
      for (let i = 0; i <= question.optionOne.votes.length; i++) {
        question.optionOne.votes[i] === authedUser &&
          setUserAnswer("optionOne");
      }
      for (let i = 0; i <= question.optionTwo.votes.length; i++) {
        question.optionTwo.votes[i] === authedUser &&
          setUserAnswer("optionTwo");
      }
    }
  }, [question, author, user]);

  return (
    <div>
      {question && author && user ? (
        <div>
          <h3>Asked by {author}</h3>
          <div>
            <img src={user.avatarURL} alt={`a piture of ${user.name}`} />
          </div>
          <div>
            <h4>Results:</h4>
            <div
              className={
                userAnswer === "optionOne" ? "border border-primary" : ""
              }
            >
              <p1>{question.optionOne.text}</p1>
              <br />
              <span>
                {question.optionOne.votes.length} voted for this
                <br />
                {Math.round(
                  (question.optionOne.votes.length / numOfAnswers) * 100
                )}
                % chose this answer
              </span>
            </div>
            <br />
            <div
              className={
                userAnswer === "optionTwo"
                  ? "border rounded border-primary"
                  : ""
              }
            >
              <p1>{question.optionTwo.text}</p1>
              <br />
              <span>
                {question.optionTwo.votes.length} voted for this
                <br />
                {Math.round(
                  (question.optionTwo.votes.length / numOfAnswers) * 100
                )}
                % chose this answer
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Qresults;

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

  //   const question = questions[id];
  //   const author = question.author;
  //   const user = users[author];
  //   const numOfAnswers =
  //     question.optionOne.votes.length + question.optionTwo.votes.length;

  useEffect(() => {
    authedUser === null && history.push("/Login");
    setQuestion(questions[id]);
    setAuthor(question && question.author);
    setUser(users[author]);
    setNumOfAnswers(
      question &&
        question.optionOne.votes.length + question.optionTwo.votes.length
    );
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
            <div>
              <p1>{question.optionOne.text}</p1>
              <br />
              <span>
                {question.optionOne.votes.length} out of {numOfAnswers}
              </span>
            </div>
            <br />
            <div>
              <p1>{question.optionTwo.text}</p1>
              <br />
              <span>
                {question.optionTwo.votes.length} out of {numOfAnswers}
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

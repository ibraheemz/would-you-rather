/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/users";

const Qdetails = (props) => {
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const [question, setQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const { id } = props.match.params;

  useEffect(() => {
    if (authedUser) {
      questions[id]
        ? setQuestion(questions[id])
        : questions
        ? history.push("/404")
        : authedUser === null &&
          history.push({
            pathname: "/Login",
            state: { lastURL: `/question/${id}` },
          });
    } else {
      history.push({
        pathname: "/Login",
        state: { lastURL: `/question/${id}` },
      });
    }

    setUser(question && question.author && users[question.author]);
    setLoggedInUser(users[authedUser]);
    question && setUserVote(loggedInUser && loggedInUser.answers[question.id]);
    console.log("questions: ", questions);
  }, [question, user, loggedInUser, userVote, authedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer) {
      dispatch(handleSaveQuestionAnswer(authedUser, id, answer)).then(() =>
        history.push(`/Qresults/${id}`)
      );
    } else {
      alert("you can't submit without choosing an answer");
    }
  };
  const handleSubmitMinor = (e) => {
    e.preventDefault();
    history.push(`/Qresults/${id}`);
  };
  return (
    <div>
      {question && user && loggedInUser ? (
        <div>
          <h3>{user.name} asks:</h3>
          <img src={user.avatarURL} alt={`a piture of ${user.name}`} />
          <h4>Would you rather</h4>
          {userVote ? (
            <form onChange={(e) => setAnswer(e.target.value)}>
              <input
                id="optionOne"
                type="checkbox"
                name="answer"
                value="optionOne"
                checked={userVote === "optionOne" ? true : false}
              />
              <lable>{question.optionOne.text}</lable>
              <br />

              <br />
              <input
                id="optionTwo"
                type="checkbox"
                name="answer"
                value="optionTwo"
                checked={userVote === "optionTwo" ? true : false}
              />
              <lable>{question.optionTwo.text}</lable>
              <br />

              <button
                className="btn btn-primary "
                type="Submit"
                onClick={(e) => handleSubmitMinor(e)}
              >
                View Results
              </button>
            </form>
          ) : (
            <form onChange={(e) => setAnswer(e.target.value)}>
              <input
                id="optionOne"
                type="radio"
                name="answer"
                value="optionOne"
              />
              <lable>{question.optionOne.text}</lable>
              <br />

              <br />
              <input
                id="optionTwo"
                type="radio"
                name="answer"
                value="optionTwo"
              />
              <lable>{question.optionTwo.text}</lable>
              <br />

              <button
                className="btn btn-primary "
                type="Submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit answer
              </button>
            </form>
          )}
        </div>
      ) : (
        <div>loading ...</div>
      )}
    </div>
  );
};

export default Qdetails;

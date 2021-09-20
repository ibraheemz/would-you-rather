import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Question from "./Question";

const Home = ({ questionIds, userAnswers }) => {
  if (questionIds === undefined) {
    return <Redirect to="/Login" />;
  }
  console.log("question", questionIds);
  const notAnswered = questionIds.filter((qid) => !userAnswers.includes(qid));
  return (
    <div className="row bg-primary">
      <div className="answered col-4">
        <h2 className="ml-5"> Answered </h2>
        <ul>
          {userAnswers.map((qId) => (
            <li key={qId}>
              <Question id={qId} />
            </li>
          ))}
        </ul>
      </div>
      <div className="notAnswered col-4">
        <h2>Not answered</h2>
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

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = ({ question, user, id }) => {
  return (
    <div>
      <h3>{user.name} asks:</h3>
      <img
        src={user.avatarURL}
        alt={`a piture of ${user.name}`}
        className="img-thumbnail"
      />
      <h4>Would you rather</h4>
      <p>{question.optionOne.text} ...</p>
      <Link
        to={`/question/${id}`}
        params={{ id: { id } }}
        className="btn bg-light"
      >
        View Poll
      </Link>
    </div>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
  };
};
export default connect(mapStateToProps)(Question);

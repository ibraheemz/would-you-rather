import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
const LeaderBoard = ({ users, authedUser }) => {
  if (authedUser === null) {
    return <Redirect to="/Login" />;
  }
  console.log(users);
  return (
    <div>
      {users &&
        Object.keys(users).map((user) => (
          <div className="mb-4">
            <h3>{users[user].name}</h3>
            <span>
              Answered questions: {Object.keys(users[user].answers).length}
            </span>
            <br />
            <span>Created questions: {users[user].questions.length}</span>
            <br />
            <span>
              Total Score:{" "}
              {Object.keys(users[user].answers).length +
                users[user].questions.length}
            </span>
          </div>
        ))}
    </div>
  );
};
const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser,
  };
};
export default connect(mapStateToProps)(LeaderBoard);

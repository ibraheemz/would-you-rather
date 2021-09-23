/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const LeaderBoard = (props) => {
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const [BoardData, setBoardData] = useState(null);

  const history = useHistory();
  useEffect(() => {
    authedUser === null &&
      history.push({
        pathname: "/Login",
        state: { lastURL: "/LeaderBoard" },
      });
    const leaderboardData = Object.values(users)
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length,
      }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3);
    setBoardData(leaderboardData);
  }, [users, authedUser]);

  console.log(users);
  return (
    <div>
      {BoardData ? (
        BoardData.map((user) => (
          <div className="mb-4" key={user.id}>
            <h3>{user.name}</h3>
            <img
              src={user.avatarURL}
              alt={`a piture of ${user.name}`}
              className="img-thumbnail"
              width="300"
              height="200"
            />
            <div>
              <span>Answered questions: {user.answerCount}</span>
              <br />
              <span>Created questions: {user.questionCount}</span>
              <br />
              <span>Total Score: {user.total}</span>
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LeaderBoard;

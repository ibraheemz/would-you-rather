import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
const LeaderBoard = () => {
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const [BoardData, setBoardData] = useState(null);

  const history = useHistory();
  useEffect(() => {
    authedUser === null && history.push("/Login");
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
            <span>Answered questions: {user.answerCount}</span>
            <br />
            <span>Created questions: {user.questionCount}</span>
            <br />
            <span>Total Score: {user.total}</span>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LeaderBoard;

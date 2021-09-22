import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import setAuthedUser from "../actions/setAuthedUser";
import { Redirect, useHistory, useLocation } from "react-router";
const Login = ({ users, dispatch, authedUser, props }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [toHome, setToHome] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(currentUser));
    setToHome(true);
  };

  if (toHome) {
    location.state === undefined && history.push("/Home");
    location.state &&
      location.state.lastURL === "/Login" &&
      history.push("/Home");
    location.state && history.push(location.state.lastURL);
  }

  return (
    <div>
      <h1>Login to continue</h1>
      <h3>Select a user</h3>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <select
          className="form-control w-25 p-2 col-4 m-1"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
        >
          <option value="" defaultValue></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary col-4 m-1" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

function mapStateToProps({ users, authedUser }, props) {
  return {
    users: Object.values(users),
    authedUser,
    props,
  };
}

export default connect(mapStateToProps)(Login);

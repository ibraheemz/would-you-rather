import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import setAuthedUser from "../actions/setAuthedUser";
import { Redirect } from "react-router";
const Login = ({ users, dispatch, authedUser }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(currentUser));
    setToHome(true);
  };
  if (toHome) return <Redirect to="/Home" />;
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

function mapStateToProps({ users, authedUser }) {
  return {
    users: Object.values(users),
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);

import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { UNSET_AUTHED_USER } from "../actions/setAuthedUser";
function Nav({ authedUser, handleLogOut }) {
  return (
    <nav className="nav">
      <ul className="row">
        <li className="col-6">
          <NavLink to="/Home" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="col-6">
          <NavLink to="/LeaderBoard" exact activeClassName="active">
            LeaderBoard
          </NavLink>
        </li>
        <li className="col-6">
          <NavLink to="/CreateQuestion" exact activeClassName="active">
            Create Question
          </NavLink>
        </li>
        <li className="col-6">
          <NavLink
            to="/Login"
            exact
            activeClassName="active"
            onClick={() => handleLogOut()}
          >
            Log out
          </NavLink>
        </li>
      </ul>
      {authedUser ? (
        <span className="btn btn-secondary disabled">Hello {authedUser}</span>
      ) : (
        ""
      )}
    </nav>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut() {
      dispatch({ type: UNSET_AUTHED_USER });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

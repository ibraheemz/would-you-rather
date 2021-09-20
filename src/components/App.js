import Login from "./Login";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import handelInitalData from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Home from "./Home";
import Qdetails from "./Qdetails";
import Qresults from "./Qresults";
import { Redirect } from "react-router";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
function App({ dispatch, notAuthed }) {
  useEffect(() => {
    dispatch(handelInitalData());
  }, []);
  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <div className="container">
          <Nav />
          <div>
            <Route path="/Home" exact component={Home} />
            <Route path="/question/:id" component={Qdetails} />
            <Route path="/Login" component={Login} />
            <Route path="/LeaderBoard" component={LeaderBoard} />
            <Route path="/CreateQuestion" component={NewQuestion} />
            <Route path="/Qresults/:id" component={Qresults} />
          </div>
          {notAuthed && <Redirect to="/Login" />}
        </div>
      </Fragment>
    </Router>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    notAuthed: authedUser === null,
  };
};

export default connect(mapStateToProps)(App);

import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";
// import setAuthedUser from "./setAuthedUser";

// const authedUser = "";
export default function handelInitalData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      // dispatch(setAuthedUser(authedUser));
      dispatch(hideLoading());
    });
  };
}

import { addAnswerToQuestion } from "./questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswerToUser(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer,
  };
}
export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}

// export function handleSaveQuestionAnswer(authUser, qid, answer) {
//   return async (dispatch) => {
//     dispatch(addAnswerToUser(authUser, qid, answer));
//     dispatch(addAnswerToQuestion(authUser, qid, answer));
//     console.log("in action handleSaveQuestionAnswer");

//     return await saveQuestionAnswer(authUser, qid, answer).catch((e) => {
//       console.warn("Error in handleSaveQuestionAnswer function:", e);
//     });
//   };
// }

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return async (dispatch) => {
    await _saveQuestionAnswer(authedUser, qid, answer);
    dispatch(showLoading());
    dispatch(addAnswerToUser(authedUser, qid, answer));
    dispatch(addAnswerToQuestion(authedUser, qid, answer));
    dispatch(hideLoading());
    console.log("in action handleSaveQuestionAnswer");
  };
}

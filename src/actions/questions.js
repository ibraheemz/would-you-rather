import { saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { addQuestionToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const CREATE_QUESTION = "CREATE_QUESTION";
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer,
  };
}
export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}

export function handleCreateQuestion(optionOneText, optionTwoText, author) {
  return async function (dispatch) {
    const question = await saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    dispatch(showLoading());
    dispatch(createQuestion(question));
    dispatch(addQuestionToUser(question));
    dispatch(hideLoading());
  };
}

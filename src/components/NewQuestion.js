import React, { useState } from "react";
import { connect } from "react-redux";
import { handleCreateQuestion } from "../actions/questions";

const NewQuestion = ({ authedUser, createNewQuestion }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewQuestion(optionOne, optionTwo, authedUser);
    setOptionOne("");
    setOptionTwo("");
    alert("Question Submitted !");
  };
  return (
    <div>
      <h3>Would you rather ?</h3>
      <input
        className="form-controle w-25 p-2"
        placeholder="option one"
        onChange={(e) => setOptionOne(e.target.value)}
        value={optionOne}
      />
      <input
        className="form-controle w-25 p-2"
        placeholder="option two"
        onChange={(e) => setOptionTwo(e.target.value)}
        value={optionTwo}
      />
      <button
        className="btn btn-primary m-2"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};
const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewQuestion(optionOne, optionTwo, author) {
      dispatch(handleCreateQuestion(optionOne, optionTwo, author));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);

import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption=(props)=> {

  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name={`radioGroup${props.questionId}`}
        checked={props.answerType === props.answer}
        id={`radioGroup${props.questionId}-${props.answerType}`}
        value={props.answerType}
        disabled={props.answer}
        onChange={(e)=>{props.onAnswerSelected(e);}}        
      />
      <label className="radioCustomLabel" htmlFor={`radioGroup${props.questionId}-${props.answerType}`} onClick={(e)=>{props.onAnswerSelected(e);}}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  // answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;

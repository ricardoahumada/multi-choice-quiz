import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <section className="results">
        <p>{props.quizNumbers}</p>        
        <p>{props.quizResult}</p>
      </section>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizNumbers: PropTypes.string.isRequired,
  quizResult: PropTypes.string.isRequired
};

export default Result;

import React from 'react';
import { Colors } from '../../../config/styles';

const AnswersListItem = ({ answer, setCurrentQuestion }) => (
  <div
    className="rounded-children-block b pa3 tc"
    onClick={() => {
      answer.attributes.route
      ?
        setCurrentQuestion(answer.attributes.route)
      :
        console.log('no dice');
    }}
    style={{
      color: answer.attributes.route ? Colors.brandGreen : Colors.brandNearBlack,
      cursor: answer.attributes.route ? 'pointer' : 'not-allowed',
    }}
  >
    {answer.attributes.body}
  </div>
);

const AnswersList = ({ answers, setCurrentQuestion }) => (
  <div>
    {answers.map(answer => <AnswersListItem answer={answer} key={answer.id} setCurrentQuestion={setCurrentQuestion} />)}
  </div>
)

export default AnswersList;

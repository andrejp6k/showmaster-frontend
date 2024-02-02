import React from 'react';
import Button from '../../Button/Button';
import styles from './ActionButtonsInBuzzerQuestion.scss';
import { useSelector } from 'react-redux';
import { selectTeamToAnswerId } from '../../../../redux/gameSlice';
import { Question } from '../../../../types';

interface ActionButtonsInBuzzerQuestionProps {
  isQuestionActive: boolean;
  isAnswered: boolean;
  activate: () => void;
  deactivate: () => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  question: Question;
}

const ActionButtonsInBuzzerQuestion: React.FC<ActionButtonsInBuzzerQuestionProps> = ({
  isQuestionActive,
  isAnswered,
  activate,
  deactivate,
  handleCorrectAnswer,
  handleWrongAnswer,
  question,
}) => {
  const teamToAnswerId = useSelector(selectTeamToAnswerId);

  return (
    <div className={styles.actionButtons}>
      {!teamToAnswerId && !isAnswered && (
        <Button color="tertiary" onClick={() => (isQuestionActive ? deactivate() : activate())} disabled={!question} sx={{ width: '150px' }}>
          {isQuestionActive ? 'Deactivate' : 'Activate'}
        </Button>
      )}
      {teamToAnswerId && !isAnswered && (
        <>
          <Button color="primary" onClick={handleCorrectAnswer}>
            Correct answer
          </Button>
          <Button color="primary" onClick={handleWrongAnswer}>
            Wrong answer
          </Button>
        </>
      )}
      {isAnswered && <h3>Point assigned!</h3>}
    </div>
  );
};

export default ActionButtonsInBuzzerQuestion;

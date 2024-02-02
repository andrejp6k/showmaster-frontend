import React, { useState } from 'react';
import Button from '../../Button/Button';
import styles from './ActionButtonsInGuessYearQuestion.scss';
import { useSelector } from 'react-redux';
import { selectTeamToAnswerId } from '../../../../redux/gameSlice';
import { AddScorePointRequest, Question, QuestionType } from '../../../../types';
import TextQuestion from '../../Questions/TextQuestion/TextQuestion';
import PictureQuestion from '../../Questions/PictureQuestion/PictureQuestion';

enum ActionButtonType {
  ShowQuestion,
  ShowAnswers,
  ShowSolution,
}

interface ActionButtonsInGuessYearQuestionProps {
  isAnswered;
  activate;
}

const ActionButtonsInGuessYearQuestion: React.FC<ActionButtonsInGuessYearQuestionProps> = ({
  isAnswered,
  activate,
}) => {
  const teamToAnswerId = useSelector(selectTeamToAnswerId);
  const [actionButtonType, setActionButtonType] = useState<ActionButtonType>(ActionButtonType.ShowQuestion);

  function handleShowAnswers() {

  }

  function handleShowSolution() {

  }

  const actionButton = () => {
    switch (actionButtonType) {
      case ActionButtonType.ShowQuestion:
        return (
          <Button color="primary" onClick={activate()}>
            Show question
          </Button>
        );
      case ActionButtonType.ShowAnswers:
        return (
          <Button color="primary" onClick={handleShowAnswers}>
            Show answers
          </Button>
        );
      case ActionButtonType.ShowSolution:
        return (
          <Button color="primary" onClick={handleShowSolution}>
            Show solution
          </Button>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.actionButtons}>
      {actionButton()}
      {isAnswered && <h3>Point assigned!</h3>}
    </div>
  );
};

export default ActionButtonsInGuessYearQuestion;

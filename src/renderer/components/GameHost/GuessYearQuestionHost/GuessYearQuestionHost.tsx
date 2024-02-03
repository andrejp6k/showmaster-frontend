import React, { useState } from 'react';
import Button from '../../Button/Button';
import styles from './GuessYearQuestionHost.scss';
import { useSelector } from 'react-redux';
import { Question } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';
import { selectUser } from '../../../../redux/userSlice';

enum ActionButtonType {
  ShowQuestion,
  ShowAnswers,
  ShowSolution,
}

interface GuessYearQuestionHostProps {
  question: Question;
  handleNavigate: () => void;
}

const GuessYearQuestionHost: React.FC<GuessYearQuestionHostProps> = ({ question, handleNavigate }) => {
  const currentUser = useSelector(selectUser);

  const [actionButtonType, setActionButtonType] = useState<ActionButtonType>(ActionButtonType.ShowQuestion);

  function handleShowAnswers() {}

  function handleShowSolution() {}

  function handleShowQuestion() {
    // send event to server to activate question for teams.
    sendMessage('activateQuestion', question?.id, currentUser.id);
    setActionButtonType(ActionButtonType.ShowAnswers);
  }

  const actionButton = () => {
    switch (actionButtonType) {
      case ActionButtonType.ShowQuestion:
        return (
          <Button color="primary" onClick={handleShowQuestion}>
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
    </div>
  );
};

export default GuessYearQuestionHost;

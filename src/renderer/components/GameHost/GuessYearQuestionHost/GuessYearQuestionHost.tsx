import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './GuessYearQuestionHost.scss';
import { useSelector } from 'react-redux';
import { ActionButtonType, CalculateAndShowAnswersRequest, Question, User } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';
import { selectConnectedTeams, selectCurrentGameId, selectCurrentShowId, selectUser } from '../../../../redux/userSlice';
import classNames from 'classnames';
import { selectCurrentQuestion, selectGame } from '../../../../redux/gameSlice';
import { useAppSelector } from '../../../hooks/appStore';
import { selectShowGame } from '../../../../redux/showSlice';
import AnswersTracker from '../../../../services/answers-tracker';

interface GuessYearQuestionHostProps {
  question: Question;
}

const GuessYearQuestionHost: React.FC<GuessYearQuestionHostProps> = ({ question }) => {
  const currentUser = useSelector(selectUser);
  const currentShowId = useSelector(selectCurrentShowId);
  const currentGameId = useSelector(selectCurrentGameId);
  const connectedTeams = useSelector(selectConnectedTeams);
  const game = useSelector(selectGame);
  const { answeredTeamIds, teamAnswerResults } = useSelector(selectCurrentQuestion);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));

  const answersTracker = AnswersTracker.getInstance();

  const [actionButtonType, setActionButtonType] = useState<ActionButtonType>(ActionButtonType.ShowQuestion);
  const [showSolutionButtonDisabled, setShowSolutionButtonDisabled] = useState(false);

  useEffect(() => {
    setActionButtonType(ActionButtonType.ShowQuestion);
  }, [question]);

  function handleShowQuestion() {
    sendMessage('activateQuestion', question?.id, currentUser.id);
    setActionButtonType(ActionButtonType.ShowAnswers);
  }

  function handleShowAnswers() {
    setActionButtonType(ActionButtonType.ShowSolution);
    const updateRequest = {
      showId: currentShowId,
      gameId: currentGameId,
      questionId: question.id,
      hostId: currentUser.id,
      questionType: question.type
    } as CalculateAndShowAnswersRequest;

    sendMessage('CalculateAndShowAnswersQuestion', updateRequest);
  }

  function handleShowSolution() {
    sendMessage('TriggerShowSolutionForTeamsAction', currentUser.id);
    setShowSolutionButtonDisabled(true);
    answersTracker.markAsAnswered(question.id);
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
          <Button color="primary" onClick={handleShowAnswers} disabled={answeredTeamIds?.length < 2}>
            Show answers
          </Button>
        );
      case ActionButtonType.ShowSolution:
        return (
          <Button color="primary" onClick={handleShowSolution} disabled={showSolutionButtonDisabled}>
            Show solution
          </Button>
        );
      default:
        return <></>;
    }
  };

  const getIndicatorLabelText = (team: User) => {
    switch (actionButtonType) {
      case ActionButtonType.ShowQuestion:
        return 'Not submitted';
      case ActionButtonType.ShowAnswers:
        return answeredTeamIds?.includes(team.id) ? 'Submitted' : 'Not submitted';
      case ActionButtonType.ShowSolution:
        return teamAnswerResults.find((x) => x.teamId === team.id)?.value;
      default:
        return <></>;
    }
  };

  const getIndicatorStyle = (team: User) => {
    switch (actionButtonType) {
      case ActionButtonType.ShowQuestion:
        return;
      case ActionButtonType.ShowAnswers:
        return answeredTeamIds?.includes(team.id) ? styles.red : '';
      case ActionButtonType.ShowSolution:
        return teamAnswerResults.find((x) => x.teamId === team.id)?.correct ? styles.green : styles.red;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.guessYearQuestion}>
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={classNames(styles.score)}>{showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}</div>
            <span className={classNames(styles.buzzer, getIndicatorStyle(team))}></span>
            <span className={styles.buzzerLabel}>{getIndicatorLabelText(team)}</span>
          </div>
        ))}
      </div>
      <div className={styles.actionButtons}>{actionButton()}</div>
    </div>
  );
};

export default GuessYearQuestionHost;

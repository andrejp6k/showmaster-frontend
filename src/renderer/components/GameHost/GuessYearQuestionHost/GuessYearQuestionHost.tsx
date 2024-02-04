import React, { useState } from 'react';
import Button from '../../Button/Button';
import styles from './GuessYearQuestionHost.scss';
import { useSelector } from 'react-redux';
import { Question, User } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';
import { selectConnectedTeams, selectUser } from '../../../../redux/userSlice';
import classNames from 'classnames';
import { selectGame } from '../../../../redux/gameSlice';
import { useAppSelector } from '../../../hooks/appStore';
import { selectShowGame } from '../../../../redux/showSlice';

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
  const connectedTeams = useSelector(selectConnectedTeams);
  const game = useSelector(selectGame);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));

  const [actionButtonType, setActionButtonType] = useState<ActionButtonType>(ActionButtonType.ShowQuestion);
  const [showSolutionButtonDisabled, setShowSolutionButtonDisabled] = useState(false);

  function handleShowQuestion() {
    sendMessage('activateQuestion', question?.id, currentUser.id);
    setActionButtonType(ActionButtonType.ShowAnswers);
  }

  function handleShowAnswers() {
    setActionButtonType(ActionButtonType.ShowSolution)
    // sendMessage('ShowAnswersForTeamsInGuessYearGame', selectedYear, currentUser?.id);
    // TODO: create new WS event handler 'ShowAnswersForTeamsInGuessYearGame(currentUser.id)' on server (.net app)
    //  load on server all teams, send to teams new event ->
    //  Create new WS event handler 'SendAnswersToTeamsInGuessYearGame(Dictionary<teamName, year>)' on client (websocket slice)
    //  Handler should show answers of both teams in year bar on teams screen (Team1 1980, Team2 1992)
    //  Create new WS event handler 'SendAnswersToHostInGuessYearGame(updated Game object with new score)' on client (websocket slice)
    //  Handler should update score, indicators color and text (Won - green, Lost - red; Text - selected year by team)
  }

  function handleShowSolution() {
    // sendMessage('ShowSolutionForTeamsInGuessYearGame', selectedYear, currentUser?.id);
    // TODO: create new WS event handler 'ShowSolutionForTeamsInGuessYearGame(currentUser.id)' on server (.net app)
    //  load on server all teams, send to teams new event ->
    //  Create new WS event handler 'SendSolutionToTeamsInGuessYearGame(year)' on client (websocket slice)
    //  Handler should show solution in year bar on teams screen (Team1 1980, Solution 1989, Team2 1992)
    //  disable 'ShowSolution' button for host (only next question is clickable)
    setShowSolutionButtonDisabled(true);
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
        // TODO: make this button clickable only if both teams has submitted their answer
        //   to get this info new WS handler should be created, see 'handleSubmit' in GuessYearQuestionTeam.tsx
        return (
          <Button color="primary" onClick={handleShowAnswers}>
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
        return "Not submitted";
      case ActionButtonType.ShowAnswers:
        return "Submitted"; // TODO: return 'Submitted' text if Team clicked "Submit" button
                            // TODO: return 'Not submitted' text if Team not clicked "Submit" button
      case ActionButtonType.ShowSolution:
        return "Selected year"; // TODO: Show year which team selected
      default:
        return <></>;
    }
  }

  const getIndicatorStyle = (team: User) => {
    switch (actionButtonType) {
      case ActionButtonType.ShowQuestion:
        return;
      case ActionButtonType.ShowAnswers:
        return styles.red; // TODO: return 'styles.red' if Team clicked "Submit" button
                             // TODO: return '' (nothing) if Team not clicked "Submit" button
      case ActionButtonType.ShowSolution:
        return styles.green; // TODO: return 'styles.green' text if Team answered correct
                           // TODO: return 'styles.red' if Team answered wrong
      default:
        return <></>;
    }
  }

  return (
    <div className={styles.guessYearQuestion}>
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={classNames(styles.score)}>
              {showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}
            </div>
            <span
              className={classNames(
                styles.buzzer, getIndicatorStyle(team)
              )}
            ></span>
            <span className={styles.buzzerLabel}>{getIndicatorLabelText(team)}</span>
          </div>
        ))}
      </div>
      <div className={styles.actionButtons}>
        {actionButton()}
      </div>
    </div>
  );
};

export default GuessYearQuestionHost;

import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './BuzzerQuestionHost.scss';
import { useSelector } from 'react-redux';
import { selectGame, selectTeamToAnswerId, setTeamToAnswerId } from '../../../../redux/gameSlice';
import { AddScorePointRequest, Question, User } from '../../../../types';
import classNames from 'classnames';
import { selectConnectedTeams, selectUser } from '../../../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/appStore';
import { selectShow, selectShowGame, setTeamScores } from '../../../../redux/showSlice';
import { services } from '../../../../services';
import { sendMessage } from '../../../../redux/websocketSlice';
import AnswersTracker from '../../../../services/answers-tracker';
import Timer from '../../Timer/Timer';

interface ActionButtonsInBuzzerQuestionProps {
  question: Question;
  targetQuestionId: string;
}

const BuzzerQuestionHost: React.FC<ActionButtonsInBuzzerQuestionProps> = ({ question, targetQuestionId }) => {
  const currentUser = useSelector(selectUser);
  const show = useSelector(selectShow);
  const game = useSelector(selectGame);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const teamToAnswerId = useSelector(selectTeamToAnswerId);
  const connectedTeams = useSelector(selectConnectedTeams);

  const answersTracker = AnswersTracker.getInstance();
  const dispatch = useAppDispatch();

  const [currentScoringTeam, setCurrentScoringTeam] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(answersTracker.isAnswered(question.id));
  const [isQuestionActive, setIsQuestionActive] = useState(false);

  useEffect(() => {
    // set all values to default after question was changed
    dispatch(setTeamToAnswerId(null));
    setIsQuestionActive(false);
    deactivate();
    setIsAnswered(false);
    setCurrentScoringTeam(null);
  }, [targetQuestionId]);

  async function handleCorrectAnswer() {
    const correctAnswerRequest = {
      questionId: question.id,
      scoredByAnsweringCorrectly: true,
      teamUserId: teamToAnswerId,
    } as AddScorePointRequest;

    await answer(correctAnswerRequest);
  }

  async function handleWrongAnswer() {
    const wrongAnswerRequest = {
      questionId: question.id,
      scoredByAnsweringCorrectly: false,
      teamUserId: connectedTeams?.filter((x) => x.id !== teamToAnswerId)[0].id,
    } as AddScorePointRequest;

    await answer(wrongAnswerRequest);
  }

  async function answer(request: AddScorePointRequest) {
    try {
      if (!show || !showGame) {
        throw new Error('Show or showGame was undefined!');
      }

      const response = await services.shows.addScorePoint(show?.id, showGame?.gameId, request);
      if (response.data) {
        dispatch(setTeamScores({ gameId: showGame.gameId, teamScores: response.data }));
        answersTracker.markAsAnswered(question.id);
        setIsAnswered(true);
        setCurrentScoringTeam(request.teamUserId);
        sendMessage('TeamScored', request.teamUserId);
      }
    } catch (e) {
      // TODO: handle this
    }
  }

  function activate() {
    // send event to server to activate buzzers for teams.
    sendMessage('activateQuestion', question?.id, currentUser?.id);
    setIsQuestionActive(true);
  }

  function deactivate() {
    // send event to server to deactivate buzzers for teams
    sendMessage('deactivateQuestion', currentUser?.id);
    setIsQuestionActive(false);
    dispatch(setTeamToAnswerId(null));
  }

  function getBuzzerLabelText(team: User): string {
    if (isQuestionActive && !teamToAnswerId) {
      return 'Active';
    }
    if (teamToAnswerId === team.id) {
      return 'Your turn!';
    }
    return 'Inactive';
  }

  return (
    <div className={styles.buzzerPanel}>
      <Timer initialSeconds={showGame?.timeToAnswer || 7} isAnswered={isAnswered} />
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={classNames(styles.score, { [styles.scoring]: currentScoringTeam === team.id })}>
              {showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}
            </div>
            <span
              className={classNames(
                styles.buzzer,
                { [styles.active]: isQuestionActive && !teamToAnswerId },
                { [styles.activated]: teamToAnswerId === team.id },
              )}
            ></span>
            <span className={styles.buzzerLabel}>{getBuzzerLabelText(team)}</span>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default BuzzerQuestionHost;

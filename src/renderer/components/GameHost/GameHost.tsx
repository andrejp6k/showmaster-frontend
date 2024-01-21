import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectGame, selectTeamToAnswerId, setTeamToAnswerId } from '../../../redux/gameSlice';
import { selectShow, selectShowGame, setShow } from '../../../redux/showSlice';
import { setFinishGameDialogOpen } from '../../../redux/uiSlice';
import { selectConnectedTeams, selectUser } from '../../../redux/userSlice';
import { sendMessage } from '../../../redux/websocketSlice';
import { services } from '../../../services';
import QuestionNavigationService from '../../../services/question-navigation-service';
import { UpsertScorePointRequest, User } from '../../../types';
import { RouteDefinitions } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import styles from './GameHost.scss';

function GameHost() {
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const currentUser = useSelector(selectUser);
  const connectedTeams = useSelector(selectConnectedTeams);
  const params = useParams();
  const currentQuestionId = params.questionId!;
  const question = game?.questions.find((x) => x.id === currentQuestionId);
  const navigate = useNavigate();
  const teamToAnswearId = useSelector(selectTeamToAnswerId);
  const dispatch = useAppDispatch();

  const questionNavigationService = QuestionNavigationService.getInstance();

  const nextQuestionId = questionNavigationService.nextQuestion(currentQuestionId);
  const prevQuestionId = questionNavigationService.previousQuestion(currentQuestionId);

  const [isQuestionActive, setIsQuestionActive] = useState(false);

  useEffect(() => {
    if (showGame?.teamScores.some((x) => x.value >= showGame.scoreToWin) && !showGame.finished) {
      console.log('we have a winner!');
      dispatch(setFinishGameDialogOpen(true));
    }
  }, [show]);

  function activate() {
    // send event to server to activate buzzers for teams.
    //    Use selectUser to get id and send it to server to all teams by same studio
    sendMessage('activateQuestion', question?.id, currentUser?.id);
    setIsQuestionActive(true);
  }

  function deactivate() {
    // send event to server to deactivate buzzers for teams
    sendMessage('deactivateQuestion', currentUser?.id);
    setIsQuestionActive(false);
    dispatch(setTeamToAnswerId(null));
  }

  async function handleCorrectAnswer() {
    const correctAnswerRequest = {
      showId: show?.id,
      gameId: showGame?.gameId,
      questionId: currentQuestionId,
      scoredByAnsweringCorrectly: true,
      teamUserId: teamToAnswearId,
    } as UpsertScorePointRequest;

    await answer(correctAnswerRequest);
  }

  async function handleWrongAnswer() {
    const wrongAnswerRequest = {
      showId: show?.id,
      gameId: showGame?.gameId,
      questionId: currentQuestionId,
      scoredByAnsweringCorrectly: false,
      teamUserId: connectedTeams?.filter((x) => x.id !== teamToAnswearId)[0].id,
    } as UpsertScorePointRequest;

    await answer(wrongAnswerRequest);
  }

  async function answer(request: UpsertScorePointRequest) {
    try {
      const response = await services.shows.upsertScorePoint(request);
      if (response.data) {
        dispatch(setShow(response.data));
        questionNavigationService.markAsAnswered(currentQuestionId);
        if (nextQuestionId) {
          handleNavigate(nextQuestionId);
        } else if (prevQuestionId) {
          handleNavigate(prevQuestionId);
        } else {
          handleNavigate('undefined');
        }
      }
    } catch (e) {}
  }

  function handleNavigate(targetQuestionId: string | null) {
    if (targetQuestionId) {
      navigate(RouteDefinitions.GameHost.enterParams(targetQuestionId), { replace: true });
      dispatch(setTeamToAnswerId(null));
      setIsQuestionActive(false);
      deactivate();
    }
  }

  function getBuzzerLabelText(team: User): string {
    if (isQuestionActive && !teamToAnswearId) {
      return 'Active';
    }
    if (teamToAnswearId === team.id) {
      return 'Your turn!';
    }
    return 'Inactive';
  }

  return (
    <div className={styles.buzzQuiz}>
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={styles.score}>{showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}</div>
            <span
              className={classNames(
                styles.buzzer,
                { [styles.active]: isQuestionActive && !teamToAnswearId },
                { [styles.activated]: teamToAnswearId === team.id },
              )}
            ></span>
            <span className={styles.buzzerLabel}>{getBuzzerLabelText(team)}</span>
          </div>
        ))}
      </div>
      <div className={styles.actionButtons}>
        {!teamToAnswearId && (
          <button
            className={classNames(styles.button, { [styles.disabled]: !question })}
            type="button"
            onClick={() => (isQuestionActive ? deactivate() : activate())}
            disabled={!question}
          >
            {isQuestionActive ? 'Deactivate' : 'Activate'}
          </button>
        )}
        {teamToAnswearId && (
          <>
            <button className={styles.button} onClick={handleCorrectAnswer}>
              Correct answer
            </button>
            <button className={styles.button} onClick={handleWrongAnswer}>
              Wrong answer
            </button>
          </>
        )}
      </div>
      <div className={styles.questionSection}>
        {question ? (
          <>
            <span>{question?.questionTitle}</span>
            <div className={styles.question}>Q: {question?.questionText}</div>
            <span>
              <b>A:</b> {question?.correctAnswer}
            </span>
            <span>
              <b>Hint:</b> {question?.info}
            </span>
          </>
        ) : (
          <h3>There is no more questions.</h3>
        )}
      </div>
      <div className={styles.navigation}>
        <button
          onClick={() => handleNavigate(prevQuestionId)}
          className={classNames(styles.navButton, {
            [styles.hidden]: !prevQuestionId,
          })}
        >
          Previous question
        </button>
        {nextQuestionId && (
          <button className={styles.navButton} onClick={() => handleNavigate(nextQuestionId)}>
            Next question
          </button>
        )}
      </div>
      <div className={styles.footer}>
        <button
          onClick={() => {
            dispatch(setFinishGameDialogOpen(true));
          }}
        >
          Finish game
        </button>
      </div>
    </div>
  );
}

export default GameHost;

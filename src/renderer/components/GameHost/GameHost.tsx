import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectGame, selectQuestionsCount } from '../../../redux/gameSlice';
import { selectShowGame } from '../../../redux/showSlice';
import { selectConnectedTeams, selectUser } from '../../../redux/userSlice';
import { sendMessage } from '../../../redux/websocketSlice';
import { RouteDefinitions } from '../../App';
import { useAppSelector } from '../../hooks/appStore';
import styles from './GameHost.scss';

function GameHost() {
  const game = useSelector(selectGame);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const currentUser = useSelector(selectUser);
  const connectedTeams = useSelector(selectConnectedTeams);
  const params = useParams();
  const questionIndex = parseInt(params.questionIndex || '0');
  const questionsCount = useSelector(selectQuestionsCount);
  const question = game?.questions[questionIndex];
  const navigate = useNavigate();

  const [isQuestionActive, setIsQuestionActive] = useState(false);

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
  }

  function answer(correct: boolean, questionId: string) {
    // send event to server with: showId, gameId, teamId, correct -> update score
    // mutate game state, find question by questionId and mark it as finished,
    //    rerender of next question should happens automatically because of state 'question'
  }

  function handleNavigate(index: number) {
    if (index >= 0 && index < questionsCount) {
      navigate(RouteDefinitions.GameHost.enterParams(index), { replace: true });
      setIsQuestionActive(false);
      deactivate();
    }
  }

  return (
    <div className={styles.buzzQuiz}>
      <div className={styles.scoreBoard}>
        {connectedTeams?.map((team) => (
          <div key={team.id.toString()} className={styles.team}>
            <h2>{team.name}</h2>
            <div className={styles.score}>{showGame?.teamScores?.find((x) => x.userId === team.id)?.value || 0}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex',
          justifyContent: 'center',
        }}
      >
        <button className={styles.activateButton} type="button" onClick={() => (isQuestionActive ? deactivate() : activate())}>
          {isQuestionActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>
      <div className={styles.questionSection}>
        <span>{question?.questionTitle}</span>
        <div className={styles.question}>Q: {question?.questionText}</div>
        <span>
          <b>A:</b> {question?.correctAnswer}
        </span>
        <span>
          <b>Hint:</b> {question?.info}
        </span>
      </div>
      <footer className={styles.navigation}>
        <button
          onClick={() => handleNavigate(questionIndex - 1)}
          className={classNames(styles.navButton, {
            [styles.hidden]: questionIndex === 0,
          })}
        >
          Previous question
        </button>
        {questionIndex < questionsCount - 1 ? (
          <button className={styles.navButton} onClick={() => handleNavigate(questionIndex + 1)}>
            Next question
          </button>
        ) : (
          <button className={styles.navButton}>Finish game</button>
        )}
      </footer>
    </div>
  );
}

export default GameHost;

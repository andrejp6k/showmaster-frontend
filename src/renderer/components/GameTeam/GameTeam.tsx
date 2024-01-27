import { useSelector } from 'react-redux';
import { selectCurrentQuestion, selectTeamScoredId } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { selectUser } from '../../../redux/userSlice';
import Timer from '../Timer/Timer';

function GameTeam() {
  const { question, questionPickedByTeam, teamShouldAnswerQuestion } = useSelector(selectCurrentQuestion);
  const currentUser = useSelector(selectUser);
  const teamScoredId = useSelector(selectTeamScoredId);
  const didIScore = teamScoredId === currentUser?.id;
  const didOpponentScore = teamScoredId !== null && !didIScore;

  function handleBuzzerClick() {
    sendMessage('buzzerClicked', currentUser?.id);
  }

  return (
    <div className={styles.container}>
      {/* TODO: we will display different UI based on question type property */}
      {didIScore && <h3>You score!</h3>}
      {didOpponentScore && <h3>Opponent scores!</h3>}

      {!teamScoredId && (
        <>
          <div className={styles.header}>{question && <span>{question.questionTitle}</span>}</div>
          <div className={styles.content}>
            {questionPickedByTeam && teamShouldAnswerQuestion && (
              <div>
                <div>You clicked a buzzer, answer the question now!</div>
                {/*
              TODO: we can not access "showGame" as architecture of slices built wrong.
              We need to refactor slices and make "showGame" accessible for both roles.
              For now we use hardcoded value, as there is no other solution.
              Host and Teams should access same Object when playing the game - showGame.
              Keeping game slice and game in frontend level is not needed.
              Just update showGame with questions when PlayGameTeam and PlayGameHost event called.
              PlayGameTeam and PlayGameHost can be merged to one event.
            */}
                <Timer initialSeconds={7} isAnswered={!!teamScoredId}></Timer>
              </div>
            )}
            {questionPickedByTeam && !teamShouldAnswerQuestion && <div>Opponent buzzered first!</div>}
            {question ? <span></span> : <span> Get ready for the question ...</span>}
          </div>
          <div className={styles.footer}>
            {question && !questionPickedByTeam && (
              <button onClick={handleBuzzerClick} className={styles.buzzer}>
                Hit me to answer!
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default GameTeam;

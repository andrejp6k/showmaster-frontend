import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { selectUser } from '../../../redux/userSlice';

function GameTeam() {
  const { question, questionPickedByTeam, teamShouldAnswerQuestion } = useSelector(selectCurrentQuestion);
  const currentUser = useSelector(selectUser);

  function handleBuzzerClick() {
    sendMessage('buzzerClicked', currentUser?.id);
  }

  return (
    <div className={styles.container}>
      {/* TODO: we will display different UI based on question type property */}

      <div className={styles.header}>{question && <span>{question.questionTitle}</span>}</div>
      <div className={styles.content}>
        {questionPickedByTeam && teamShouldAnswerQuestion && <div>You clicked a buzzer, answer the question now!</div>}
        {questionPickedByTeam && !teamShouldAnswerQuestion && <div>Opponent buzzered first!</div>}
        {question ? <span>{question.question}</span> : <span> Get ready for the question ...</span>}
      </div>
      <div className={styles.footer}>
        {question && !questionPickedByTeam && (
          <button onClick={handleBuzzerClick} className={styles.buzzer}>
            Hit me to answer!
          </button>
        )}
      </div>
    </div>
  );
}

export default GameTeam;

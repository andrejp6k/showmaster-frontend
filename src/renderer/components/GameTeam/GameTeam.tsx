import { useSelector } from 'react-redux';
import { selectCurrentActiveQuestion } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { selectIsAnswering, selectUser } from '../../../redux/userSlice';

function GameTeam() {
  const currentActiveQuestion = useSelector(selectCurrentActiveQuestion);
  const currentUser = useSelector(selectUser);
  const isAnswering = useSelector(selectIsAnswering);

  function handleBuzzerClick() {
    sendMessage('buzzerClicked', currentUser?.id);
  }

  return (
    <div className={styles.container}>
      {/* TODO: we will display different UI based on question type property */}

      <div className={styles.header}>
        {currentActiveQuestion && (
          <span>{currentActiveQuestion.questionTitle}</span>
        )}
      </div>
      <div className={styles.content}>
        {isAnswering != null && isAnswering && (
          <div>You clicked a buzzer, answer the question now!</div>
        )}
        {isAnswering != null && !isAnswering && (
          <div>Opponent buzzered first!</div>
        )}
        {currentActiveQuestion ? (
          <span>{currentActiveQuestion.questionText}</span>
        ) : (
          <span> Get ready for the question ...</span>
        )}
      </div>
      <div className={styles.footer}>
        {currentActiveQuestion && isAnswering == null && (
          <button onClick={handleBuzzerClick} className={styles.buzzer}>
            Hit me to answer!
          </button>
        )}
      </div>
    </div>
  );
}

export default GameTeam;

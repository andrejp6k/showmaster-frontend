import { useSelector } from 'react-redux';
import { selectCurrentActiveQuestion } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';

function GameTeam() {
  const currentActiveQuestion = useSelector(selectCurrentActiveQuestion);

  return (
    <div className={styles.container}>
      {/* TODO: we will display different UI based on question type property */}

      <div className={styles.header}>
        {currentActiveQuestion && (
          <span>{currentActiveQuestion.questionTitle}</span>
        )}
      </div>
      <div className={styles.content}>
        {currentActiveQuestion ? (
          <span>{currentActiveQuestion.questionText}</span>
        ) : (
          <span> Get ready for the question ...</span>
        )}
      </div>
      <div className={styles.footer}>
        {currentActiveQuestion && (
          <button className={styles.buzzer}>Hit me to answer!</button>
        )}
      </div>
    </div>
  );
}

export default GameTeam;

import styles from './TextBuzzer.scss';
import Timer from '../../Timer/Timer';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion, selectTeamScoredId } from '../../../../redux/gameSlice';
import { sendMessage } from '../../../../redux/websocketSlice';
import { selectUser } from '../../../../redux/userSlice';
import { QuestionType } from '../../../../types';

function TextBuzzer() {
  const { question, questionPickedByTeam, teamShouldAnswerQuestion } = useSelector(selectCurrentQuestion);
  const teamScoredId = useSelector(selectTeamScoredId);
  const currentUser = useSelector(selectUser);

  function handleBuzzerClick() {
    sendMessage('buzzerClicked', currentUser?.id);
  }

  return(
    <div className={styles.container}>
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
        {!questionPickedByTeam && question && question.type === QuestionType.PictureBuzzer && (
          <div className={styles.questionContent}>
            <span>{question.questionText}</span>
            <img src={question.imageUrl!}></img>
          </div>
        )}
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

export default TextBuzzer;

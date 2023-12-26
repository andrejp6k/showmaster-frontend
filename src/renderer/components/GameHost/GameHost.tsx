import styles from './GameHost.scss';
import { useSelector } from 'react-redux';
import { selectGame } from '../../../redux/gameSlice';
import { Game, Question, Studio } from '../../../types';
import { useState } from 'react';

function GameHost() {
  const game: Game = useSelector(selectGame);

  const activeQuestion = game.questions.find((question: Question) => question.finished === false);
  const [question, setQuestion] = useState<Question | undefined>(activeQuestion);

  function activate() {
    // send event to server to activate buzzers for teams.
    //    Use selectUser to get id and send it to server to all teams by same studio
    console.log("send event to server to activate team buzzers")
  }

  function deactivate(id: string) {
    // send event to server to deactivate buzzers for teams
  }

  function answer(correct: boolean, questionId: string) {
    // send event to server with: showId, gameId, teamId, correct -> update score
    // mutate game state, find question by questionId and mark it as finished,
    //    rerender of next question should happens automatically because of state 'question'
  }

  return (
    <div className={styles.buzzQuiz}>
      <div className={styles.scoreBoard}>
        <div className={styles.team}>
          <h2>Test Team Blue</h2>
          <div className={styles.score}>2</div>
        </div>
        <div className={styles.team}>
          <h2>Test Team Red</h2>
          <div className={styles.score}>1</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex',
          justifyContent: 'center'
        }}
      >
        <button
          className={styles.activateButton}
          type="button"
          onClick={() => activate()}
        >
          Activate
        </button>
      </div>
      <div className={styles.questionSection}>
        <div className={styles.question}>
          Q:  {question?.questionText}
        </div>
        <div className={styles.answer}>
          <b>A:</b> {question?.answer}
        </div>
        <div className={styles.hint}>
          <b>Hint:</b> {question?.hint}
        </div>
      </div>
      <footer className={styles.navigation}>
        <button className={styles.navButton}>Previous question</button>
        <button className={styles.navButton}>Next question</button>
      </footer>
    </div>
  );
}

export default GameHost;

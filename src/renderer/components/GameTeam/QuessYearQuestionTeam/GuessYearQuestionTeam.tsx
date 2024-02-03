import styles from './GuessYearQuestionTeam.scss';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion, selectTeamScoredId } from '../../../../redux/gameSlice';

import Button from '../../Button/Button';
import React from 'react';

function GuessYearQuestionTeam() {
  const { question } = useSelector(selectCurrentQuestion);

  function handleSubmit() {
    // sendMessage('', currentUser?.id, selectedYear);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>{question && <span>{question.questionTitle}</span>}</div>
      <div className={styles.content}>
        <div className={`${styles.questionContent} ${question ? styles.displayContent : ''}`}>
          <span>{question.questionText}</span>
          <img src={question.imageUrl!}></img>
        </div>
      </div>
      <div className={styles.footer}>
        {question && (
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default GuessYearQuestionTeam;

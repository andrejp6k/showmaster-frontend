import styles from './GuessYearQuestionTeam.scss';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from '../../../../redux/gameSlice';

import Button from '../../Button/Button';
import React, { useState } from 'react';
import { Slider } from '@mui/material';
import { selectCurrentGameId, selectCurrentShowId, selectUser } from '../../../../redux/userSlice';
import { SaveTeamAnswerRequest } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';

function GuessYearQuestionTeam() {
  const { question } = useSelector(selectCurrentQuestion);
  const currentShowId = useSelector(selectCurrentShowId);
  const currentGameId = useSelector(selectCurrentGameId);
  const currentUser = useSelector(selectUser);

  const [winningScore, setWinningScore] = useState(1950);

  function handleWinningScoreChange(event: any) {
    setWinningScore(event.target.value);
  }

  function handleSubmit() {
    const saveTeamAnswerRequest = {
      questionId: question.id,
      teamId: currentUser.id,
      value: winningScore.toString(),
    } as SaveTeamAnswerRequest;

    sendMessage('SaveSelectedTeamAnswer', currentShowId, currentGameId, saveTeamAnswerRequest);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{question.questionTitle}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.questionContent}>
          <span>{question.questionText}</span>
          <img src={question.imageUrl!}></img>
          <span>Select the year</span>
        </div>
        <span className={styles.values}>
          <span className={styles.value}>{winningScore}</span>
          <Slider
            onChange={handleWinningScoreChange}
            value={winningScore}
            aria-label="Winning score"
            valueLabelDisplay="off"
            step={1}
            marks
            min={1900}
            max={2024}
          />
        </span>
      </div>
      <div className={styles.footer}>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default GuessYearQuestionTeam;

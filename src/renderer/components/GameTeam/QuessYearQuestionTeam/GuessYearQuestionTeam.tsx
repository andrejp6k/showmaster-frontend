import styles from './GuessYearQuestionTeam.scss';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from '../../../../redux/gameSlice';

import Button from '../../Button/Button';
import React, { useState } from 'react';
import { Slider } from '@mui/material';
import { selectCurrentGameId, selectCurrentShowId, selectUser } from '../../../../redux/userSlice';
import { SaveTeamAnswerRequest } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';
import MultiSliderView from '../../MultiSliderView/MultiSliderView';

function GuessYearQuestionTeam() {
  const { question, teamAnswerResults, showSolution } = useSelector(selectCurrentQuestion);
  const currentShowId = useSelector(selectCurrentShowId);
  const currentGameId = useSelector(selectCurrentGameId);
  const currentUser = useSelector(selectUser);

  const [winningScore, setWinningScore] = useState(1950);
  const [submitted, setSubmitted] = useState(false);

  const minimalYear = 1900;
  const maximalYear = 2024;

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
    setSubmitted(true);
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
          {!submitted ? <span>Select the year</span> : <span></span>}
          {showSolution && <span>Winner: {teamAnswerResults?.find((x) => x.correct)?.teamName}</span>}
        </div>
        {teamAnswerResults?.length ? (
          <MultiSliderView
            min={minimalYear}
            max={maximalYear}
            teamValues={teamAnswerResults}
            correctValue={showSolution ? parseInt(question.correctAnswer, 10) : undefined}
          />
        ) : (
          <span className={styles.yearSelector}>
            <span className={styles.value}>{winningScore}</span>
            <Slider
              onChange={handleWinningScoreChange}
              value={winningScore}
              aria-label="Winning score"
              valueLabelDisplay="off"
              step={1}
              marks
              min={minimalYear}
              max={maximalYear}
            />
          </span>
        )}
      </div>
      <div className={styles.footer}>
        {!submitted && (
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default GuessYearQuestionTeam;

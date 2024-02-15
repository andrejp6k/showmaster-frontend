import styles from './TwoOptionsQuestionTeam.scss';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from '../../../../redux/gameSlice';

import Button from '../../Button/Button';
import React, { useState } from 'react';
import { selectCurrentGameId, selectCurrentShowId, selectUser } from '../../../../redux/userSlice';
import { SaveTeamAnswerRequest } from '../../../../types';
import { sendMessage } from '../../../../redux/websocketSlice';

function TwoOptionsQuestionTeam() {
  const { question, teamAnswerResults } = useSelector(selectCurrentQuestion);
  const currentShowId = useSelector(selectCurrentShowId);
  const currentGameId = useSelector(selectCurrentGameId);
  const currentUser = useSelector(selectUser);

  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState('');

  function handleSubmit(answer: string) {
    const saveTeamAnswerRequest = {
      questionId: question.id,
      teamId: currentUser.id,
      value: answer,
    } as SaveTeamAnswerRequest;

    sendMessage('SaveSelectedTeamAnswer', currentShowId, currentGameId, saveTeamAnswerRequest);
    setSubmitted(true);
    setAnswer(answer);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{question.questionTitle}</span>
      </div>
      <div className={styles.content}>
        {teamAnswerResults?.length ? (
          <>
            {teamAnswerResults?.length && <span>You answered {teamAnswerResults.find((x) => x.teamId == currentUser.id)?.correct ? 'correct' : 'wrong'}!</span>}
          </>
        ) : (
          <div className={styles.questionContent}>
            <span>{question.questionText}</span>
            <img src={question.imageUrl!}></img>
            {submitted && <span>You answered: {answer}</span>}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        {!submitted && (
          <div className={styles.answerOptions}>
            <Button color="primary" onClick={() => handleSubmit(question.answerOptions[0])}>
              {question.answerOptions[0]}
            </Button>
            <Button color="primary" onClick={() => handleSubmit(question.answerOptions[1])}>
              {question.answerOptions[1]}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoOptionsQuestionTeam;

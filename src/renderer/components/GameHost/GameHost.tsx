import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetAnsweredTeamIds, selectGame } from '../../../redux/gameSlice';
import { selectShow, selectShowGame } from '../../../redux/showSlice';
import { setFinishGameDialogOpen } from '../../../redux/uiSlice';
import AnswersTracker from '../../../services/answers-tracker';
import { QuestionType } from '../../../types';
import { RouteDefinitions } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import styles from './GameHost.scss';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import Button from '../Button/Button';
import BuzzerQuestionHost from './BuzzerQuestionHost/BuzzerQuestionHost';
import GuessYearQuestionHost from './GuessYearQuestionHost/GuessYearQuestionHost';

function GameHost() {
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const params = useParams();
  const currentQuestionId = params.questionId!;
  const question = game?.questions.find((x) => x.id === currentQuestionId);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const answersTracker = AnswersTracker.getInstance();

  const nextQuestionId = answersTracker.nextQuestion(currentQuestionId);
  const prevQuestionId = answersTracker.previousQuestion(currentQuestionId);

  const [targetQuestionId, setTargetQuestionId] = useState<string>(currentQuestionId);

  useEffect(() => {
    dispatch(resetAnsweredTeamIds());
  }, [question]);

  useEffect(() => {
    if (showGame?.teamScores.some((x) => x.value >= showGame.scoreToWin) && !showGame.finished) {
      dispatch(setFinishGameDialogOpen(true));
    }
  }, [show]);

  const actionButtons = () => {
    switch (question?.type) {
      case QuestionType.TextBuzzer:
      case QuestionType.PictureBuzzer:
        return (
          <BuzzerQuestionHost
            question={question}
            targetQuestionId={targetQuestionId}
          />
        );
      case QuestionType.GuessYear:
        return (
          <GuessYearQuestionHost
            question={question}
            targetQuestionId={targetQuestionId}
          />
        );
      case QuestionType.TwoAnswers:
        return <></>; // TwoAnswersQuestionHost
      default:
        return <span>Get ready for the question ...</span>;
    }
  };

  function handleNavigate(targetQuestionId: string | null) {
    if (targetQuestionId) {
      setTargetQuestionId(targetQuestionId);
      navigate(RouteDefinitions.GameHost.enterParams(targetQuestionId), { replace: true });
    }
  }

  return (
    <div className={styles.buzzQuiz}>
      {actionButtons()}
      <div className={styles.questionSection}>
        {question && (
          <>
            <div className={styles.questionContent}>
              <span>{question?.questionTitle}</span>
              <div className={styles.question}>Q: {question?.questionText}</div>
              <span>
                <b>A:</b> {question?.correctAnswer}
              </span>
              <span>
                <b>Hint:</b> {question?.info}
              </span>
            </div>
            <div className={styles.questionImage}>
              <img src={question.imageUrl!}></img>
            </div>
          </>
        )}
      </div>
      <div className={styles.navigation}>
        <Button onClick={() => handleNavigate(prevQuestionId)} hidden={!prevQuestionId} size="small" sx={{ paddingRight: '15px' }}>
          <>
            <ArrowLeftOutlined sx={{ fontSize: 40 }} />
            <span>Previous question</span>
          </>
        </Button>
        {nextQuestionId && (
          <Button onClick={() => handleNavigate(nextQuestionId)} size="small" sx={{ paddingLeft: '15px' }}>
            <>
              <span>Next question</span>
              <ArrowRightOutlined sx={{ fontSize: 40 }} />
            </>
          </Button>
        )}
      </div>
      <div className={styles.footer}>
        <Button
          color="secondary"
          onClick={() => {
            dispatch(setFinishGameDialogOpen(true));
          }}
          sx={{ width: '160px' }}
        >
          Finish game
        </Button>
      </div>
    </div>
  );
}

export default GameHost;

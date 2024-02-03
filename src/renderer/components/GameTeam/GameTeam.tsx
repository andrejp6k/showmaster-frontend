import { useSelector } from 'react-redux';
import { selectCurrentQuestion, selectTeamScoredId } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';
import { selectUser } from '../../../redux/userSlice';
import { QuestionType } from '../../../types';
import GuessYearQuestionTeam from './QuessYearQuestionTeam/GuessYearQuestionTeam';
import PictureBuzzerQuestionTeam from './PictureBuzzerQuestionTeam/PictureBuzzerQuestionTeam';
import TextBuzzerQuestionTeam from './TextBuzzerQuestionTeam/TextBuzzerQuestionTeam';

function GameTeam() {
  const { question } = useSelector(selectCurrentQuestion);
  const currentUser = useSelector(selectUser);
  const teamScoredId = useSelector(selectTeamScoredId);
  const didIScore = teamScoredId === currentUser?.id;
  const didOpponentScore = teamScoredId !== null && !didIScore;

  const questionContent = () => {
    switch (question?.type) {
      case QuestionType.TextBuzzer:
        return <TextBuzzerQuestionTeam />;
      case QuestionType.PictureBuzzer:
        return <PictureBuzzerQuestionTeam />
      case QuestionType.GuessYear:
        return <GuessYearQuestionTeam />
      case QuestionType.TwoAnswers:
        return <></>; // TwoAnswersQuestionTeam
      default:
        return <span>Get ready for the question ...</span>;
    }
  };

    return (
      <div className={styles.container}>
        {didIScore && <h3>You score!</h3>}
        {didOpponentScore && <h3>Opponent scores!</h3>}
        {!teamScoredId && questionContent()}
      </div>
    );
}
export default GameTeam;

import { useSelector } from 'react-redux';
import { selectCurrentQuestion, selectTeamScoredId } from '../../../redux/gameSlice';
import styles from './GameTeam.scss';
import { selectUser } from '../../../redux/userSlice';
import { QuestionType } from '../../../types';
import TextQuestion from '../Questions/TextQuestion/TextQuestion';
import PictureQuestion from '../Questions/PictureQuestion/PictureQuestion';
import GuessYearQuestion from '../Questions/QuessYearQuestion/GuessYearQuestion';

function GameTeam() {
  const { question } = useSelector(selectCurrentQuestion);
  const currentUser = useSelector(selectUser);
  const teamScoredId = useSelector(selectTeamScoredId);
  const didIScore = teamScoredId === currentUser?.id;
  const didOpponentScore = teamScoredId !== null && !didIScore;

  console.log(question, 'question')
  const questionContent = () => {
    switch (question?.type) {
      case QuestionType.TextBuzzer:
        return <TextQuestion />;
      case QuestionType.PictureBuzzer:
        return <PictureQuestion />
      case QuestionType.GuessYear:
        return <GuessYearQuestion />
      case QuestionType.TwoAnswers:
        return <></>; // TwoOptionsQuestion
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

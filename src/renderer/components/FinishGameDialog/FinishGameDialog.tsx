import { Dialog } from '@mui/material';
import { selectFinishGameDialogOpen, setFinishGameDialogOpen } from '../../../redux/uiSlice';
import { useSelector } from 'react-redux';
import styles from './FinishGameDialog.scss';
import { selectGame } from '../../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import { selectShow, selectShowGame, setShow } from '../../../redux/showSlice';
import { useNavigate } from 'react-router-dom';
import { UpdateShowGameRequest } from '../../../types';
import { services } from '../../../services';
import { RouteDefinitions } from '../../App';
import classNames from 'classnames';
import { selectUser } from '../../../redux/userSlice';
import { sendMessage } from '../../../redux/websocketSlice';

function FinishGameDialog() {
  const isOpen = useSelector(selectFinishGameDialogOpen);
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);

  const isTargetScoreToWinReached = showGame?.teamScores?.some((x) => x.value >= showGame.scoreToWin);
  const isDraw = showGame?.teamScores?.every((x) => x.value === showGame?.teamScores[0].value);

  function handleCancelClick() {
    dispatch(setFinishGameDialogOpen(false));
  }

  async function handleFinishGame() {
    const updateRequest = {
      showId: show?.id!,
      gameId: showGame?.gameId!,
      finished: true,
    } as UpdateShowGameRequest;

    try {
      const response = await services.shows.updateShowGame(updateRequest);
      if (response.data) {
        console.log('finished', response.data);
        dispatch(setShow(response.data));
        sendMessage('FinishGame', currentUser?.studioId);
      }
    } catch (error) {}

    dispatch(setFinishGameDialogOpen(false));
    navigate(RouteDefinitions.GameFinished, { replace: true });
  }

  return (
    <Dialog open={isOpen}>
      <div className={styles.container}>
        <h3>Finish game?</h3>

        <div className={styles.content}>
          {isTargetScoreToWinReached && <div>Winning score has been reached!</div>}
          {!isTargetScoreToWinReached && <div>Do you want to finish game before reaching target score of {showGame?.scoreToWin}?</div>}
          {isDraw && <div className={styles.danger}>There is a draw! Please, make sure one team has higher score than other before finishing a game. </div>}
        </div>

        <div className={styles.footer}>
          <button onClick={handleCancelClick} className={styles.button}>
            {isDraw ? 'Ok' : 'Cancel'}
          </button>

          {!isDraw && (
            <button className={classNames(styles.button, styles.primary)} onClick={handleFinishGame}>
              Finish game
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default FinishGameDialog;

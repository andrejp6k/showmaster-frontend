import { Dialog } from '@mui/material';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectGame } from '../../../redux/gameSlice';
import { selectShow, selectShowGame, setShow } from '../../../redux/showSlice';
import { selectFinishGameDialogOpen, setFinishGameDialogOpen } from '../../../redux/uiSlice';
import { sendMessage } from '../../../redux/websocketSlice';
import { services } from '../../../services';
import { UpdateShowGameRequest } from '../../../types';
import { RouteDefinitions } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import styles from './FinishGameDialog.scss';

function FinishGameDialog() {
  const isOpen = useSelector(selectFinishGameDialogOpen);
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const winnerScore = showGame?.teamScores.reduce((max, current) => {
    return Math.max(max, current.value);
  }, -Infinity);

  const winnerTeam = showGame?.teamScores.find((x) => x.value === winnerScore);

  const isTargetScoreToWinReached = showGame?.teamScores?.some((x) => x.value >= showGame.scoreToWin);
  const isDraw = showGame?.teamScores?.every((x) => x.value === showGame?.teamScores[0].value);

  function handleCancelClick() {
    dispatch(setFinishGameDialogOpen(false));
  }

  async function handleFinishGame() {
    const updateRequest = { finished: true } as UpdateShowGameRequest;

    try {
      const response = await services.shows.updateShowGame(show?.id!, showGame?.gameId!, updateRequest);
      if (response.data) {
        dispatch(setShow(response.data));
        sendMessage('FinishGame', winnerTeam?.userId);
      }
    } catch (error) {
      // TODO: handle this
    }

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

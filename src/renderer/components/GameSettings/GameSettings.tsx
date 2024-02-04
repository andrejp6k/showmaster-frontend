import { Slider } from '@mui/material';
import styles from './GameSettings.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import { selectShow, selectShowGame, setShowGame } from '../../../redux/showSlice';
import { useNavigate } from 'react-router-dom';
import { services } from '../../../services';
import { UpdateShowGameRequest } from '../../../types';
import Button from '../Button/Button';

const DEFAULT_MAX_SCORE_TO_WIN = 30;

function GameSettings() {
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const [winningScore, setWinningScore] = useState(showGame?.scoreToWin || 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleWinningScoreChange(event: any) {
    setWinningScore(event.target.value);
  }

  async function handleSaveClick(): Promise<void> {
    const updateRequest = { scoreToWin: winningScore } as UpdateShowGameRequest;

    try {
      const response = await services.shows.updateShowGame(show?.id!, showGame?.gameId!, updateRequest);
      dispatch(setShowGame(response.data));
      navigate(-1);
    } catch (error) {
      // TODO: handle this
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game settings</h1>
      <div className={styles.content}>
        <span className={styles.setting}>
          <span className={styles.label}>Winning score</span>
          <span className={styles.values}>
            <span className={styles.value}>{winningScore}</span>
            <Slider
              onChange={handleWinningScoreChange}
              value={winningScore}
              aria-label="Winning score"
              valueLabelDisplay="off"
              step={1}
              marks
              min={1}
              max={Math.min(DEFAULT_MAX_SCORE_TO_WIN, game?.questions?.length || DEFAULT_MAX_SCORE_TO_WIN)}
            />
          </span>
        </span>
      </div>
      <div className={styles.footer}>
        <Button className={styles.submit} onClick={handleSaveClick}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default GameSettings;

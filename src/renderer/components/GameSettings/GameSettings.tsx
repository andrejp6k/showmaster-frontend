import { Slider } from '@mui/material';
import styles from './GameSettings.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appStore';
import { selectShow, selectShowGame, setShowGame, setTeamScores } from '../../../redux/showSlice';
import { useNavigate } from 'react-router-dom';
import { services } from '../../../services';
import { Score, UpdateShowGameRequest } from '../../../types';
import Button from '../Button/Button';
import TeamScore from './TeamScore/TeamScore';
import { setShowSnackbar } from '../../../redux/uiSlice';

const DEFAULT_MAX_SCORE_TO_WIN = 30;

function GameSettings() {
  const game = useSelector(selectGame);
  const show = useSelector(selectShow);
  const showGame = useAppSelector((state) => selectShowGame(state, game?.id));
  const [winningScore, setWinningScore] = useState(showGame?.scoreToWin || 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [teamScoresSettings, setTeamScoresSettings] = React.useState<Score[]>([
    { userId: showGame?.teamScores[0]?.userId || '', value: showGame?.teamScores[0]?.value || 0 },
    { userId: showGame?.teamScores[1]?.userId || '', value: showGame?.teamScores[1]?.value || 0 },
  ]);

  function handleWinningScoreChange(event: any) {
    setWinningScore(event.target.value);
  }

  async function handleSaveClick(): Promise<void> {
    const updateRequest = { scoreToWin: winningScore } as UpdateShowGameRequest;
    const numberOfErrors = 0;

    try {
      const response = await services.shows.updateShowGame(show?.id!, showGame?.gameId!, updateRequest);
      dispatch(setShowGame(response.data));
    } catch (error) {
      // TODO: handle this
      console.error(error);
      dispatch(setShowSnackbar({ type: 'error', message: 'There was an error' }));
    }

    if (teamScoresSettings[0].value != showGame?.teamScores[0].value || teamScoresSettings[1].value != showGame?.teamScores[1].value) {
      try {
        const response = await services.shows.modifyTeamScore(show?.id!, showGame?.gameId!, teamScoresSettings);
        dispatch(setTeamScores({ gameId: showGame?.gameId!, teamScores: response.data }));
      } catch (error) {
        // TODO: handle this
        console.error(error);
        dispatch(setShowSnackbar({ type: 'error', message: 'There was an error' }));
      }
    }

    if (numberOfErrors === 0) {
      dispatch(setShowSnackbar({ type: 'success', message: 'Game settings applied.' }));
    }

    navigate(-1);
  }

  const updateTeamScoreSettings = (userId: string, newScore: number) => {
    if (newScore >= 0) {
      setTeamScoresSettings((prevTeamScores) =>
        prevTeamScores.map((scoreData) => (scoreData.userId === userId ? { ...scoreData, value: newScore } : scoreData)),
      );
    }
  };

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
        <div className={styles.score}>
          <div className={styles.scoreLabel}>Teams score</div>
          {teamScoresSettings.map((teamScoreSettings) => (
            <div key={teamScoreSettings.userId} className={styles.teamScore}>
              <TeamScore teamScoreSettings={teamScoreSettings} updateTeamScoreSettings={updateTeamScoreSettings}></TeamScore>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={handleSaveClick}>Save</Button>
      </div>
    </div>
  );
}

export default GameSettings;

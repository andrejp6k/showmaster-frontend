import { useSelector } from 'react-redux';
import { selectConnectedTeams } from '../../../../redux/userSlice';
import { Score } from '../../../../types';
import styles from '../TeamScore/TeamScore.scss';
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface TeamScoreProps {
  teamScoreSettings: Score;
  updateTeamScoreSettings: (teamId: string, newScore: number) => void;
}

const TeamScore: React.FC<TeamScoreProps> = ({ teamScoreSettings, updateTeamScoreSettings }) => {
  const connectedTeams = useSelector(selectConnectedTeams);
  return (
    <div className={styles.container}>
      <div className={styles.label}>{connectedTeams?.find((x) => x.id === teamScoreSettings.userId)?.name}</div>
      <div className={styles.score}>
        <IconButton onClick={() => updateTeamScoreSettings(teamScoreSettings.userId, teamScoreSettings.value - 1)} color="inherit" aria-label="minus">
          <Remove />
        </IconButton>
        <div className={styles.scoreValue}>{teamScoreSettings.value}</div>
        <IconButton onClick={() => updateTeamScoreSettings(teamScoreSettings.userId, teamScoreSettings.value + 1)} color="inherit" aria-label="plus">
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default TeamScore;

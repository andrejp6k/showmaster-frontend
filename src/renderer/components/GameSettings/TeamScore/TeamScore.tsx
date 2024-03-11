import { useSelector } from 'react-redux';
import { selectConnectedTeams } from '../../../../redux/userSlice';
import { Score } from '../../../../types';
import styles from '../TeamScore/TeamScore.scss';

interface TeamScoreProps {
  teamScoreSettings: Score;
  updateTeamScoreSettings: (teamId: string, newScore: number) => void;
}

const TeamScore: React.FC<TeamScoreProps> = ({ teamScoreSettings, updateTeamScoreSettings }) => {
  const connectedTeams = useSelector(selectConnectedTeams);
  return (
    <div className={styles.container}>
      <div className={styles.label}>{connectedTeams.find((x) => x.id === teamScoreSettings.userId)?.name}</div>
      <div className={styles.score}>
        <button onClick={() => updateTeamScoreSettings(teamScoreSettings.userId, teamScoreSettings.value - 1)}>-</button>
        <div className={styles.scoreValue}>{teamScoreSettings.value}</div>
        <button onClick={() => updateTeamScoreSettings(teamScoreSettings.userId, teamScoreSettings.value + 1)}>+</button>
      </div>
    </div>
  );
};

export default TeamScore;

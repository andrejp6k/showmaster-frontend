import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/userSlice';
import styles from './WelcomeTeam.scss';

function WelcomeTeam() {
  const currentUser = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>Welcome {currentUser?.name} to</div>
      <div className={styles.titlePrimary}>GAME</div>
      <div className={styles.titleSecondary}>MASTERS</div>
    </div>
  );
}

export default WelcomeTeam;

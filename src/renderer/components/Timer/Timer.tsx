import styles from './Timer.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTeamToAnswerId } from '../../../redux/gameSlice';

interface TimerProps {
  initialSeconds: number;
  isAnswered: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, isAnswered }) => {
  const teamBuzzered = useSelector(selectTeamToAnswerId) != null;

  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (teamBuzzered && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [teamBuzzered, seconds]);

  useEffect(() => {
    if (!teamBuzzered) {
      setSeconds(initialSeconds);
    }
  }, [teamBuzzered]);

  return (
    !isAnswered && teamBuzzered && <div className={styles.container}>{seconds === 0 ? <p>Time's up!</p> : <p>{`Time remaining: ${seconds} seconds`}</p>}</div>
  );
};

export default Timer;

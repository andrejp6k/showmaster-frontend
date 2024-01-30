import styles from './Buzzer.scss';

interface BuzzerProps {
  children?: string;
  onClick?: (evevent: React.MouseEvent<HTMLElement>) => void;
}

const Buzzer: React.FC<BuzzerProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.buzzer}>
      {children}
    </button>
  );
};

export default Buzzer;

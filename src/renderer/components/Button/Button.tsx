import classNames from 'classnames';
import styles from './Button.scss';

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  hidden?: boolean;
  children?: JSX.Element | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'normal';
  sx?: Record<string, string>;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, children, type = 'button', onClick, color = 'primary', sx, size = 'normal', hidden = false }) => {
  return (
    <button
      style={sx}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        { [styles.primary]: color === 'primary' },
        { [styles.secondary]: color === 'secondary' },
        { [styles.tertiary]: color === 'tertiary' },
        { [styles.hidden]: hidden },
        { [styles.small]: size === 'small' },
      )}
    >
      {children}
    </button>
  );
};

export default Button;

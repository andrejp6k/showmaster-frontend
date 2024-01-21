import { useSelector } from 'react-redux';
import { selectQuitGameDialogOpen, selectQuitGameActionType, setQuitGameDialogOpen } from '../../../redux/uiSlice';
import { Dialog } from '@mui/material';

import styles from './QuitGameDialog.scss';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/appStore';
import { useNavigate } from 'react-router-dom';
import { RouteDefinitions } from '../../App';

function QuitGameDialog() {
  const isOpen = useSelector(selectQuitGameDialogOpen);
  const actionType = useSelector(selectQuitGameActionType);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCancelClick() {
    dispatch(setQuitGameDialogOpen(false));
  }

  function handleSubmitClick() {
    dispatch(setQuitGameDialogOpen(false));
    switch (actionType) {
      case 'back':
        navigate(-1);
        break;
      case 'home':
        navigate(RouteDefinitions.Root, { replace: true });
        break;
      default:
        throw new Error('QuitGameActionType was null when handling submit!.');
    }
  }

  return (
    <Dialog open={isOpen}>
      <div className={styles.container}>
        <h3>Are you sure you want to quit game?</h3>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleCancelClick}>
            Cancel
          </button>
          <button className={classNames(styles.button, styles.submit)} onClick={handleSubmitClick}>
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default QuitGameDialog;

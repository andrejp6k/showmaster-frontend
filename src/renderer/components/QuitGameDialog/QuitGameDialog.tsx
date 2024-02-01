import { useSelector } from 'react-redux';
import { selectQuitGameDialogOpen, selectQuitGameActionType, setQuitGameDialogOpen } from '../../../redux/uiSlice';
import { Dialog } from '@mui/material';

import styles from './QuitGameDialog.scss';
import { useAppDispatch } from '../../hooks/appStore';
import { useNavigate } from 'react-router-dom';
import { RouteDefinitions } from '../../App';
import Button from '../Button/Button';

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
          <Button onClick={handleCancelClick} color="secondary" sx={{ width: '100px' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmitClick} color="primary" sx={{ width: '100px' }}>
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default QuitGameDialog;

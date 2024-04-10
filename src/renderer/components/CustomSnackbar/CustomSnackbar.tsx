import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/appStore';
import { selectShowSnackbar, setShowSnackbar } from '../../../redux/uiSlice';

function CustomSnackbar() {
  const showSnackbar = useSelector(selectShowSnackbar);
  const dispatch = useAppDispatch();

  const handleCloseSnackbar = () => {
    dispatch(setShowSnackbar(null));
  };

  return (
    <Snackbar
      open={!!showSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      sx={{ marginTop: '40px' }}
    >
      <Alert onClose={handleCloseSnackbar} severity={showSnackbar?.type} sx={{ width: '100%' }}>
        {showSnackbar?.message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;

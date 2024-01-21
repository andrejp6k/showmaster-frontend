import { Dialog } from '@mui/material';
import { selectFinishGameDialogOpen } from '../../../redux/uiSlice';
import { useSelector } from 'react-redux';

function FinishGameDialog() {
  const isOpen = useSelector(selectFinishGameDialogOpen);
  return <Dialog open={isOpen}>Hello finish game dialog!</Dialog>;
}

export default FinishGameDialog;

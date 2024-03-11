import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '../../Button/Button';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete all question statistics?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={'secondary'} >Cancel</Button>
        <Button onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import './MainAppBar.scss';
import { useNavigate } from 'react-router-dom';

function MainAppBar() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar variant="dense">
        <IconButton
          onClick={handleNavigateHome}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;

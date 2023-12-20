import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import styles from './MainAppBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function MainAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar variant="dense">
        <div className={styles.container}>
          <IconButton
            onClick={handleNavigateBack}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={handleNavigateHome}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Home />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home, ArrowBack, Settings } from '@mui/icons-material';
import styles from './MainAppBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function MainAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateToSettings = () => {
    navigate('/settings');
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
          <div>
            <IconButton
              onClick={handleNavigateHome}
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4 }}
            >
              <Home />
            </IconButton>
            <IconButton
              onClick={handleNavigateToSettings}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Settings />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;

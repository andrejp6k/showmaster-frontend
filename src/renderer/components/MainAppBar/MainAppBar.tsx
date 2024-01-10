import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home, ArrowBack, Settings } from '@mui/icons-material';
import styles from './MainAppBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../../redux/userSlice';
import { useSelector } from 'react-redux';
import { Role } from '../../../types';
import classNames from 'classnames';
import { RouteDefinitions } from '../../App';

function MainAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);

  const handleNavigateHome = () => {
    navigate(RouteDefinitions.Root, { replace: true });
  };

  const handleNavigateToSettings = () => {
    navigate(RouteDefinitions.Settings);
  };

  const handleNavigateBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  const isButtonAllowed = () => {
    console.log(location);
    if (currentUser?.role !== Role.Host) {
      return false;
    }
    return true;
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar variant="dense">
        <div className={styles.container}>
          <IconButton
            onClick={handleNavigateBack}
            className={classNames({
              [styles.hidden]:
                (currentUser?.role === Role.Team &&
                  location.pathname != RouteDefinitions.Settings) ||
                location.pathname === RouteDefinitions.SelectGameMode,
            })}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>

          <div>
            {currentUser?.role === Role.Host &&
              location.pathname !== RouteDefinitions.SelectGameMode && (
                <IconButton
                  onClick={handleNavigateHome}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 4 }}
                >
                  <Home />
                </IconButton>
              )}
            {!(
              currentUser?.role === Role.Team &&
              location.pathname != RouteDefinitions.WelcomeTeam
            ) &&
              location.pathname != RouteDefinitions.Settings && (
                <IconButton
                  onClick={handleNavigateToSettings}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <Settings />
                </IconButton>
              )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;

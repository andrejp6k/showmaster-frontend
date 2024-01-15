import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home, ArrowBack, Settings } from '@mui/icons-material';
import styles from './MainAppBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../../redux/userSlice';
import { useSelector } from 'react-redux';
import { Role } from '../../../types';
import classNames from 'classnames';
import { RouteDefinitions } from '../../App';
import { useAppDispatch } from '../../hooks/appStore';
import { setIsQuitGameDialogOpen, setQuitGameActionType } from '../../../redux/uiSlice';

function MainAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);

  const handleNavigateHome = () => {
    if (location.pathname.includes('/game-host/')) {
      dispatch(setIsQuitGameDialogOpen(true));
      dispatch(setQuitGameActionType('home'));
      return;
    }
    navigate(RouteDefinitions.Root, { replace: true });
  };

  const handleNavigateToSettings = () => {
    navigate(RouteDefinitions.Settings);
  };

  const handleNavigateBack = () => {
    if (location.pathname !== '/') {
      if (location.pathname.includes('/game-host/')) {
        dispatch(setIsQuitGameDialogOpen(true));
        dispatch(setQuitGameActionType('back'));

        return;
      }
      navigate(-1);
    }
  };

  const isButtonAllowed = () => {
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
                (currentUser?.role === Role.Team && location.pathname != RouteDefinitions.Settings) || location.pathname === RouteDefinitions.SelectGameMode,
            })}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>

          <div>
            {currentUser?.role === Role.Host && location.pathname !== RouteDefinitions.SelectGameMode && (
              <IconButton onClick={handleNavigateHome} edge="start" color="inherit" aria-label="menu">
                <Home />
              </IconButton>
            )}
            {!(location.pathname != RouteDefinitions.WelcomeTeam && location.pathname != RouteDefinitions.SelectGameMode) &&
              location.pathname != RouteDefinitions.Settings && (
                <IconButton onClick={handleNavigateToSettings} edge="start" color="inherit" aria-label="menu">
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

import { ArrowBack, Home, Settings, Tune } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { setIsQuitGameDialogOpen, setQuitGameActionType } from '../../../redux/uiSlice';
import { selectUser } from '../../../redux/userSlice';
import { Role } from '../../../types';
import { RouteDefinitions } from '../../App';
import { useAppDispatch } from '../../hooks/appStore';
import styles from './MainAppBar.scss';

function MainAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const gameHostMatch = useMatch(RouteDefinitions.GameHost.route);

  const handleNavigateHome = () => {
    if (gameHostMatch) {
      dispatch(setIsQuitGameDialogOpen(true));
      dispatch(setQuitGameActionType('home'));
      return;
    }
    navigate(RouteDefinitions.Root, { replace: true });
  };

  const handleNavigateToSettings = () => {
    navigate(RouteDefinitions.AppSettings);
  };

  const handleNavigateBack = () => {
    if (location.pathname !== RouteDefinitions.Root) {
      if (gameHostMatch) {
        dispatch(setIsQuitGameDialogOpen(true));
        dispatch(setQuitGameActionType('back'));

        return;
      }
      navigate(-1);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar variant="dense">
        <div className={styles.container}>
          <IconButton
            onClick={handleNavigateBack}
            className={classNames({
              [styles.hidden]:
                (currentUser?.role === Role.Team && location.pathname != RouteDefinitions.AppSettings) || location.pathname === RouteDefinitions.SelectGameMode,
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
            {currentUser?.role === Role.Host && gameHostMatch && (
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
                <Tune />
              </IconButton>
            )}
            {!(location.pathname != RouteDefinitions.WelcomeTeam && location.pathname != RouteDefinitions.SelectGameMode) &&
              location.pathname != RouteDefinitions.AppSettings && (
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

import { ArrowBack, Home, Settings, Tune } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { setQuitGameDialogOpen, setQuitGameActionType } from '../../../redux/uiSlice';
import { selectUser } from '../../../redux/userSlice';
import { Role } from '../../../types';
import { RouteDefinitions } from '../../App';
import { useAppDispatch } from '../../hooks/appStore';
import styles from './MainAppBar.scss';
import { sendMessage } from '../../../redux/websocketSlice';
import { setTeamToAnswerId } from '../../../redux/gameSlice';

function MainAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const gameHostMatch = useMatch(RouteDefinitions.GameHost.route);

  const handleNavigateHome = () => {
    if (gameHostMatch) {
      dispatch(setQuitGameDialogOpen(true));
      dispatch(setQuitGameActionType('home'));
      return;
    }
    navigate(RouteDefinitions.Root, { replace: true });
  };

  const handleNavigateToAppSettings = () => {
    navigate(RouteDefinitions.AppSettings);
  };

  const handleNavigateToGameSettings = () => {
    navigate(RouteDefinitions.GameSettings);
    sendMessage('deactivateQuestion', currentUser?.id);
    dispatch(setTeamToAnswerId(null));
  };

  const handleNavigateBack = () => {
    if (location.pathname !== RouteDefinitions.Root) {
      if (gameHostMatch) {
        dispatch(setQuitGameDialogOpen(true));
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
                (currentUser?.role === Role.Team && location.pathname != RouteDefinitions.AppSettings) || location.pathname === RouteDefinitions.WelcomeHost,
            })}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>

          <div>
            {currentUser?.role === Role.Host && location.pathname !== RouteDefinitions.WelcomeHost && location.pathname !== RouteDefinitions.GameSettings && (
              <IconButton onClick={handleNavigateHome} edge="start" color="inherit" aria-label="menu">
                <Home />
              </IconButton>
            )}
            {currentUser?.role === Role.Host && gameHostMatch && (
              <IconButton onClick={handleNavigateToGameSettings} edge="start" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
                <Tune />
              </IconButton>
            )}
            {!(location.pathname != RouteDefinitions.WelcomeTeam && location.pathname != RouteDefinitions.WelcomeHost) &&
              location.pathname != RouteDefinitions.AppSettings && (
                <IconButton onClick={handleNavigateToAppSettings} edge="start" color="inherit" aria-label="menu">
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

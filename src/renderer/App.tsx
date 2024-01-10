import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import styles from './App.scss';
import Settings from './components/Settings/Settings';
import SelectGame from './components/SelectGame/SelectGame';
import SelectGameMode from './components/SelectGameMode/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam/WelcomeTeam';
import MainAppBar from './components/MainAppBar/MainAppBar';
import AppStarter from './components/AppStarter/AppStarter';
import Show from './components/Show/Show';
import GameHost from './components/GameHost/GameHost';
import GameTeam from './components/GameTeam/GameTeam';

export const RouteDefinitions = {
  AppStarter: '/',
  Settings: '/settings',
  SelectGameMode: '/select-game-mode',
  WelcomeTeam: '/welcome-team',
  SelectGame: '/select-game',
  Show: '/show',
  GameHost: '/game-host/:questionIndex',
  GameTeam: '/game-team',
};

export default function App() {
  return (
    <Router>
      <MainAppBar />
      <div className={styles.content}>
        <Routes>
          <Route path={RouteDefinitions.AppStarter} element={<AppStarter />} />
          <Route path={RouteDefinitions.Settings} element={<Settings />} />
          <Route
            path={RouteDefinitions.SelectGameMode}
            element={<SelectGameMode />}
          />
          <Route
            path={RouteDefinitions.WelcomeTeam}
            element={<WelcomeTeam />}
          />
          <Route path={RouteDefinitions.SelectGame} element={<SelectGame />} />
          <Route path={RouteDefinitions.Show} element={<Show />} />
          <Route path={RouteDefinitions.GameHost} element={<GameHost />} />
          <Route path={RouteDefinitions.GameTeam} element={<GameTeam />} />
        </Routes>
      </div>
    </Router>
  );
}

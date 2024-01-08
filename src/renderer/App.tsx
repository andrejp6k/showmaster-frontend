import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import styles from './App.scss';
import Settings from './components/Settings';
import SelectGame from './components/SelectGame/SelectGame';
import SelectGameMode from './components/SelectGameMode/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam/WelcomeTeam';
import MainAppBar from './components/MainAppBar/MainAppBar';
import AppStarter from './components/AppStarter/AppStarter';
import Show from './components/Show/Show';
import GameHost from './components/GameHost/GameHost';
import GameTeam from './components/GameTeam/GameTeam';

export default function App() {
  return (
    <Router>
      <MainAppBar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<AppStarter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/select-game-mode" element={<SelectGameMode />} />
          <Route path="/welcome-team" element={<WelcomeTeam />} />
          <Route path="/select-game" element={<SelectGame />} />
          <Route path="/show" element={<Show />} />
          <Route path="/game-host/:questionIndex" element={<GameHost />} />
          <Route path="/game-team" element={<GameTeam />} />
        </Routes>
      </div>
    </Router>
  );
}

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { connectToHub } from '../redux/websocketSlice';
import styles from './App.scss';
import Settings from './components/Settings';
import SelectGame from './components/SelectGame';
import SelectGameMode from './components/SelectGameMode/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam';
import { useAppDispatch } from './hooks/appStore';
import MainAppBar from './components/MainAppBar/MainAppBar';
import AppStarter from './components/AppStarter/AppStarter';

export default function App() {
  const dispatch = useAppDispatch();

  dispatch(connectToHub('http://localhost:5173/gamehub'));

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
        </Routes>
      </div>
    </Router>
  );
}

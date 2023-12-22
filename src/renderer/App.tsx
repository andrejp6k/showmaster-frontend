import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import styles from './App.scss';
import AssignStudioToUser from './components/AssignUserToStudio';
import MainAppBar from './components/MainAppBar/MainAppBar';
import SelectGame from './components/SelectGame';
import SelectGameMode from './components/SelectGameMode/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam';

export default function App() {
  return (
    <Router>
      <MainAppBar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<AssignStudioToUser />} />
          <Route path="/select-game-mode" element={<SelectGameMode />} />
          <Route path="/welcome-team" element={<WelcomeTeam />} />
          <Route path="/select-game" element={<SelectGame />} />
        </Routes>
      </div>
    </Router>
  );
}

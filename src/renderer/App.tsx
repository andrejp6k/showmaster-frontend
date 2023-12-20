import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import AssignStudioToUser from './components/AssignUserToStudio';
import SelectGame from './components/SelectGame';
import SelectGameMode from './components/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssignStudioToUser />} />
        <Route path="/select-game-mode" element={<SelectGameMode />} />
        <Route path="/welcome-team" element={<WelcomeTeam />} />
        <Route path="/select-game" element={<SelectGame />} />
      </Routes>
    </Router>
  );
}

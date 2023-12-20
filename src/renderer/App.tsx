import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { connectToHub } from '../redux/websocketSlice';
import './App.scss';
import AssignStudioToUser from './components/AssignUserToStudio';
import SelectGame from './components/SelectGame';
import SelectGameMode from './components/SelectGameMode';
import WelcomeTeam from './components/WelcomeTeam';
import { useAppDispatch } from './hooks/appStore';

export default function App() {
  const dispatch = useAppDispatch();

  dispatch(connectToHub('http://localhost:5173/gamehub'));

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

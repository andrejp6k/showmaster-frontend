import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import Test from './Components/Test';

function Hello() {
  return (
    <div>
      <div>
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Show master</h1>
      <Test />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

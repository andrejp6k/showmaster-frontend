import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { setNavigate } from '../services/navigation-service';
import styles from './App.scss';
import AppStarter from './components/AppStarter/AppStarter';
import GameHost from './components/GameHost/GameHost';
import GameTeam from './components/GameTeam/GameTeam';
import MainAppBar from './components/MainAppBar/MainAppBar';
import SelectGame from './components/SelectGame/SelectGame';
import SelectGameMode from './components/SelectGameMode/SelectGameMode';
import Settings from './components/Settings/Settings';
import Show from './components/Show/Show';
import WelcomeTeam from './components/WelcomeTeam/WelcomeTeam';

export const RouteDefinitions = {
  Root: '/',
  Settings: '/settings',
  SelectGameMode: '/select-game-mode',
  WelcomeTeam: '/welcome-team',
  SelectGame: '/select-game',
  Show: '/show',
  GameHost: '/game-host/:questionIndex',
  GameTeam: '/game-team',
};

export default function App() {
  const router = createMemoryRouter([
    {
      path: RouteDefinitions.Root,
      element: (
        <>
          <MainAppBar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </>
      ),
      children: [
        {
          path: RouteDefinitions.Root,
          element: <AppStarter />,
        },
        {
          path: RouteDefinitions.Settings,
          element: <Settings />,
        },
        {
          path: RouteDefinitions.SelectGameMode,
          element: <SelectGameMode />,
        },
        {
          path: RouteDefinitions.WelcomeTeam,
          element: <WelcomeTeam />,
        },
        {
          path: RouteDefinitions.SelectGame,
          element: <SelectGame />,
        },
        {
          path: RouteDefinitions.Show,
          element: <Show />,
        },
        {
          path: RouteDefinitions.GameHost,
          element: <GameHost />,
        },
        {
          path: RouteDefinitions.GameTeam,
          element: <GameTeam />,
        },
      ],
    },
  ]);

  setNavigate(router.navigate);

  return <RouterProvider router={router} />;
}

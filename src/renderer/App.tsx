import { useSelector } from 'react-redux';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';
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
import { sendMessage } from '../redux/websocketSlice';
import QuitGameDialog from './components/QuitGameDialog/QuitGameDialog';

export const RouteDefinitions = {
  Root: '/',
  Settings: '/settings',
  SelectGameMode: '/select-game-mode',
  WelcomeTeam: '/welcome-team',
  SelectGame: '/select-game',
  Show: '/show',
  GameHost: {
    route: '/game-host/:questionIndex',
    enterParams: (number: number) => getRouteWithParam(RouteDefinitions.GameHost.route, 'questionIndex', number.toString()),
  },
  GameTeam: '/game-team',
};

function getRouteWithParam(route: string, paramName: string, value: string): string {
  return route.replace(`:${paramName}`, value);
}

// This variable is used to hold state of previous location route. Its alternative way of using state for App component. It is updated in
// router's subscribe method. Using state was not possible, because as soon the route would be saved into state, the history representation
// of router was not correct, when using back button (navigate(-1)) - it would send you to root route. This workaround works though.
let prevLocationRoute: string | null = null;

export default function App() {
  const currentUser = useSelector(selectUser);

  const router = createMemoryRouter([
    {
      path: RouteDefinitions.Root,
      element: (
        <>
          <MainAppBar />
          <div className={styles.content}>
            <Outlet />
          </div>
          <QuitGameDialog />
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
          path: RouteDefinitions.GameHost.route,
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

  // This callback is used to track previous location route of host app flow. When user is on game-host pages, and decides to go outside of
  // game (back button or home button), team users should be navigated to their home screen too. The 'closeGame' message is send to them for
  // this purpose.
  router.subscribe((x) => {
    if (
      prevLocationRoute &&
      prevLocationRoute === RouteDefinitions.GameHost.route &&
      !x.matches.some((m) => m.route.path === RouteDefinitions.GameHost.route)
    ) {
      sendMessage('closeGame', currentUser?.id);
    }
    prevLocationRoute = x.matches.filter((m) => m.route.path !== RouteDefinitions.Root)[0]?.route?.path || null;
  });

  return <RouterProvider router={router} />;
}

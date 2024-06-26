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
import WelcomeHost from './components/WelcomeHost/WelcomeHost';
import AppSettings from './components/AppSettings/AppSettings';
import Show from './components/Show/Show';
import WelcomeTeam from './components/WelcomeTeam/WelcomeTeam';
import { sendMessage } from '../redux/websocketSlice';
import QuitGameDialog from './components/QuitGameDialog/QuitGameDialog';
import GameSettings from './components/GameSettings/GameSettings';
import GameFinished from './components/GameFinished/GameFinished';
import FinishGameDialog from './components/FinishGameDialog/FinishGameDialog';
import Congratulations from './components/Congratulations/Congratulations';
import QuestionStatistics from './components/QuestionStatistics/QuestionStatistics';
import CustomSnackbar from './components/CustomSnackbar/CustomSnackbar';

export const RouteDefinitions = {
  Root: '/',
  AppSettings: '/app-settings',
  WelcomeHost: '/welcome-host',
  WelcomeTeam: '/welcome-team',
  SelectGame: '/select-game',
  Show: '/show',
  GameHost: {
    route: '/game-host/:questionId',
    enterParams: (questionId: string) => RouteDefinitions.GameHost.route.replace(':questionId', questionId),
  },
  GameTeam: '/game-team',
  GameSettings: '/game-settings',
  GameFinished: '/game-finished',
  Congratulations: '/congratulations',
  QuestionStatistics: 'question-statistics',
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
            <CustomSnackbar />
          </div>
          <QuitGameDialog />
          <FinishGameDialog />
        </>
      ),
      children: [
        {
          path: RouteDefinitions.Root,
          element: <AppStarter />,
        },
        {
          path: RouteDefinitions.AppSettings,
          element: <AppSettings />,
        },
        {
          path: RouteDefinitions.WelcomeHost,
          element: <WelcomeHost />,
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
        {
          path: RouteDefinitions.GameSettings,
          element: <GameSettings />,
        },
        {
          path: RouteDefinitions.GameFinished,
          element: <GameFinished />,
        },
        {
          path: RouteDefinitions.Congratulations,
          element: <Congratulations />,
        },
        {
          path: RouteDefinitions.QuestionStatistics,
          element: <QuestionStatistics />,
        },
      ],
    },
  ]);

  setNavigate(router.navigate);

  // This callback is used to track previous location route of host app flow. When user is on game-host pages, and decides to go outside of
  // game (back button or home button), team users should be navigated to their home screen too. The 'quitGame' message is send to them for
  // this purpose.
  router.subscribe((x) => {
    // case when you exit game-host screen without finishing game
    if (
      prevLocationRoute &&
      prevLocationRoute === RouteDefinitions.GameHost.route &&
      x.location.pathname !== RouteDefinitions.GameSettings &&
      x.location.pathname !== RouteDefinitions.GameFinished &&
      !x.matches.some((m) => m.route.path === RouteDefinitions.GameHost.route)
    ) {
      sendMessage('quitGame', currentUser?.id);
    }

    // case when you finish game and exit GameFinished screen
    if (prevLocationRoute && prevLocationRoute === RouteDefinitions.GameFinished) {
      sendMessage('quitGame', currentUser?.id);
    }

    prevLocationRoute = x.matches.filter((m) => m.route.path !== RouteDefinitions.Root)[0]?.route?.path || null;
  });

  return <RouterProvider router={router} />;
}

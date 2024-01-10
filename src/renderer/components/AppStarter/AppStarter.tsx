import { Box, CircularProgress } from '@mui/material';
import { User } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '../../../config';
import { setGameUser } from '../../../redux/gameSlice';
import { selectUser, setUser } from '../../../redux/userSlice';
import { connectToHub } from '../../../redux/websocketSlice';
import { services } from '../../../services';
import { getQueryParamValue, navigateToStartPage } from '../../../utils/utils';
import { useAppDispatch } from '../../hooks/appStore';
import { RouteDefinitions } from '../../App';

function AppStarter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const fetchAndStoreUser = async (deviceId: string) => {
    try {
      const response = await services.users.getByDeviceId(deviceId);

      if (response.data) {
        const user = response.data as User;
        dispatch(setUser(user));
        dispatch(setGameUser(user));
        if (user?.id) {
          dispatch(connectToHub(`${config.apiUrl}/hub?userId=${user?.id}&studioId=${user?.studioId}`));
        }
        navigateToStartPage(user.role, navigate);
      } else {
        navigate(RouteDefinitions.Settings, { replace: true });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigateToStartPage(currentUser.role, navigate);
      return;
    }

    const deviceId = getQueryParamValue('deviceId');

    if (!deviceId) throw new Error('DeviceId from query params was null!');

    fetchAndStoreUser(deviceId);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="info" size={80} />
    </Box>
  );
}

export default AppStarter;

import { useEffect } from 'react';
import { setUser, selectUser } from '../../../redux/userSlice';
import { services } from '../../../services';
import { useAppDispatch } from '../../hooks/appStore';
import { Box, CircularProgress } from '@mui/material';
import { Role, User } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQueryParamValue, navigateToStartPage } from '../../../utils/utils';
import { connectToHub } from '../../../redux/websocketSlice';
import config from '../../../config';
import { setNavigate } from '../../../services/navigation-service';

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
        if (user?.id) {
          dispatch(
            connectToHub(
              `${config.apiUrl}/hub?userId=${user?.id}&studioId=${user?.studioId}`,
            ),
          );
        }
        navigateToStartPage(user.role, navigate);
      } else {
        navigate('/settings');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    setNavigate(navigate);

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

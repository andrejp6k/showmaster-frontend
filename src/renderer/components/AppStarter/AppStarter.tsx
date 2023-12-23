import { useEffect, useState } from 'react';
import { changeUser, selectUser } from '../../../redux/userSlice';
import { services } from '../../../services';
import { useAppDispatch } from '../../hooks/appStore';
import { Box, CircularProgress } from '@mui/material';
import { Role, User } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AppStarter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const fetchAndAssignUser = async (deviceId: string) => {
    try {
      const response = await services.users.getByDeviceId(deviceId);

      if (response.data) {
        dispatch(changeUser(response.data));
        const user = response.data as User;
        navigateAccordingToUser(user);
      } else {
        navigate('/settings');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const navigateAccordingToUser = (user: User) => {
    if (user.role == Role.Host) {
      navigate('/select-game-mode');
    } else {
      navigate('/welcome-team');
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigateAccordingToUser(currentUser);
      return;
    }

    const queryString = global.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceIdFromParams = urlParams.get('deviceId');

    console.log('starting fetching data for user', deviceIdFromParams);
    fetchAndAssignUser(deviceIdFromParams!);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="info" size={80} />
    </Box>
  );
}

export default AppStarter;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { setUser, selectUser } from '../../redux/userSlice';
import { services } from '../../services';
import { Role, Studio, User } from '../../types';
import {
  enumNumericValues,
  getQueryParamValue,
  navigateToStartPage,
} from '../../utils/utils';
import { useAppDispatch } from '../hooks/appStore';
import { useSelector } from 'react-redux';
import { connectToHub } from '../../redux/websocketSlice';
import config from '../../config';

function Settings() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const deviceIdFromParams = getQueryParamValue('deviceId');
    if (!deviceIdFromParams) {
      throw new Error('DeviceId from query params was null!');
    }

    setDeviceId(deviceIdFromParams);

    const fetchStudios = async () => {
      try {
        const response = await services.studios.list();
        setStudios(response.data);
      } catch (error) {
        console.error('Error fetching studios:', error);
      }
    };

    fetchStudios();
  }, []);

  const handleStudioClick = (studio: Studio) => {
    setSelectedStudio(studio);
  };

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
  };

  const handleConfirmClick = async () => {
    if (selectedStudio && selectedRole != null) {
      try {
        let user = currentUser
          ? await updateUser(currentUser.id)
          : await createUser();
        if (user?.id) {
          dispatch(connectToHub(`${config.apiUrl}/hub?userId=${user?.id}`));
        }
        navigateToStartPage(selectedRole, navigate);
      } catch (error) {
        console.error('Error confirming:', error);
      }
    }
  };

  const createUser = async () => {
    const userToCreate = {
      studioId: selectedStudio?.id,
      role: selectedRole,
      deviceId,
    };

    const response = await services.users.create(userToCreate);
    const user = response.data as User;
    if (response.data) {
      dispatch(setUser(user));
    }

    return user;
  };

  const updateUser = async (userId: string) => {
    const userToUpdate = {
      id: userId,
      studioId: selectedStudio?.id,
      role: selectedRole,
    };

    const response = await services.users.update(userToUpdate);
    const user = response.data as User;
    if (response.data) {
      dispatch(setUser(user));
    }

    return user;
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '100px',
          fontSize: '30px',
        }}
      >
        Device settings
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginRight: '150px' }}>
          <div style={{ fontSize: '24px', marginBottom: '40px' }}>
            Select studio
          </div>
          {studios.map((studio, index) => (
            <button
              type="button"
              key={`${studio.id} + ${index}`}
              onClick={() => handleStudioClick(studio)}
              style={{
                margin: '5px',
                padding: '10px',
                display: 'block',
                backgroundColor:
                  selectedStudio === studio ? 'lightblue' : 'white',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              {studio.name}
            </button>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '24px', marginBottom: '40px' }}>
            Select role
          </div>
          {enumNumericValues(Role).map((roleAsNumber: number) => (
            <button
              type="button"
              key={roleAsNumber}
              onClick={() => handleRoleClick(roleAsNumber)}
              style={{
                margin: '5px',
                padding: '10px',
                display: 'block',
                backgroundColor:
                  selectedRole === roleAsNumber ? 'lightblue' : 'white',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              {Role[roleAsNumber]}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <button
          type="button"
          onClick={handleConfirmClick}
          style={{
            backgroundColor: 'rgb(239, 158, 86)',
            width: '250px',
          }}
        >
          Assign device
        </button>
      </div>
    </div>
  );
}

export default Settings;

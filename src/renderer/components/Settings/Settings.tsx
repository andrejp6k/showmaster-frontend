import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { setUser, selectUser } from '../../../redux/userSlice';
import { services } from '../../../services';
import { Role, Studio, User } from '../../../types';
import {
  enumNumericValues,
  getQueryParamValue,
  navigateToStartPage,
} from '../../../utils/utils';
import { useAppDispatch } from '../../hooks/appStore';
import { useSelector } from 'react-redux';
import { connectToHub } from '../../../redux/websocketSlice';
import config from '../../../config';
import styles from './Settings.scss';
import classNames from 'classnames';

function Settings() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const [error, setError] = useState<string | null>(null);
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
          dispatch(
            connectToHub(
              `${config.apiUrl}/hub?userId=${user?.id}&studioId=${user?.studioId}`,
            ),
          );
        }
        navigateToStartPage(selectedRole, navigate);
      } catch (error: any) {
        setError(error?.response?.data || 'There was an error');
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
    <div className={styles.container}>
      <div className={styles.title}>Device settings</div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.content}>
        <div>
          <div className={styles.sectionTitle}>Select studio</div>
          {studios.map((studio, index) => (
            <button
              type="button"
              key={`${studio.id} + ${index}`}
              onClick={() => handleStudioClick(studio)}
              className={classNames(styles.sectionButton, {
                [styles.selected]: selectedStudio === studio,
              })}
            >
              {studio.name}
            </button>
          ))}
        </div>

        <div>
          <div className={styles.sectionTitle}>Select role</div>
          {enumNumericValues(Role).map((roleAsNumber: number) => (
            <button
              type="button"
              key={roleAsNumber}
              onClick={() => handleRoleClick(roleAsNumber)}
              className={classNames(styles.sectionButton, {
                [styles.selected]: selectedRole === roleAsNumber,
              })}
            >
              {Role[roleAsNumber]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          onClick={handleConfirmClick}
          className={styles.submitButton}
        >
          Assign device
        </button>
      </div>
    </div>
  );
}

export default Settings;

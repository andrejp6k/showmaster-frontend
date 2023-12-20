import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { services } from '../../services';
import useSignalRHub from '../hooks/useSignaRHub';
import { Role, Studio } from '../../types';
import { enumNumericValues } from '../../utils/utils';

function AssignStudioToUser() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await services.studios.list();
        setStudios(response.data);
      } catch (error) {
        console.error('Error fetching studios:', error);
      }
    };

    fetchStudios();

    const queryString = global.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceIdFromParams = urlParams.get('deviceId');
    setDeviceId(deviceIdFromParams || '');
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
        await services.users.create({
          studioId: selectedStudio.id,
          role: selectedRole,
          deviceId,
        });

        switch (selectedRole) {
          case Role.Host:
            navigate('/select-game-mode');
            break;
          case Role.Team:
            navigate('/welcome-team');
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error confirming:', error);
      }
    }
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
          {enumNumericValues(Role).map((roleIdx: number) => (
            <button
              type="button"
              key={roleIdx}
              onClick={() => handleRoleClick(roleIdx as Role)}
              style={{
                margin: '5px',
                padding: '10px',
                display: 'block',
                backgroundColor:
                  selectedRole === roleIdx ? 'lightblue' : 'white',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              {Role[roleIdx]}
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

export default AssignStudioToUser;

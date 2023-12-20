import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { services } from '../../services';
import useSignalRHub from '../hooks/useSignaRHub';

const Roles = {
  Host: 'Host',
  Team: 'Team',
};

function AssignStudioToUser() {
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
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

  const handleStudioClick = (studio: any) => {
    setSelectedStudio(studio);
  };

  const handleRoleClick = (role: any) => {
    setSelectedRole(role);
  };

  const handleConfirmClick = async () => {
    if (selectedStudio && selectedRole) {
      try {
        await services.users.create({
          studioId: selectedStudio.id,
          role: selectedRole.toString(),
          deviceId,
        });

        switch (selectedRole) {
          case Roles.Host:
            navigate('/select-game-mode');
            break;
          case Roles.Team:
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
          {Object.values(Roles).map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => handleRoleClick(role)}
              style={{
                margin: '5px',
                padding: '10px',
                display: 'block',
                backgroundColor: selectedRole === role ? 'lightblue' : 'white',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              {role}
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

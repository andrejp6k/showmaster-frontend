import { useState } from 'react';
import MultiSLiderView from './MultiSliderView';

// This is just a demo component to represent MultiSliderView component, it can be deleted when not needed anymore, along with the routes for it.
function MultiSliderViewDemo() {
  const initialTeamValues = [
    { teamId: '659ad675b270832e08e36deb', value: 1950 },
    { teamId: '659ad6a7b270832e08e36dec', value: 1850 },
  ];
  const initialCorrectValue = 1900;

  const [teamValues, setTeamValues] = useState(initialTeamValues);
  const [correctValue, setCorrectValue] = useState(initialCorrectValue);

  const handleTeamValueChange = (e, teamId) => {
    const idx = teamValues.findIndex((x) => x.teamId === teamId);
    const values = [...teamValues];
    values[idx].value = parseInt(e.target.value) || 0;
    setTeamValues(values);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <label>Team1 value</label>
      <input
        value={teamValues.find((x) => x.teamId === '659ad675b270832e08e36deb')?.value}
        onChange={(e) => handleTeamValueChange(e, '659ad675b270832e08e36deb')}
      />

      <label>Team2 value</label>
      <input
        value={teamValues.find((x) => x.teamId === '659ad6a7b270832e08e36dec')?.value}
        onChange={(e) => handleTeamValueChange(e, '659ad6a7b270832e08e36dec')}
      />

      <label>Correct value</label>
      <input value={correctValue} onChange={(e) => setCorrectValue(parseInt(e.target.value) || 0)} />

      <MultiSLiderView min={1800} max={2023} teamValues={teamValues} correctValue={correctValue} />
    </div>
  );
}

export default MultiSliderViewDemo;

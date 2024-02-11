import { useState } from 'react';
import MultiSliderView from './MultiSliderView';
import { TeamAnswerResult } from '../../../types';

// This is just a demo component to represent MultiSliderView component, it can be deleted when not needed anymore, along with the routes for it.
function MultiSliderViewDemo() {
  const initialTeamValues = [
    { teamId: '1', value: 1902, teamName: 'Team 1' } as TeamAnswerResult,
    { teamId: '2', value: 1905, teamName: 'Team 2' } as TeamAnswerResult,
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
        value={teamValues.find((x) => x.teamId === '1')?.value}
        onChange={(e) => handleTeamValueChange(e, '1')}
      />

      <label>Team2 value</label>
      <input
        value={teamValues.find((x) => x.teamId === '2')?.value}
        onChange={(e) => handleTeamValueChange(e, '2')}
      />

      <label>Correct value</label>
      <input value={correctValue} onChange={(e) => setCorrectValue(parseInt(e.target.value) || 0)} />

      <MultiSliderView min={1800} max={2023} teamValues={teamValues} correctValue={correctValue} />
    </div>
  );
}

export default MultiSliderViewDemo;

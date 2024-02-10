import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectConnectedTeams } from '../../../redux/userSlice';
import styles from './MultiSliderView.scss';
import classNames from 'classnames';

interface MultiSliderViewProps {
  min: number;
  max: number;
  teamValues?: { teamId: string; value: number }[];
  correctValue?: number;
}

interface MultisliderValue {
  flag: string;
  value: number;
}

const MultiSLiderView: React.FC<MultiSliderViewProps> = ({ min, max, teamValues, correctValue }) => {
  const teamColors = ['yellow', 'orange'];
  const teamLabelStartHeight = 70;
  const teamLabelStep = 40;
  const correctLabelStartHeight = -10;

  const connectedTeams = useSelector(selectConnectedTeams);

  const getTeamName = (teamId: string) => {
    return connectedTeams?.find((x) => x.id === teamId)?.name;
  };

  let allValues = [
    ...(teamValues?.map((x) => ({ flag: getTeamName(x.teamId), value: x.value }) as MultisliderValue).filter((x) => x.flag) || []),
    ...(correctValue !== undefined ? [{ flag: 'Correct', value: correctValue } as MultisliderValue] : []),
  ];
  allValues = allValues.sort((a, b) => a.value - b.value);

  function calculateTop(index: number) {
    const flag = allValues[index]?.flag;

    if (flag === 'Correct') {
      return `${correctLabelStartHeight}px`;
    }

    const teamIndex = connectedTeams?.findIndex((t) => t.name === flag) || 0;
    const offset = teamLabelStep * teamIndex + teamLabelStartHeight;

    return `${offset}px`;
  }

  function getColor(index: number) {
    const flag = allValues[index]?.flag;

    if (flag === 'Correct') {
      return '#21ea5a';
    }

    const teamIndex = connectedTeams?.findIndex((t) => t.name === flag) || 0;

    return teamColors[teamIndex] || 'red';
  }

  return (
    <>
      <Slider
        track={false}
        value={allValues.map((x) => x.value)}
        valueLabelFormat={(asd, index) => {
          const flag = allValues[index].flag;
          return (
            <div className={styles.label} style={{ background: getColor(index) }}>
              <div>{asd}</div>
              <div>{flag}</div>
            </div>
          );
        }}
        min={min}
        max={max}
        step={1}
        disabled
        valueLabelDisplay="on"
        sx={{
          mt: 3,
          '.MuiSlider-thumb': {
            ['&[data-index="0"]']: {
              background: getColor(0),
              '& .MuiSlider-valueLabel': {
                top: calculateTop(0),
                color: getColor(0),
              },
            },
            ['&[data-index="1"]']: {
              background: getColor(1),
              '& .MuiSlider-valueLabel': {
                top: calculateTop(1),
                color: getColor(1),
              },
            },
            ['&[data-index="2"]']: {
              background: getColor(2),
              '& .MuiSlider-valueLabel': {
                top: calculateTop(2),
                color: getColor(2),
              },
            },
            '& .MuiSlider-valueLabel': {
              position: 'fixed',
              fontSize: 12,
              fontWeight: 'normal',
              backgroundColor: 'unset',
              color: 'black',
              '&::before': {
                display: 'none',
              },
              '& *': {
                background: 'transparent',
                color: 'black',
              },
            },
          },
        }}
      />
    </>
  );
};

export default MultiSLiderView;

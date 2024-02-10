import { Slider } from '@mui/material';

interface MultiSliderViewProps {
  min: number;
  max: number;
  teamValues?: { flag: 'Team1' | 'Team2' | 'Correct'; value: number }[];
  correctValue?: { flag: 'Team1' | 'Team2' | 'Correct'; value: number };
}

const MultiSLiderView: React.FC<MultiSliderViewProps> = ({ min, max, teamValues, correctValue }) => {
  let allValues = [...(teamValues || []), ...(correctValue !== undefined ? [correctValue] : [])];
  allValues = allValues.sort((a, b) => a.value - b.value);

  function calculateTop(index: number) {
    const flag = allValues[index]?.flag;

    if (flag === 'Team1') {
      return '70px';
    }

    if (flag === 'Team2') {
      return '110px';
    }

    return '-10px';
  }

  function getColor(index: number) {
    const flag = allValues[index]?.flag;

    if (flag === 'Team1') {
      return 'yellow';
    }

    if (flag === 'Team2') {
      return 'orange';
    }

    return 'green';
  }

  return (
    <>
      <Slider
        track={false}
        value={allValues.map((x) => x.value)}
        valueLabelFormat={(asd, index) => {
          const flag = allValues[index].flag;
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                background: getColor(index),
                borderRadius: '5px',
                padding: '2px',
                opacity: 0.8,
              }}
            >
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

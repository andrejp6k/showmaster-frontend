import { Slider } from '@mui/material';

interface MultiSliderViewProps {
  min: number;
  max: number;
  teamValues?: number[];
  correctValue?: number;
}

const MultiSLiderView: React.FC<MultiSliderViewProps> = ({ min, max, teamValues, correctValue }) => {
  const allValues = [...(teamValues || []), ...(correctValue !== undefined ? [correctValue] : [])];
  return (
    <>
      <Slider
        track={false}
        value={allValues}
        valueLabelFormat={(asd, index) => (
          <>
            <div>{asd}</div>
            <div>{index}</div>
          </>
        )}
        min={min}
        max={max}
        step={1}
        disabled
        valueLabelDisplay="on"
        sx={{
          '.MuiSlider-thumb': {
            ['&[data-index="0"]']: {
              background: 'red',
              '& .MuiSlider-valueLabel': {
                top: 70,
              },
            },
            ['&[data-index="1"]']: {
              background: 'green',
              '& .MuiSlider-valueLabel': {
                top: 100,
              },
            },
            ['&[data-index="2"]']: {
              background: 'blue',
              '& .MuiSlider-valueLabel': {
                top: 130,
                // background: 'green',
                // borderRadius: '10px',
                // opacity: '50^'
              },
            },
            '& .MuiSlider-valueLabel': {
              position: 'fixed',
              fontSize: 12,
              fontWeight: 'normal',
              // top: 70,
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

import type { StoryObj } from '@storybook/react';

import Box from '../Box';
import Grid from '../Grid';

const meta = {
  title: 'Components/Layouts/Grid',
  component: Grid,
  args: {
    gap: 8,
    columns: 6,
    rows: 5,
  },
  argTypes: {
    gap: {
      control: {
        type: 'number',
      },
    },
  },
};

export const Base: StoryObj<typeof meta> = {
  render: props => {
    const style = { background: '#6366f1', minHeight: 80, borderRadius: 8 };

    return (
      <Grid {...props} style={{ color: '#fff', fontWeight: 600, height: '100%' }}>
        <Grid.Item col={{ sm: 1, md: 4 }}>
          <Box style={style}>1</Box>
        </Grid.Item>
        <Grid.Item>
          <Box style={style}>2</Box>
        </Grid.Item>
        <Grid.Item row={{ sm: 1, md: 3 }}>
          <Box style={style}>3</Box>
        </Grid.Item>
        <Grid.Item col={{ md: 2 }} row={{ xs: 2 }}>
          <Box style={style}>4</Box>
        </Grid.Item>
        <Grid.Item col={{ md: 2 }} row={{ xs: 2, sm: 1, md: 2 }}>
          <Box style={style}>5</Box>
        </Grid.Item>
        <Grid.Item row={{ xs: 2, sm: 1, md: 2 }}>
          <Box style={style}>6</Box>
        </Grid.Item>
        <Grid.Item col={{ md: 1 }} row={{ lg: 2 }}>
          <Box style={style}>7</Box>
        </Grid.Item>
        <Grid.Item col={{ sm: 2, md: 1 }} row={{ lg: 2 }}>
          <Box style={style}>8</Box>
        </Grid.Item>
        <Grid.Item col={{ sm: 2, md: 4 }} row={{ sm: 1, lg: 2 }}>
          <Box style={style}>9</Box>
        </Grid.Item>
      </Grid>
    );
  },
};

export default meta;

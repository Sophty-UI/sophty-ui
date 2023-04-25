import type { StoryObj } from '@storybook/react';

import Box from '../Box';
import Flex from '../Flex';

const meta = {
  title: 'Components/Layouts/Row',
  component: Flex.Row,
  args: {
    gap: 8,
    reverse: false,
  },
};

export const Base: StoryObj<typeof meta> = {
  render: props => {
    const style = { background: '#6366f1', minHeight: 80, borderRadius: 8 };

    return (
      <Flex.Row {...props}>
        <Flex.Col span={24}>
          <Box style={style}>Column 24</Box>
        </Flex.Col>

        <Flex.Col span={12}>
          <Box style={style}>Column 12</Box>
        </Flex.Col>
        <Flex.Col span={12}>
          <Box style={style}>Column 12</Box>
        </Flex.Col>

        <Flex.Col span={8}>
          <Box style={style}>Column 8</Box>
        </Flex.Col>
        <Flex.Col span={8}>
          <Box style={style}>Column 8</Box>
        </Flex.Col>
        <Flex.Col span={8}>
          <Box style={style}>Column 8</Box>
        </Flex.Col>

        <Flex.Col span={6}>
          <Box style={style}>Column 6</Box>
        </Flex.Col>
        <Flex.Col span={6}>
          <Box style={style}>Column 6</Box>
        </Flex.Col>
        <Flex.Col span={6}>
          <Box style={style}>Column 6</Box>
        </Flex.Col>
        <Flex.Col span={6}>
          <Box style={style}>Column 6</Box>
        </Flex.Col>
      </Flex.Row>
    );
  },
};

export default meta;

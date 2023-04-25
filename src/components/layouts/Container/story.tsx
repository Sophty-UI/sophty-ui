import type { StoryObj } from '@storybook/react';

import Box from '../Box';
import Container from '../Container';

const meta = {
  title: 'Components/Layouts/Container',
  component: Container,
};

export const Base: StoryObj<typeof meta> = {
  render: () => (
    <Container style={{ background: '#6366f1' }}>
      <Box style={{ background: '#312e81', padding: '40px 0', color: '#fff' }}>Header</Box>
    </Container>
  ),
};

export default meta;

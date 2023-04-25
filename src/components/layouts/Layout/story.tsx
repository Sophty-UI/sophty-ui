import type { StoryObj } from '@storybook/react';

import Area from '../Area';
import Box from '../Box';
import Layout from '../Layout';

enum Variants {
  Base = 'Base',
  Navigation = 'Navigation',
  Sidebar = 'Sidebar',
  Grid = 'Custom',
}

const meta = {
  title: 'Components/Layouts/Layout',
  component: Layout,
  args: {
    gap: 4,
    template: Variants.Base,
  },
  argTypes: {
    gap: {
      control: {
        type: 'number',
      },
    },
    template: {
      name: 'template (presets)',
      options: [...Object.values(Variants)],
      mapping: {
        [Variants.Base]: [
          ['header', 'header'],
          ['content', 'content'],
          ['footer', 'footer'],
        ],
        [Variants.Navigation]: [
          ['header', 'header'],
          ['navigation', 'content'],
          ['footer', 'footer'],
        ],
        [Variants.Sidebar]: [
          ['header', 'header'],
          ['content', 'sidebar'],
          ['footer', 'footer'],
        ],
        [Variants.Grid]: [
          ['navigation', 'header', 'header'],
          ['navigation', 'content', 'sidebar'],
          ['footer', 'footer', 'sidebar'],
        ],
      },
      control: {
        type: 'inline-radio',
      },
    },
  },
};

export const Base: StoryObj<typeof meta> = {
  render: ({ gap, template }) => {
    const map = template.flat();

    return (
      <Layout template={template} gap={gap} style={{ color: '#fff', fontWeight: 600 }}>
        {map.includes('header') && (
          <Area area="header" semantic="header" height={80}>
            <Box style={{ background: '#6366f1' }}>Header</Box>
          </Area>
        )}
        {map.includes('navigation') && (
          <Area area="navigation" width={200} semantic="nav">
            <Box style={{ background: '#4338ca' }}>Navigation</Box>
          </Area>
        )}
        {map.includes('content') && (
          <Area area="content" width="1fr" height={200} semantic="main">
            <Box style={{ background: '#312e81' }}>Content</Box>
          </Area>
        )}
        {map.includes('sidebar') && (
          <Area area="sidebar" width={200} semantic="aside">
            <Box style={{ background: '#4338ca' }}>Sidebar</Box>
          </Area>
        )}
        {map.includes('footer') && (
          <Area area="footer" height={80} semantic="footer">
            <Box style={{ background: '#6366f1' }}>Footer</Box>
          </Area>
        )}
      </Layout>
    );
  },
};

export default meta;

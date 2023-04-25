import type { StoryObj } from '@storybook/react';

import { useState } from 'react';

import ResizeObserver, { ISize } from '../ResizeObserver';

const meta = {
  title: 'Components/Utilities/ResizeObserver',
  component: ResizeObserver,
};

export const Base: Omit<StoryObj<typeof meta>, 'args'> = {
  render: () => {
    const [size, setSize] = useState<ISize | undefined>();

    return (
      <ResizeObserver onResize={xxx => setSize(xxx)}>
        <div
          style={{
            background: '#312e81',
            padding: 40,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 32px)',
          }}
        >
          <span>Width: {size?.width}</span>
          <span>Height: {size?.height}</span>
        </div>
      </ResizeObserver>
    );
  },
};

export default meta;

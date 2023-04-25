import { forwardRef, useMemo, useState } from 'react';

import OverflowObserver from '../OverflowObserver';

const meta = {
  title: 'Components/Utilities/OverflowObserver',
  component: OverflowObserver,
  args: {
    count: 0,
  },
  argTypes: {
    count: { control: 'inline-radio', options: [0, 1, 2, 3, 5, 10, 20, 100] },
  },
  parameters: {
    controls: {
      include: /count/g,
    },
  },
};

const Item = forwardRef<HTMLDivElement, { name: string }>(({ name }, ref) => (
  <div ref={ref} style={{ padding: '0 12px', backgroundColor: '#cbd5e1', color: '#fff', height: 64 }}>
    <div
      style={{
        backgroundColor: '#475569',
        padding: 4,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {name}
    </div>
  </div>
));

export const Base = {
  render: ({ count }: { count: number }) => {
    const [hiddenCount, setHiddenCount] = useState(0);
    const items = useMemo(() => new Array(count).fill(undefined).map((_, i) => ({ name: `Label ${i}` })), [count]);

    return (
      <div
        style={{
          backgroundColor: '#f1f1f1',
          padding: 8,
          width: '100%',
          height: 'calc(100vh - 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ backgroundColor: '#fff', padding: 8, width: 400, height: 80 }}>
          <OverflowObserver
            element="div"
            nodes={items.map(item => ({ ...item }))}
            rest={<div style={{ whiteSpace: 'nowrap' }}>...({hiddenCount})</div>}
            options={{ component: Item, field: 'name' }}
            onChange={setHiddenCount}
          />
        </div>
      </div>
    );
  },
};

export default meta;

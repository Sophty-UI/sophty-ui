import { forwardRef, ForwardRefRenderFunction } from 'react';

import { IBoxProps } from '../../../../../types/box';

const Rest: ForwardRefRenderFunction<HTMLDivElement, IBoxProps> = (props, ref) => (
  <div {...props} ref={ref}>
    ...
  </div>
);

export default forwardRef(Rest);

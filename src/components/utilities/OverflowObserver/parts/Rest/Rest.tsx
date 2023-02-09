import { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react';

import { INodeBaseProps } from '../Node';

const Rest: ForwardRefRenderFunction<HTMLDivElement, INodeBaseProps> = (
  { ...props }: INodeBaseProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div {...props} ref={ref}>
    ...
  </div>
);

export default forwardRef(Rest);

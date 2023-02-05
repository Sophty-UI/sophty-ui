import { ForwardedRef, forwardRef, ReactElement } from 'react';

import { IOverflowNodeProps } from '../types/node';

const Rest = ({ ...props }: IOverflowNodeProps, ref: ForwardedRef<HTMLDivElement>): ReactElement => (
  <div {...props} ref={ref}>
    ...
  </div>
);

export default forwardRef<HTMLDivElement, IOverflowNodeProps>(Rest);

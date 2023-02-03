import { ForwardedRef, forwardRef, ReactElement } from 'react';

import { INodeExtendProps } from './Node';

export interface IRestProps extends INodeExtendProps {}

function Rest({ ...props }: IRestProps, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  return (
    <div {...props} ref={ref}>
      ...2222
    </div>
  );
}

export default forwardRef<HTMLDivElement, IRestProps>(Rest);

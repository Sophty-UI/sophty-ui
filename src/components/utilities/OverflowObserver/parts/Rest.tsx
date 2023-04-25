import { forwardRef } from 'react';

import { IBox } from '~/types/box';

export default forwardRef<HTMLDivElement, IBox>(({ children, ...props }, ref) => (
  <div {...props} ref={ref}>
    {children}
  </div>
));

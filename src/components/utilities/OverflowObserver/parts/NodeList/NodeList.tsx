import { FC, ForwardRefExoticComponent, Key } from 'react';

import Node, { INodeBaseProps, INodeEvents } from '../Node';

export interface INodeListProps extends INodeEvents {
  component: ForwardRefExoticComponent<INodeBaseProps>;
  count?: number;
  nodes: [Key, INodeBaseProps][];
}

const NodeList: FC<INodeListProps> = ({ nodes, count = 0, ...props }: INodeListProps) => (
  <>
    {nodes.map(([id, node], index) => (
      <Node {...props} id={id} key={id} order={index} properties={node} display={index <= count} />
    ))}
  </>
);

export default NodeList;

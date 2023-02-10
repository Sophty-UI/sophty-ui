import { FC, Key } from 'react';

import Node, { INodeEvents, INodeProps } from '../Node';

export interface INodeListProps extends INodeEvents {
  component: INodeProps['component'];
  count?: number;
  nodes: [Key, any][];
}

const NodeList: FC<INodeListProps> = ({ nodes, count = 0, ...props }) => (
  <>
    {nodes.map(([id, node], index) => (
      <Node {...props} id={id} key={id} order={index} properties={node} display={index <= count} />
    ))}
  </>
);

export default NodeList;

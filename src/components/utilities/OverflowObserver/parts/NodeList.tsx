import { Key, ReactElement } from 'react';

import Node, { INodeEvents, INodeProps } from './Node';

export interface INodeListProps<T, P> extends INodeEvents {
  component: INodeProps<T, P>['component'];
  count?: number;
  nodes: [Key, INodeProps<T, P>['properties']][];
}

const NodeList = <T, P = unknown>({ nodes, count = 0, ...props }: INodeListProps<T, P>): ReactElement<P> => (
  <>
    {nodes.map(([id, properties], index) => (
      <Node {...props} id={id} key={id} order={index} properties={properties} display={index <= count} />
    ))}
  </>
);

export default NodeList;

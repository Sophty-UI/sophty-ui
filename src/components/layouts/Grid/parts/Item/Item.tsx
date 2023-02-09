import { IBoxProps } from '../../../../../types/box';
import { IFlexSpan } from '../../../../../types/flex';

export interface IItemPrivateProps {
  _columnEnd?: number;
  _columnStart?: number;
}

export interface IItemProps extends IBoxProps {
  span?: IFlexSpan;
}

const Item = ({ children, style, _columnStart, _columnEnd, span, ...props }: IItemProps & IItemPrivateProps) => {
  if (typeof span !== 'number' || typeof _columnStart !== 'number' || typeof _columnEnd !== 'number') {
    throw new Error('Use Grid.Item only inside Grid container');
  }

  return (
    <div
      {...props}
      style={{
        ...style,
        gridColumn: `${_columnStart} / ${Math.min(_columnStart + span, _columnEnd + 1)}`,
      }}
    >
      {children}
    </div>
  );
};

export default Item;

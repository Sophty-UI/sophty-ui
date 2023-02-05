import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { IBoxProps } from '../../../../../types/box';
import Option, { IOptionChild, IOptionsEvents } from '../Option';
import styles from './style.module.scss';

export interface IGroupProps extends Omit<IBoxProps<IOptionChild>, keyof IOptionsEvents>, IOptionsEvents {
  disabled?: boolean;
  selectedValue?: string;
  title?: string;
}

const Group = ({ title, disabled, selectedValue, children, ...events }: IGroupProps): ReactElement | null => {
  const options = useMemo(
    () =>
      Children.map(children, child =>
        cloneElement(child, {
          onChange: events.onChange,
          ...(child.type.name === Option.name
            ? { disabled: disabled ?? child.props.disabled, selected: child.props.value === selectedValue }
            : {}),
        })
      ),
    [children, disabled]
  );

  return options ? (
    <li className={styles.group} role="presentation" tabIndex={-1}>
      <span role="presentation" title={title} className={styles.title}>
        {title}
      </span>
      <ul className={styles.body} role="group">
        {options}
      </ul>
    </li>
  ) : null;
};

export default Group;

import { Children, FC, isValidElement, useMemo } from 'react';

import { IBoxProps } from '../../../../../types/box';
import useDropdownContext from '../../contexts/DropdownContext';
import { GroupProvider } from '../../contexts/GroupContext';
import styles from './style.module.scss';

export interface IGroupProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  title?: string;
}

const Group: FC<IGroupProps> = ({ title, disabled, children }) => {
  /*
  const [, searchValue] = useDropdownContext();

  console.log(children);

  const values = useMemo(() => {
    const result: string[] = [];

    Children.forEach(children, child => {
      if (isValidElement(child) && child?.props) {
        const a = typeof children === 'string' ? children : child?.props.label ?? child?.props.value;

        result.push(child.props.value);
      }
    });

    return result;
  }, [children, disabled]);
  */

  // TODO: add groups filtering and hide if all children is hide

  return children ? (
    <li className={styles.group} role="presentation" tabIndex={-1}>
      <span role="presentation" title={title} className={styles.title}>
        {title}
      </span>
      <ul className={styles.body} role="group">
        <GroupProvider disabled={disabled}>{children}</GroupProvider>
      </ul>
    </li>
  ) : null;
};

export default Group;

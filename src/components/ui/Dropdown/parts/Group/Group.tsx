import { Children, cloneElement, FC, FunctionComponentElement, isValidElement, Key, useMemo, useState } from 'react';

import { IBoxProps } from '../../../../../types/box';
import { GroupProvider } from '../../contexts/GroupContext';
import { IOptionProps } from '../Option';
import styles from './style.module.scss';

export interface IGroupProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  key: Key;
  title?: string;
}

const Group: FC<IGroupProps> = ({ title, disabled, ...props }) => {
  // FIXME: fix filtering
  const [keys, setKeys] = useState<Key[]>([]);
  const [count, children] = useMemo(() => {
    let _count = 0;
    const _children = Children.map(props.children, child => {
      if (isValidElement(child) && child.key && typeof child.type !== 'string') {
        _count++;

        return cloneElement(child as FunctionComponentElement<IOptionProps>, { _key: child.key });
      }

      return child;
    });

    return [_count, _children];
  }, [props.children]);

  const handleFilter = (key: Key, filter: boolean): void => {
    setKeys(items => (filter ? [...items, key] : items.filter(item => item !== key)));
  };

  return children && keys.length !== count ? (
    <li className={styles.group} role="presentation" tabIndex={-1}>
      <span role="presentation" title={title} className={styles.title}>
        {title}
      </span>
      <ul className={styles.body} role="group">
        <GroupProvider disabled={disabled} onFilter={handleFilter}>
          {children}
        </GroupProvider>
      </ul>
    </li>
  ) : null;
};

export default Group;

import { IBoxProps } from '../../../../../types/box';
import { GroupProvider } from '../../contexts/GroupContext';
import styles from './style.module.scss';

export interface IGroupProps extends IBoxProps<HTMLLIElement> {
  disabled?: boolean;
  title?: string;
}

const Group = ({ title, disabled, children }: IGroupProps) =>
  children ? (
    <li className={styles.group} role="presentation" tabIndex={-1}>
      <span role="presentation" title={title} className={styles.title}>
        {title}
      </span>
      <ul className={styles.body} role="group">
        <GroupProvider disabled={disabled}>{children}</GroupProvider>
      </ul>
    </li>
  ) : null;

export default Group;

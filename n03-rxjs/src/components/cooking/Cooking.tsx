// import { useSelector, useDispatch } from 'react-redux'
import styles from './Cooking.module.scss';

interface Props {
  name: string,
  label: string,
  id: string
}
export const Cooking: React.FC<Props> = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.mini}>id: {props.id}</div>
      <div className={styles.textBox}>{props.name}: {props.label}</div>
    </div>
  );
};

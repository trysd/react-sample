import styles from './Cooking.module.scss';
import { ReactComponent as ChefIcon } from "../../icons/chef.svg";

export type CookingX = {
  [keys: string]: {
    name: string;
    label: string;
    id: string
    customerId: string
  }
};

interface Props {
  cooking: CookingX[string]
}
export const Cooking: React.FC<Props> = (props) => {
  return (
    <div className={styles.main}>


      <div className={styles.mini}>id: {props.cooking.id}, customerId: {props.cooking.customerId}</div>

      <div className={styles.menuName}>{props.cooking.name}</div>

      <div className={styles.chefBox}>
        <div className={styles.ChefIconWrapper}>
          <ChefIcon style={{ stroke: 'gray', fill: 'lightblue', width: '32px', height: '32px' }} />
        </div>
        <div>
          <div className={styles.textBox}>{props.cooking.label}</div>
        </div>
      </div>
    </div>
  );
};

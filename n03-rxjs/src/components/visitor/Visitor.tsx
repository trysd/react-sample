import styles from './Visitor.module.scss';
import { ReactComponent as SelectIcon } from "../../icons/select.svg";
import { ReactComponent as WaitIcon } from "../../icons/wait.svg";
import { ReactComponent as EatingIcon } from "../../icons/eating.svg";
import { Menu } from '../../class/Menu';

export interface VisitorX {
  [keys: string]: {
    menu: Menu,
    status: 'select' | 'wait' | 'eating',
    id: string
  }
};

interface Props {
  visitorX: VisitorX[string]
}
export const Visitor: React.FC<Props> = (props) => {

  return (
    <div className={styles.main}>
      {
        {
          "select": <SelectIcon />,
          "wait": <WaitIcon />,
          "eating": <EatingIcon />
        }[props.visitorX.status]
      }
      {
        {
          "select": <div className={styles.message}>choosing food..</div>,
          "wait": <div className={styles.message}>waiting for {props.visitorX.menu.name}</div>,
          "eating": <div className={styles.message}>eating {props.visitorX.menu.name}</div>
        }[props.visitorX.status]
      }
    </div>
  );
};

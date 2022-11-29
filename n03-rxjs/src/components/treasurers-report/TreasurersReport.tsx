import type { RootSalesState } from '../../store/sales/store-sales'
import { useSelector } from 'react-redux'
import styles from './TreasurersReport.module.scss';

export const TreasurersReport = () => {
  // global store
  const sales = useSelector((state: RootSalesState) => state.sales.value)
  const numberOfMenu = useSelector((state: RootSalesState) => state.sales.numberOfMenu)

  return (
    <div className={styles.main}>
      <h2>Treasurer's report:</h2>
      <div className={styles.textBox}>
        {sales.valueOf().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
      <div className={styles.numberOfMenuWrapper}>
        {
          Object.keys(numberOfMenu).map(key => {
            return <div className={styles.numberOfMenu} key={Math.random().toString(32).substring(2)}>
              {key}: {numberOfMenu[key].order}
            </div>
          })
        }
      </div>
    </div>
  );
};

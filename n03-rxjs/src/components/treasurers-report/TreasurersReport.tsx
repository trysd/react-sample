import type { RootSalesState } from '../../store/sales/store-sales'
import { useSelector } from 'react-redux'
import styles from './TreasurersReport.module.scss';

export const TreasurersReport = () => {
  // global store
  const sales = useSelector((state: RootSalesState) => state.sales.value)

  return (
    <div className={styles.main}>
      <h2>Treasurer's report:</h2>
      <p className={styles.textBox}>
        { sales.valueOf().toLocaleString('en-US', {style:'currency', currency: 'USD'}) }
      </p>
    </div>
  );
};

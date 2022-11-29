import { useEffect, useState } from "react";
import { pairwise, Subscription } from "rxjs";
import { Menu } from "../../class/Menu";
import { FoodOrderCore, FoodOrderNotice } from "../../rxjs/FoodOrderNotice";
import { OrderRequestStore } from "../../rxjs/OrderStore";
import { Visitor, VisitorX } from "../visitor/Visitor";
import styles from './DiningHall.module.scss';

import type { RootSalesState } from '../../store/sales/store-sales'
import { useSelector, useDispatch } from 'react-redux'
import { addSales } from '../../store/sales/slice-sales'

export const DiningHall = () => {

  // local store
  const [visitorX, setVisitorX] = useState<VisitorX>({});
  let visitorLocal: VisitorX = {};

  // global store
  const sales = useSelector((state: RootSalesState) => state.sales.value)
  const dispatch = useDispatch()

  // store
  let order$: Subscription;
  const _notice: FoodOrderNotice = FoodOrderNotice.instance();
  const _order: OrderRequestStore = OrderRequestStore.instance();

  let numberOfVisitor = 0;

  // 
  useEffect(() => {
    // constructive

    // compleat detecter
    order$ = _order.stream.order.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {
      _order.compleatExtractor(prev, curr).forEach(f => {

        // order arrived
        visitorLocal[f.customerId].status = 'eating';
        setVisitorX({ ...visitorLocal })

        // compleat
        setTimeout(() => {
          delete visitorLocal[f.customerId]
          setVisitorX({ ...visitorLocal })
          numberOfVisitor--;
          // payment
          dispatch(addSales(f.menu.price));
        }, import.meta.env.VITE_EATING_TIME);

      });
    });

    // order request
    const orderRequest = () => {

      // Decide on the number of guests and the menu
      const orderList = (new Array(Math.floor(Math.random() * 4) + 1).fill(0)).map((f, i) => {

        numberOfVisitor++;

        // menu and ID.
        const mKeyList = Object.keys(Menu);
        const mVal = Menu[mKeyList[Math.floor(Math.random() * mKeyList.length)] as keyof typeof Menu];
        const id = Math.random().toString(32).substring(2);
        // console.log( mVal.name, id )

        // add visitor
        visitorLocal = {
          ...visitorLocal,
          ...{
            [id]: {
              menu: mVal,
              status: 'select',
              id: id
            }
          }
        };

        // return order object
        return {
          menu: mVal,
          customerId: id
        } as FoodOrderCore

      });
      setVisitorX({ ...visitorLocal })

      // order
      setTimeout(() => {

        // request order
        _notice.set({
          order: orderList
        });
        orderList.forEach(f => visitorLocal[f.customerId].status = 'wait');
        setVisitorX({ ...visitorLocal })

      }, 1500);

      // next visitor
      if (numberOfVisitor < import.meta.env.VITE_MAX_VISITOR) {
        setTimeout(() => {
          orderRequest();
        }, Math.floor(Math.random() * 1000) + 4000);
      }
    }
    orderRequest();

    return () => {
      // destructive
      order$.unsubscribe();
    };
  }, [])

  return (
    <div className={styles.main}>
      <h2>DiningHall:</h2>
      <div className="visitorList">
        {
          Object.keys(visitorX).map(key => {
            return <Visitor key={visitorX[key].id} visitorX={visitorX[key]} />
          })
        }
      </div>
    </div>
  );
};

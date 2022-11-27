import { useEffect, useState } from 'react';
import { OrderRequestStore, ProgressType } from '../../rxjs/OrderStore';
import { pairwise, Subscription } from 'rxjs';
import { Cooking } from '../cooking/';
import styles from './Kitchen.module.css';

type CookingX = {
  [keys: string]: {
    name: string;
    label: string;
    id: string
  }
};

export const Kitchen = () => {

  // local store
  const [cooking2, setCooking2] = useState<CookingX>({});

  // global store
  const _orderStatus = OrderRequestStore.instance();
  let orderStatus$: Subscription | null = null;

  useEffect(() => {
    // constructive
    let nextView2: CookingX = {} as any;

    orderStatus$ = _orderStatus.stream.order.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {

      const nextView: { name: string; id: string }[] = [];

      _orderStatus.orderStatusExtractor2(prev, curr).forEach(f => {
        // console.log(f)
        nextView2 = {
          ...nextView2,
          ...{
            [f.id]: {
              name: f.name,
              label: f.label || '',
              id: f.id
            }
          }
        };
        setCooking2(nextView2)

        // 個々の処理
        switch (f.progressType) {
          case (ProgressType.Compleat):
            delete nextView2[f.id]; // "盛り付け"が瞬時に消えてしまう
        }
      });
    })
    return () => {
      // destructive
      (orderStatus$ as Subscription).unsubscribe();
    };
  }, [])

  return (
    <div>
      <h2>Kitchen:</h2>
      <div>
        {
          Object.keys(cooking2).map(
            k => <Cooking 
              key={cooking2[k].id}
              name={cooking2[k].name}
              label={cooking2[k].label}
              id={cooking2[k].id} />
          )
        }
        {
          Object.keys(cooking2).length == 0 && <div>waiting for order..</div>
        }
      </div>
    </div>
  );
};

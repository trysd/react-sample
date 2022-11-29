import { useEffect, useState } from 'react';
import { OrderRequestStore, ProgressType } from '../../rxjs/OrderStore';
import { pairwise, Subscription } from 'rxjs';
import { Cooking } from '../cooking/';
import { CookingX } from '../cooking/Cooking';
// import styles from './Kitchen.module.css';

export const Kitchen = () => {

  // local store
  const [cooking, setCooking] = useState<CookingX>({});

  // global store
  const _orderStatus = OrderRequestStore.instance();
  let orderStatus$: Subscription;

  useEffect(() => {
    // constructive

    // 
    let cookingLocal: CookingX = {} as any;

    orderStatus$ = _orderStatus.stream.order.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {

      _orderStatus.orderStatusExtractor(prev, curr).forEach(f => {
        // console.log(f)
        cookingLocal = {
          ...cookingLocal,
          ...{
            [f.id]: {
              name: f.menu.name,
              label: f.label || '',
              id: f.id,
              customerId: f.customerId
            }
          }
        };

        // compleat
        if (f.progressType === ProgressType.Compleat) {
          delete cookingLocal[f.id]; 
        }

        setCooking(cookingLocal)
      });
    })
    return () => {
      // destructive
      orderStatus$.unsubscribe();
    };
  }, [])

  return (
    <div>
      <h2>Kitchen:</h2>
      <p>Maximum number of cooks: { import.meta.env.VITE_MAX_COOKING }</p>
      <div>
        {
          Object.keys(cooking).map(
            k => <Cooking key={cooking[k].id} cooking={cooking[k]} />
          )
        }
        {
          Object.keys(cooking).length == 0 && <div>waiting for order..</div>
        }
      </div>
    </div>
  );
};

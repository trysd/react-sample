import { OrderRequestStore } from '../rxjs/OrderStore';

import { Menu } from "../class/Menu";
import { FoodOrderNotice as FoodOrderNotice } from "../rxjs/FoodOrderNotice";
import { filter, take } from 'rxjs';

export class Kitchen {
  private static _instance: Kitchen;
  private constructor() {
    // start
    this.startAcceptingOrders();
  }
  public static instance(): Kitchen {
    if (!this._instance) this._instance = new Kitchen();
    return this._instance;
  }

  private _notice: FoodOrderNotice = FoodOrderNotice.instance();
  private _order: OrderRequestStore = OrderRequestStore.instance();
  private numberOfCooking = 0;

  private startAcceptingOrders(): void {

    const maxNumberOfCooks = import.meta.env.VITE_MAX_COOKING;

    // detect order notice
    this._notice.stream.order.subscribe(order => {
      // Process for each menu
      order.forEach(async notice => {
        const menu = notice.menu;

        // wait for a chef
        while (true) {
          if (this.numberOfCooking < maxNumberOfCooks) {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        this.numberOfCooking++;

        // Determine the ID first
        const id = Math.random().toString(32).substring(2)

        // A one-time subscribe that confirms the addition of that ID.
        // It is a countermeasure that is not processed in order because it is added asynchronously.
        this._order.stream.order.pipe(
          filter(f => f[id] !== undefined),
          take(1)
        ).subscribe(e => {
          this.startCooking(id);
        })

        // Reserve an additional ID order
        this._order.queue('order', store => {
          return {
            ...store,
            ...{
              [id]: {
                menu: menu,
                progress: 0,
                id: id,
                customerId: notice.customerId
              }
            }
          }
        });

      }); // _order.forEach
    }); // _notice.subscribe
  }

  // cooking start
  startCooking(id: string): void {
    const obj = (this._order.value('order') || {})[id];

    // Cook recursively.
    const cooking = (progress: number, menu: Menu = obj.menu) => {

      // Overwrite using merge
      this._order.merge('order', {
        [id]: {
          menu,
          progress,
          id,
          customerId: obj.customerId
        }
      })

      if (menu.process.length - 1 > progress) {
        setTimeout(() => {
          cooking(++progress)
        }, menu.process[progress].timeItTakes);
      } else {

        setTimeout(() => {
          this._order.queue('order', (store) => {
            delete store[id];
            return store;
          });
          this.numberOfCooking--;
        }, 1300);
      }
    }
    cooking(obj.progress)
  }

}

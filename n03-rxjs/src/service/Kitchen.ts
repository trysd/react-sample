import { OrderRequestStore } from '../rxjs/OrderStore';

import { Menu } from "../class/Menu";
import { FoodOrderNotice as FoodOrderNotice } from "../rxjs/FoodOrderNotice";
import { filter, take } from 'rxjs';

export class Kitchen {
  private static _instance: Kitchen;
  private constructor() {
    // start
    this.startAcceptingOrders();
    // order(test)
    setTimeout(() => {
      this._notice.set({
        // "order": [Menu.Curry, Menu.Pasta, Menu.Curry, Menu.Pasta]
        order: [
          { menu: Menu.Curry, customerId: "test" },
          { menu: Menu.Pasta, customerId: "test" },
          { menu: Menu.Curry, customerId: "test" },
        ]
      });
    }, 500);
  }
  public static instance(): Kitchen {
    if (!this._instance) this._instance = new Kitchen();
    return this._instance;
  }

  private _notice: FoodOrderNotice = FoodOrderNotice.instance();
  private _order: OrderRequestStore = OrderRequestStore.instance();

  private startAcceptingOrders(): void {

    const maxNumberOfCooks = 2;

    const kitchenQueue = [];

    // detect order notice
    this._notice.stream.order.subscribe(order => {
      // Process for each menu
      order.forEach(x => {

        const f = x.menu;

        // ここでqueueに


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
                menu: f,
                progress: 0,
                id: id
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
          id
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
        }, 1300);
      }
    }
    cooking(obj.progress)
  }

}

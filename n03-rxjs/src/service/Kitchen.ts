import { OrderStatusStore } from './../rxjs/OrderStatusStore';

import { Menu } from "../class/Menu";
import { FoodOrderNotice as FoodOrderNotice } from "../rxjs/FoodOrderNotice";
import { filter, pairwise, take } from 'rxjs';

export class Kitchen {
  private static _instance: Kitchen;
  private constructor() {
    // start
    this.startAcceptingOrders();
    // order(test)
    this._notice.set({
      "order": [Menu.Curry, Menu.Pasta]
    });
  }
  public static instance(): Kitchen {
    if (!this._instance) this._instance = new Kitchen();
    return this._instance;
  }

  private _notice: FoodOrderNotice = FoodOrderNotice.instance();
  private _order: OrderStatusStore = OrderStatusStore.instance();

  private startAcceptingOrders(): void {

    // cooking status observer.
    // Samples received on the "component side".
    this._order.stream.order.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {

      // detect start
      Object.keys(curr).forEach(
        f => {
          if (curr[f] !== undefined && prev[f] === undefined) {
            console.log("#start: " + curr[f].menu.name + " - " + curr[f].id)
          }
        }
      );

      // detect progress
      const progressList = Object.keys(curr).filter(
        f => JSON.stringify(curr[f]) !== JSON.stringify(prev[f])
      ).map(key => curr[key]);
      progressList.forEach(
        x => {
          console.log(x.menu.name + `(${x.progress})` + ' - ' + x.menu.process[x.progress].label);
        }
      );

      // detect compleat
      Object.keys(prev).forEach(
        f => {
          if (curr[f] === undefined && prev[f] !== undefined) {
            console.log("#compleat: " + prev[f].menu.name + " - " + prev[f].id)
          }
        }
      );
    })

    // detect order notice
    this._notice.stream.order.subscribe(order => {

      // Process for each menu
      order.forEach(f => {

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
        this._order.queue('order', (store) => {
          delete store[id];
          return store;
        })
      }
    }
    cooking(obj.progress)
  }

}

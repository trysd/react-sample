import { OrderStatusStore } from './../rxjs/OrderStatusStore';

import { Menu } from "../class/Menu";
import { FoodOrderNotice as FoodOrderNotice } from "../rxjs/FoodOrderNotice";
import { skip } from 'rxjs';

export class Kitchen {
  private static _instance: Kitchen;
  private constructor() {
    this.startAcceptingOrders();
  }
  public static instance(): Kitchen {
    if (!this._instance) this._instance = new Kitchen();
    return this._instance;
  }

  private notice_: FoodOrderNotice = FoodOrderNotice.instance();
  private status_: OrderStatusStore = OrderStatusStore.instance();

  private startAcceptingOrders(): void {

    // observer
    this.status_.stream.status.pipe(
      skip(1)
    ).subscribe(e => {
      console.log(e)
    })

    // observer
    this.notice_.stream.order.subscribe(order => {
      
      order.map(m => {
        return {
          menu: m,
          progress: 0
        }
      }).forEach(f => {
        this.status_.queue('status', (store) => [...store, f])
      })

    });

    // test order
    this.notice_.set({
      "order": [Menu.Curry, Menu.Pasta]
    });
  }

  


}

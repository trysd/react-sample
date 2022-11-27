import { BehaviorSubject } from "rxjs"
import { Menu } from "../class/Menu"
import { Store } from "./core/Store"

export interface OrderResponse {
  res: {
    [keys: string]: {
      customerId: string,
      menu: Menu
    }
  }
}

export class OrderStatusStore extends Store<OrderResponse> {
  private constructor() {
    super({
      res: {
        store: new BehaviorSubject({})
      }
    })
  }
  private static _instance: OrderStatusStore;
  public static instance(): OrderStatusStore {
    if (!this._instance) this._instance = new OrderStatusStore();
    return this._instance;
  }
}
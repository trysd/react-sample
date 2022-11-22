import { BehaviorSubject } from 'rxjs';
import { Menu } from '../class/Menu';
import { Store } from './core/Store';

export interface Status {
  menu: typeof Menu[keyof typeof Menu]
  progress: number
}

export interface OrderStatus {
  status: Status[]
}

export class OrderStatusStore extends Store<OrderStatus> {
  private constructor() {
    super({
      status: {
        store: new BehaviorSubject([])
      }
    })
  }
  private static _instance: OrderStatusStore;
  public static instance(): OrderStatusStore {
    if (!this._instance) this._instance = new OrderStatusStore();
    return this._instance;
  }
}
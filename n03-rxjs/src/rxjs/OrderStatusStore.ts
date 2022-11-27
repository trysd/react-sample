import { BehaviorSubject } from 'rxjs';
import { Menu } from '../class/Menu';
import { Store } from './core/Store';



export interface order {
  order: {
    [keys: string]: {
      menu: Menu, // typeof Menu[keyof typeof Menu],
      progress: number,
      id: string
    }
  }
}

export class OrderStatusStore extends Store<order> {
  private constructor() {
    super({
      order: {
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
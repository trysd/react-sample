import { Subject } from 'rxjs';
import { Menu } from '../class/Menu';
import { Store } from './core/Store';

export interface FoodOrder {
  // order: Menu[]
  order: {
    menu: Menu,
    customerId: string
  }[];
}

export class FoodOrderNotice extends Store<FoodOrder> {
  private static _instance: FoodOrderNotice;
  public static instance(): FoodOrderNotice {
    if (!this._instance) this._instance = new FoodOrderNotice();
    return this._instance;
  }
  private constructor() {
    super({
      order: {
        store: new Subject()
      },
    });
  }
}
import { Subject } from 'rxjs';
import { Menu } from 'src/class/Menu';
import { Store } from './core/Store';

export interface FoodOrder {
  order: typeof Menu[keyof typeof Menu][]
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
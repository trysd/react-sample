import { BehaviorSubject } from 'rxjs';
import { Menu } from '../class/Menu';
import { Store } from './core/Store';

export const ProgressType = {
  Start: "Start",
  CookingNow: "CookingNow",
  Compleat: "Compleat"
} as const;
type ProgressType = typeof ProgressType[keyof typeof ProgressType];

export interface orderCore {
  [keys: string]: {
    menu: Menu,
    progress: number,
    id: string,
    customerId: string
  }
}

// interface for this store
export interface order {
  order: orderCore
}

interface orderProgress {
  progressType: ProgressType,
  menu: Menu,
  label: string | null,
  id: string,
  customerId: string
}

export class OrderRequestStore extends Store<order> {
  // store define
  private constructor() {
    super({
      order: {
        store: new BehaviorSubject({})
      }
    })
  }
  // singleton support
  private static _instance: OrderRequestStore;
  public static instance(): OrderRequestStore {
    if (!this._instance) this._instance = new OrderRequestStore();
    return this._instance;
  }

  // Extraction example of specific processing "start, progress, compleat" set for each class
  public orderStatusExtractor(prev: order['order'], curr: order['order']): orderProgress[] {

    const statusList: orderProgress[] = []

    // detect start
    Object.keys(curr).forEach(
      f => {
        if (curr[f] !== undefined && prev[f] === undefined) {
          statusList.push({
            progressType: ProgressType.Start,
            menu: curr[f].menu,
            label: null,
            id: curr[f].id,
            customerId: curr[f].customerId
          });
        }
      }
    );

    // detect progress
    const progressList = Object.keys(curr).filter(
      f => JSON.stringify(curr[f]) !== JSON.stringify(prev[f])
    ).map(key => curr[key]);
    progressList.forEach(
      f => {
        statusList.push({
          progressType: ProgressType.CookingNow,
          menu: f.menu,
          label: f.menu.process[f.progress].label,
          id: f.id,
          customerId: f.customerId
        });
      }
    );

    // detect compleat
    Object.keys(prev).forEach(
      f => {
        if (curr[f] === undefined && prev[f] !== undefined) {
          statusList.push({
            progressType: ProgressType.Compleat,
            menu: prev[f].menu,
            label: null,
            id: prev[f].id,
            customerId: prev[f].customerId
          });
        }
      }
    );

    return statusList;
  }

  // Extraction example of specific processing "compleat" set for each class
  public compleatExtractor(prev: order['order'], curr: order['order']): orderProgress[] {

    const statusList: orderProgress[] = []

    // detect compleat
    Object.keys(prev).forEach(
      f => {
        if (curr[f] === undefined && prev[f] !== undefined) {
          statusList.push({
            progressType: ProgressType.Compleat,
            menu: prev[f].menu,
            label: null,
            id: prev[f].id,
            customerId: prev[f].customerId
          });
        }
      }
    );

    return statusList;
  }

}
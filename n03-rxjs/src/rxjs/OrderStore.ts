import { BehaviorSubject } from 'rxjs';
import { Menu } from '../class/Menu';
import { Store } from './core/Store';

export const ProgressType = {
  Start: "Start",
  CookingNow: "CookingNow",
  Compleat: "Compleat"
} as const;
type ProgressType = typeof ProgressType[keyof typeof ProgressType];

export interface order {
  order: {
    [keys: string]: {
      menu: Menu,
      progress: number,
      id: string
    }
  }
}

export class OrderRequestStore extends Store<order> {
  private constructor() {
    super({
      order: {
        store: new BehaviorSubject({})
      }
    })
  }
  private static _instance: OrderRequestStore;
  public static instance(): OrderRequestStore {
    if (!this._instance) this._instance = new OrderRequestStore();
    return this._instance;
  }

  // Extraction example of specific processing "start, progress, end" set for each class
  public orderStatusExtractor(prev: order['order'], curr: order['order']): string[] {

    const statusList: string[] = []

    // detect start
    Object.keys(curr).forEach(
      f => {
        if (curr[f] !== undefined && prev[f] === undefined) {
          statusList.push("#start: " + curr[f].menu.name + " - " + curr[f].id);
        }
      }
    );

    // detect progress
    const progressList = Object.keys(curr).filter(
      f => JSON.stringify(curr[f]) !== JSON.stringify(prev[f])
    ).map(key => curr[key]);
    progressList.forEach(
      p => {
        statusList.push(p.menu.name + `(${p.progress})` + ' - ' + p.menu.process[p.progress].label);
      }
    );

    // detect compleat
    Object.keys(prev).forEach(
      f => {
        if (curr[f] === undefined && prev[f] !== undefined) {
          statusList.push("#compleat: " + prev[f].menu.name + " - " + prev[f].id)
        }
      }
    );

    return statusList;
  }

  // Extraction example of specific processing "start, progress, end" set for each class
  public orderStatusExtractor2(prev: order['order'], curr: order['order']): {
    progressType: ProgressType,
    name: string,
    label: string | null,
    id: string
  }[] {

    const statusList: {
      progressType: ProgressType,
      name: string,
      label: string | null,
      id: string
    }[] = []

    // detect start
    Object.keys(curr).forEach(
      f => {
        if (curr[f] !== undefined && prev[f] === undefined) {
          statusList.push({
            progressType: ProgressType.Start,
            name: curr[f].menu.name,
            label: null,
            id: curr[f].id
          });
        }
      }
    );

    // detect progress
    const progressList = Object.keys(curr).filter(
      f => JSON.stringify(curr[f]) !== JSON.stringify(prev[f])
    ).map(key => curr[key]);
    progressList.forEach(
      x => {
        statusList.push({
          progressType: ProgressType.CookingNow,
          name: x.menu.name,
          label: x.menu.process[x.progress].label,
          id: x.id
        });
      }
    );

    // detect compleat
    Object.keys(prev).forEach(
      f => {
        if (curr[f] === undefined && prev[f] !== undefined) {
          statusList.push({
            progressType: ProgressType.Compleat,
            name: prev[f].menu.name,
            label: null,
            id: prev[f].id
          });
        }
      }
    );

    return statusList;
  }
}
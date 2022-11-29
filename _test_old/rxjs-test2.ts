import { BehaviorSubject, Observable } from "rxjs"

interface XStore {
  title: string,
  toggleA: boolean,
}

type basicStore<T> = {
  name: string,
}

export const StorePlan = {
  toggleA: {
    store: new BehaviorSubject(null),
    reducers: {
      push: (store) => store
    }
  }
}
type StorePlan = typeof StorePlan[keyof typeof StorePlan];
type StoreX = typeof StorePlan;

class StoreBase<StoreX> {
  constructor(base: StoreX) {
    
  }
}

class StoreClass extends StoreBase<typeof StorePlan> {
  constructor() {
    super(StorePlan)
  }
}


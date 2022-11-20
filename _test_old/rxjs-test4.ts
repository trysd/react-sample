import { storeAnimals } from './../store/animals/store-animals';
import { BehaviorSubject, Observable, UnaryFunction } from "rxjs";
type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type leastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = leastOne<{ [K in keyof T]?: T[K] }>;
export { }

// const func = Object.assign(
//   (num: number) => num ** 2,
//   {
//     foo: 123,
//     method: (arg: number) => func(arg * 10)
//   }
// );
// useObj(func);
// type MyObj = { foo: number };
// function useObj(obj: MyObj) {
//   console.log(obj.foo);
// }

const storeA = Object.assign({
  store: new BehaviorSubject<number>(1)
}, {
  reducers: {
    getStoreA: (newValue) => {
      const v = storeA.store.value;
      storeA.store.next(newValue)

    }
  }
});


class Base<T> {
  protected base: T = {} as any;
  constructor(base: T) {
    this.base = base;
  }
  getBase(): T {
    return this.base;
  }
  // getSubscribe(): T {
  //   return this.base
  // }
}

const StoreA = class extends Base<typeof storeA> {
  constructor() {
    super(storeA);
  }
  test(): void {
    const obs = this.getBase();

    console.log(obs.reducers.getStoreA(2))
  }
}





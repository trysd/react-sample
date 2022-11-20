import { BehaviorSubject, Observable } from "rxjs";

export {}
// type Reducers<T, K> = {
//   [key in keyof typeof red]: (...param: any[]) => T
// }
// const red2: Reducers<typeof Observable<typeof storeObs>, typeof red> = red;

/**
 * Variadic Tuple Types
 * <T, Rest extends readonly unknown[]>
 * https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#readonly%E3%81%AA%E9%85%8D%E5%88%97%E3%81%A8%E3%82%BF%E3%83%97%E3%83%AB
 */

type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type leastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = leastOne<{ [K in keyof T]?: T[K] }>;
type obj<T, K extends keyof T> = T[K]

type Get1<T> = {
  <K1 extends keyof T, K2 extends keyof T[K1] >(k1: K1, k2: K2): T[K1][K2]
}


class Base<T> {
  private base: T = {} as T;
  constructor(base: T) {
    this.base = base;
  }
  getTest<K extends keyof T>(key: K): T[K] {
    return this.base[key]
  }
  getStore: Get1<T> = (key, key2) => {
    return this.base[key][key2];
  }
  reducers<K extends keyof T>(key: K): Omit<T[K], 'store'> {
    return this.base[key]
  }
  reducers2<K extends keyof T>(key: K): Omit<T[K], 'store'> {
    return this.base[key]
  }
}





const StorePlan = {
  cat: {
    store: new BehaviorSubject("is cat"),
    reducers: {
      getCat: () => StorePlan.cat.store.value,
      setCat: (store, ...param) => store
    }
  },
  dog: {
    store: new BehaviorSubject(123),
    reducers: {
      getDog: (store, ...param) => store
    }
  }
}
type StorePlan = typeof StorePlan;
type RSet = (typeof StorePlan[keyof typeof StorePlan]);
type RSetAllReducers = RSet["reducers"]; // 全reducers(全く同じく書く必要あり)

export class PopStoreXXX extends Base<StorePlan> {
  constructor() {
    super(StorePlan);

    // console.log("getCat: ",super.getTest("cat").reducers.getCat());
    // this.getStore("dog", "reducers").getDog(999)
    // this.getStore("cat", "store")
    // this.store.cat.reducers.getCat()
    const x1 = this.reducers("cat").reducers.getCat()
    console.log(x1)
  }
}



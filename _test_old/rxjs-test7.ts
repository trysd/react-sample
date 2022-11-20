import { BehaviorSubject } from "rxjs"

export {}

interface Part {
  name: string,
  age: number,
  add(): number
}

const obj = {
  name: "kenji",
  age: 99,
  add: () => 1 * 2
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type result = FunctionPropertyNames<Part>

// ~~~


// type reducers = 'reducers';

type Reducers<T, K extends keyof T, U extends keyof T[K]> = T[K][U];
type c = Reducers<typeof sss, keyof typeof sss, 'reducers'>;


const sss = {
  menu: {
    reducers: {
      'aaa': 111,
      'bbb': "sss"
    }
  },
  box: {
    reducers: {
      'getBox': () => null
    }
  }
}


const rrr: c = sss.menu.reducers;


// ~~~~

type Get1<T> = {
  <K1 extends keyof T, K2 extends keyof T[K1] >(k1: K1, k2: K2): T[K1][K2]
}

type MessageOf<TK extends { reducers: unknown }> = TK["reducers"];


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

    const dn: Omit<T[K], 'store'> = this.base[key];

    type NameOrId<T, K extends keyof T> = Omit<T[K], 'store'> extends { "reducers": any }
      ? T[K]
      : never;

    // type MessageOf<TK extends { reducers: unknown }> = TK["reducers"];
    // this.base[key]['reducers'] as MessageOf<T[K]>
    // type FunctionPropertyNames<T> = {
    //   [K in keyof T]: T[K] extends Function ? K : never
    // }[keyof T]

    return this.base[key]['reducers']
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

type RSet = (typeof StorePlan[keyof typeof StorePlan]);
type RSetAllReducers = RSet["reducers"]; // 全reducers(全く同じく書く必要あり)

export class PopStoreXXX extends Base<typeof StorePlan> {
  constructor() {
    super(StorePlan);

    // console.log("getCat: ",super.getTest("cat").reducers.getCat());
    // this.getStore("dog", "reducers").getDog(999)
    // this.getStore("cat", "store")
    // this.store.cat.reducers.getCat()
    const x1 = this.reducers("dog").reducers
    console.log(x1)
  }
}


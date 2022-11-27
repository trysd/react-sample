import { BehaviorSubject, Observable, pipe, queueScheduler, Subject, UnaryFunction } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

type LeastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = LeastOne<{ [K in keyof T]?: T[K] | ((store: T[K]) => T[K]) }>;
type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type initBase<T> = {
  readonly [K in keyof T]: {
    store: Observable<T[K]>,
    pipe?: () => UnaryFunction<Observable<T[K]>, Observable<T[K]>>,
  }
};
type WrappedStore<T> = { readonly [K in keyof T]: Observable<T[K]> };

export class Store<T> {
  private initValues: { [key: string]: any } = {};
  protected base = {} as any;
  private ref: WrappedStore<T> = {} as any;
  constructor(base?: initBase<T>) {
    if (base) this.init(base)
  }
  private init(base: initBase<T>): WrappedStore<T> {
    if (Object.keys(this.base).length) throw 'cannot be initialized after being initialized';
    this.base = base;
    Object.keys(base).forEach((k) => this.initValues[k] = this.value(k as any));
    this.ref = Object.keys(this.base).reduce((previous, current) => {
      previous = {
        ...previous, ...{
          [current]: this.base[current].store.asObservable().pipe(
            this.base[current].pipe
              ? this.base[current].pipe()
              : tap()
          )
        }
      };
      return previous;
    }, {} as WrappedStore<T>);
    return this.ref;
  }
  reset<K extends keyof T>(): void {
    Object.keys(this.base).forEach((k) => this.queue(k as K, () => this.initValues[k]));
  }
  set(valOrFn: NeedAtLeastOne<T>): void {
    Object.keys(valOrFn).forEach((k) => {
      this.queue(k as keyof T, valOrFn[k as keyof T] as T[keyof T])
    });
  }
  queue<K extends keyof T>(key: K, state: T[K] | ((state: T[K]) => T[K])): void {
    queueScheduler.schedule(() => {
      (this.base[key].store as BehaviorSubject<T[K]>)
        .next(state instanceof Function ? state(this.value(key) as T[K]) : state)
    });
  }
  merge<K extends keyof T>(key: K, state: T[K]): void {
    if (state instanceof Object) queueScheduler.schedule(() => {
      (this.base[key].store as BehaviorSubject<T[K]>)
        .next({
          ...this.value(key),
          ...state
        })
    });
  }
  async promise<K extends keyof T>(key: K, promise: Promise<T[K]> | (() => Promise<T[K]>)): Promise<void> {
    queueScheduler.schedule(async () => {
      this.base[key].store instanceof BehaviorSubject
        ? (this.base[key].store as BehaviorSubject<T[K]>).next(await (promise instanceof Function ? promise() : promise))
        : (this.base[key].store as Subject<T[K]>).next(await (promise instanceof Function ? promise() : promise));
    });
  }
  value<K extends keyof T>(key: K): T[K] | undefined {
    return this.base[key].store instanceof BehaviorSubject
      ? JSON.parse(JSON.stringify((this.base[key].store as BehaviorSubject<T[K]>).getValue()))
      : undefined;
  }
  get stream(): WrappedStore<T> {
    return this.ref;
  }
}

export interface test {
  obj: {
    [keys: string]: {
      name: string,
      age: number
    }
  },
  count: string
} 
export class TestStore extends Store<test> {
  private static _instance: TestStore;
  public static instance(): TestStore {
    if (!this._instance) this._instance = new TestStore();
    return this._instance;
  }
  private constructor() {
    super({
      obj: {
        store: new BehaviorSubject({}),
        pipe: () => pipe(skip(1))
      },
      count: {
        store: new BehaviorSubject("")
      }
    });
    this.test();
  }
  test(): void {

    console.log("test..")
    this.stream.obj.pipe().subscribe(e => console.log(e))
    
    this.merge('obj', {
      "aaa": {
        name: "is aaa",
        age: 22
      },
      "bbb": {
        name: "is bbb",
        age: 32
      }
    });

    this.merge('obj', {
      "aaa": {
        name: "is changed aaa",
        age: 23
      }
    });

    this.queue('obj', (store) => {
      delete store['aaa']
      return store;
    });

    this.stream.count.pipe(skip(1)).subscribe(e => console.log(e));

    for (const i in [0, 1, 2]) {
      this.promise('count', async () => {
        await new Promise(resolve => setTimeout(resolve, (3000 - 1000 * parseInt(i))))
        return "ready." + i;
      });
    }
    this.promise('count', new Promise((resolve) => setTimeout(() => resolve('Bom!'), 3000)))

  }
}
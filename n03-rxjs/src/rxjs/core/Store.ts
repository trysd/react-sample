import { BehaviorSubject, Observable, pipe, queueScheduler, Subject, UnaryFunction } from 'rxjs';
import { filter, skip, tap } from 'rxjs/operators';

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
      // this.queue(k as keyof T, valOrFn instanceof Function
      //   ? valOrFn[k as keyof T] as (state: T[keyof T]) => T[keyof T]
      //   : valOrFn[k as keyof T] as T[keyof T]
      // )
      this.queue(k as keyof T, valOrFn[k as keyof T] as T[keyof T])
    });
  }
  queue<K extends keyof T>(key: K, state: T[K] | ((state: T[K]) => T[K])): void {
    queueScheduler.schedule(() => {
      (this.base[key].store as BehaviorSubject<T[K]>)
        .next(state instanceof Function ? state(this.value(key) as T[K]) : state)
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

/** 
 * Store Sample
 */
export interface Test1 {
  count: string
}
export class Test1Store extends Store<Test1> {
  private static _instance: Test1Store;
  public static instance(): Test1Store {
    if (!this._instance) this._instance = new Test1Store();
    return this._instance;
  }
  private constructor() {
    super({
      count: {
        store: new BehaviorSubject(".."),
        pipe: () => pipe(skip(1))
      }
    });
    this.test();
  }
  async test() {
    this.stream.count.subscribe(e => {
      console.log(e)
    });
    for (const i in [0, 1, 2]) {
      this.promise('count', async () => {
        await new Promise(resolve => setTimeout(resolve, (3000 - 1000 * parseInt(i))))
        return "ready." + i;
      });
    }
    this.promise('count', new Promise((resolve) => setTimeout(() => resolve('Bom!'), 3000)))
  }
}

export interface test2 {
  a: string | null,
  b: number | null
}
export class Test2Store extends Store<test2> {
  private constructor() {
    super({
      a: { store: new BehaviorSubject(null), pipe: () => pipe(filter(f => f !== null)) },
      b: { store: new BehaviorSubject(null), pipe: () => pipe(filter(f => f !== null)) }
    })
    this.test();
  }
  private static _instance: Test2Store;
  public static instance(): Test2Store {
    if (!this._instance) this._instance = new Test2Store();
    return this._instance;
  }
  test(): void {
    this.stream.a.subscribe(e => console.log(e));
    this.stream.b.subscribe(e => console.log(e));
    this.set({
      a: "ready!",
      b: -1
    });
    ([0, 0, 0]).forEach((_: any) => {
      this.set({
        a: (s) => (s || '') + "⇨",
        b: (s) => (s || 0) + 1
      })
    });
  }

}
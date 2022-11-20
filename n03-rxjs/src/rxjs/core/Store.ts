import { BehaviorSubject, Observable, pipe, queueScheduler, Subject, UnaryFunction} from 'rxjs';
import { skip, tap } from 'rxjs/operators';

type LeastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = LeastOne<{ [K in keyof T]?: T[K] }>;
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
      previous[current] = this.base[current].store.asObservable().pipe(
        this.base[current].pipe ? this.base[current].pipe() : tap()
      );
      return previous;
    }, {} as WrappedStore<T>);
    return this.ref;
  }
  public next<K extends keyof T>(key: K, value: T[K]): void {
    this.queue(key, () => value)
  }
  reset<K extends keyof T>(): void {
    Object.keys(this.base).forEach((k) => this.queue(k as K, () => this.initValues[k]));
  }
  states(nextStatesOptions: NeedAtLeastOne<T>): void {
    Object.keys(nextStatesOptions).forEach((k) => this.queue(k as any, () => this.next[k]));
  }
  queue<K extends keyof T>(key: K, state: T[K]|((state: T[K]) => T[K])): void {
    queueScheduler.schedule(() => {
      (this.base[key].store as BehaviorSubject<T[K]>).next(state instanceof Function ? state(this.value(key) as T[K]) : state)
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

export interface StoreProps {
  count: string
}
export class StoreTest extends Store<StoreProps> {
  private static instance: StoreTest;
  public static getInstance(): StoreTest {
    if (!this.instance) this.instance = new StoreTest();
    return this.instance;
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

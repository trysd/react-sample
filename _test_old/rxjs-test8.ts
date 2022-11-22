export { }

type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type LeastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = LeastOne<{ [K in keyof T]?: T[K] }>;

const plans = {
  "ax": { 
    store: "a",
    red: { aa: () => 111 }
  },
  "bx": { 
    store: "b",
    red: { bb: () => 222, cc: () => 333 }
  }
};
type plansKey = (typeof plans[keyof typeof plans])["red"];






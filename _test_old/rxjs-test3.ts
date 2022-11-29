import { BehaviorSubject, Observable } from 'rxjs';
export {};

type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type leastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = leastOne<{ [K in keyof T]?: T[K] }>;
type WrappedStore<T> = { readonly [K in keyof T]: Observable<T[K]> };

// https://qiita.com/markey/items/134386ee98b277f181f7

const S = {
  cat: {
    store: new BehaviorSubject(123),
    reducers: {
      getCat: (store, ...param) => store,
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

// 型のうちどれか一つの型、この状態だとreducers全て必要
type SNeed = NeedAtLeastOne<typeof S>;

// キーのみ取り出した
type SNeedKey = keyof typeof S;
const SKey: SNeedKey = "cat"

//
type SStore<T, K extends keyof T> = T[K]
const SStore = S.cat.reducers.getCat(null);
console.log(SStore)

// キーと、値をここで設定する型
type SType = NeedAtLeastOne<{ [key in keyof typeof S] : number }>
const SS: SType = { "cat": 123 }



const StoreSet = {
  cat: {
    store: 100,
    reducer: {
      getCat: (store) => store
    }
  },
  dog: {
    store: 200,
    reducer: {
      getDog: (store) => store
    }
  }
};
type StoreSet = typeof StoreSet[keyof typeof StoreSet];


type userAttributes = "firstName" | "lastName";
type userObjType = {
  [key in userAttributes]?: string;
};
const xxx: userObjType = {
  "firstName": "str"
};

// デフォルト付きinterfaceで何かできないか
// https://uyamazak.hatenablog.com/entry/2020/11/06/111857
export { }

type PartialRequire<T, X extends keyof T> = { [K in X]-?: T[K] } & T;
type leastOne<T, K extends keyof T = keyof T> = K extends keyof T ? PartialRequire<T, K> : never;
type NeedAtLeastOne<T> = leastOne<{ [K in keyof T]?: T[K] }>;

interface IdLabel {
  id: number /*いくつかのフィールド*/;
}
interface NameLabel {
  name: string /*その他のフィールド*/;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");
let b = createLabel(2.8);
let c = createLabel(Math.random() ? "hello" : 42);

// -----

type MessageOf<T extends { reducers: unknown }> = T["reducers"];

interface Email {
  sss: number,
  reducers: {
    get: () => null,
    set: () => null
  };
}
type reducerKeys0 = keyof NeedAtLeastOne<MessageOf<Email>>; // reducers全体からどれかひとつキーのみ // get | set
type reducerKeys1 = NeedAtLeastOne<MessageOf<Email>>; // reducers全体からどれかひとつ
type reducerKeys2 = MessageOf<Email>; // reducers全体

let xxx: reducerKeys2;


// -----




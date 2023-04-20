/**
 * tsからコンパイルするなら
 * npx tsc x.create.ts
 * 
 * tsをその間実行するなら
 * ./node_modules/.bin/ts-node-esm x.create.ts
 * 但し、export{} をかけとエラーが出る
 */

import fs from "fs";

console.log(process.argv);




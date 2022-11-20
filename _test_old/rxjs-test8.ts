export {}

const type = <const>[
  { name: "a", red: { aa: 123 }},
  { name: "b", red: { bb: 123 }}
];


const ttt: typeof type[number]['red'] = type[0]['red']

type t1 =  typeof type[number]['name'] ;


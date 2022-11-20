import { Process } from "./Process";

export const Menu = {
  Curry: {
    name: 'Curry',
    process: [
      Process.CutVegetables,
      Process.CutMeet,
      Process.StirFry,
      Process.Simmer,
      Process.DishUp
    ]
  },
  Pasta: {
    name: 'Pasta',
    process: [
      Process.boil,
      Process.putSauceOn,
      Process.DishUp
    ]
  }
} as const;
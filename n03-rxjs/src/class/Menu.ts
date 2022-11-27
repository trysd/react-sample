import { Process } from "./Process";

export const Menu = {
  Curry: {
    name: 'Curry',
    price: 50,
    process: [
      Process.PrepareIngredients,
      Process.CutVegetables,
      Process.CutMeet,
      Process.StirFry,
      Process.Simmer,
      Process.DishUp
    ]
  },
  Pasta: {
    name: 'Pasta',
    price: 75,
    process: [
      Process.PrepareIngredients,
      Process.boil,
      Process.putSauceOn,
      Process.DishUp
    ]
  }
} as const;
export type Menu = typeof Menu[keyof typeof Menu]
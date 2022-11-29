import { Process } from "./Process";

export const Menu: {
  [keys: string]: {
    name: string,
    price: number,
    process: {
      label: string,
      timeItTakes: number
    }[]
  }
} = {
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
  },
  gratin: {
    name: 'gratin',
    price: 95,
    process: [
      Process.PrepareIngredients,
      Process.putRiceOn,
      Process.putCheeseOn,
      Process.OvenBake,
      Process.DishUp
    ]
  }
};
export type Menu = typeof Menu[keyof typeof Menu]
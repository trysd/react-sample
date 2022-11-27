interface process {
  [keys: string]: {
    label: string,
    timeItTakes: number,
  }
}

export const Process: process = {
  PrepareIngredients: {
    label: '材料を準備',
    timeItTakes: 1300,
  },
  CutVegetables: {
    label: '野菜をカット',
    timeItTakes: 800,
  },
  CutMeet: {
    label: '肉をカット',
    timeItTakes: 800,
  },
  StirFry: {
    label: '炒める',
    timeItTakes: 800,
  },
  Simmer: {
    label: '煮込む',
    timeItTakes: 1300,
  },
  boil: {
    label: '茹でる',
    timeItTakes: 2000,
  },
  putSauceOn: {
    label: 'ソースをかける',
    timeItTakes: 1000,
  },
  DishUp: {
    label: '盛り付け',
    timeItTakes: 3000
  }
} as const;
type Process = typeof Process[keyof typeof Process];
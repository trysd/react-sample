export interface ProcessX {
  [keys: string]: {
    label: string,
    timeItTakes: number,
  }
}

export const Process: ProcessX = {
  PrepareIngredients: {
    label: '材料を準備',
    timeItTakes: 500,
  },
  CutVegetables: {
    label: '野菜をカット',
    timeItTakes: 500,
  },
  CutMeet: {
    label: '肉をカット',
    timeItTakes: 400,
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
    timeItTakes: 300,
  },
  putRiceOn: {
    label: 'ご飯をのせる',
    timeItTakes: 300
  },
  putCheeseOn: {
    label: 'チーズをかける',
    timeItTakes: 300
  },
  OvenBake: {
    label: 'オーブンで焼く',
    timeItTakes: 3500
  },
  DishUp: {
    label: '盛り付け',
    timeItTakes: 1000
  }
} as const;
type Process = typeof Process[keyof typeof Process];
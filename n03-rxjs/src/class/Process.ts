export const Process = {
  CutVegetables: {
    label: '野菜をカット',
    timeItTakes: 1000,
  },
  CutMeet: {
    label: '肉をカット',
    timeItTakes: 1000,
  },
  StirFry: {
    label: '炒める',
    timeItTakes: 2000,
  },
  Simmer: {
    label: '煮込む',
    timeItTakes: 5000,
  },
  boil: {
    label: '茹でる',
    timeItTakes: 3000,
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
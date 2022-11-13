import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AnimalsState {
  catName: string,
  dogName: string
}

const initialState: AnimalsState = {
  catName: '',
  dogName: ''
}

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    removeCatName: (state) => {
      state.catName = ''
    },
    removeDogName: (state) => {
      state.dogName = ''
    },
    setCatName: (state, action: PayloadAction<string>) => {
      state.catName = action.payload
    },
    setDogName: (state, action: PayloadAction<string>) => {
      state.dogName = action.payload
    },
    setObject: (state, action: PayloadAction<AnimalsState>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  removeCatName,
  removeDogName,
  setCatName,
  setDogName
} = animalsSlice.actions

export default animalsSlice.reducer

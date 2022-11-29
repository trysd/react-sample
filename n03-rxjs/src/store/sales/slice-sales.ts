import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SalesState {
  value: number
}

const initialState: SalesState = {
  value: 0,
}

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    addSales: (state, sales: PayloadAction<number>) => {
      state.value += sales.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSales } = salesSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: any) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(addSales(amount))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.sales.value)`
// export const selectCount = (state: { sales: { value: any } }) => state.sales.value

export default salesSlice.reducer
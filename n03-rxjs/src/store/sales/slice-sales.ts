import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface numberOfMenu {
  [keys: string]: {
    order: number
  }
}

export interface SalesState {
  value: number,
  numberOfMenu: numberOfMenu
}

const initialState: SalesState = {
  value: 0,
  numberOfMenu: {}
}

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSales: (state, sales: PayloadAction<number>) => {
      state.value += sales.payload
    },
    incrementOrderMenu: (state, menuName: PayloadAction<string>) => {
      // console.log(menuName.payload)
      if (state.numberOfMenu[menuName.payload] == undefined) {
        state.numberOfMenu[menuName.payload] = {
          order: 0
        }
      }
      ++state.numberOfMenu[menuName.payload].order
      // console.log(++state.numberOfMenu[menuName.payload].order)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSales, incrementOrderMenu } = salesSlice.actions

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
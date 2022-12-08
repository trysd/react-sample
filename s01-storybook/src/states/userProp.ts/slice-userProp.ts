import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserProps {
  firstName?: string,
  lastName?: string

}

export interface UsrPropState {
  authLevel: number,
  userProps: UserProps
}

const initialState: UsrPropState = {
  authLevel: 0,
  userProps: {}
}

export const usrPropSlice = createSlice({
  name: 'usrProp',
  initialState,
  reducers: {
    setAuthLevel: (state, authLevel: PayloadAction<number>) => {
      state.authLevel = authLevel.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthLevel } = usrPropSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number) => (dispatch: (arg0: { payload: number; type: "usrProp/setAuthLevel" }) => void) => {
  setTimeout(() => {
    dispatch(setAuthLevel(amount))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.usrProp.value)`
// export const selectCount = (state: { usrProp: { value: any } }) => state.usrProp.value
export default usrPropSlice.reducer
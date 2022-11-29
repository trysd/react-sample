import { configureStore } from '@reduxjs/toolkit'
import salesReducer from './slice-sales'

export const storeSales = configureStore({
  reducer: {
    sales: salesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootSalesState = ReturnType<typeof storeSales.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppSalesDispatch = typeof storeSales.dispatch

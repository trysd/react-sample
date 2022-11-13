import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/slice-counter'

export const storeCounter = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootCounterState = ReturnType<typeof storeCounter.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppCounterDispatch = typeof storeCounter.dispatch

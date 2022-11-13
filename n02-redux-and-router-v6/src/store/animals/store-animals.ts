import { configureStore } from '@reduxjs/toolkit'
import animalsReducer from './slice-animals'

export const storeAnimals = configureStore({
  reducer: {
    animals: animalsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootAnimalsState = ReturnType<typeof storeAnimals.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppAnimalsDispatch = typeof storeAnimals.dispatch

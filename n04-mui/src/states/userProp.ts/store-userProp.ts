import { configureStore } from '@reduxjs/toolkit'
import usrPropReducer from './slice-userProp'

export const storeUsrProp = configureStore({
  reducer: {
    usrProp: usrPropReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootUsrPropState = ReturnType<typeof storeUsrProp.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppUsrPropDispatch = typeof storeUsrProp.dispatch

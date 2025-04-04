import { configureStore } from '@reduxjs/toolkit'
import balanceSlice from './slice/balanceSlice'
const store = configureStore({
  reducer: {
    //余额reducer
    balance: balanceSlice
  }
})

export default store
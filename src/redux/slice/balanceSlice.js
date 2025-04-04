import { createSlice } from "@reduxjs/toolkit"

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    TokenWallet: '0'
  },
  reducers: {
    setTokenWallet (state, action) {
      state.TokenWallet = action.payload
    }
  }
})
export const { setTokenWallet } = balanceSlice.actions
export default balanceSlice.reducer;
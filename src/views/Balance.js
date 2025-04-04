import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
export default function Balance () {
  const state = useSelector(state => state.balance.TokenWallet)
  return <div>Balance-{state}</div>

}

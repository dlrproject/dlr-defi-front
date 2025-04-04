
import React, { useEffect } from 'react';
import Web3 from 'web3'
import Balance from './Balance';
import Order from './Order';
export default function Content () {

  useEffect(() => {
    async function start () {
      //1.获取连接后的合约
      const web = await initWeb()
      console.log(web)
      window.web = web//全局对象
    }
    start()
  }, [])
  async function initWeb () {
    var web3 = new Web3(Web3.givenProvider || "http://localhost:7000")
    return {
      web3
    }
  }
  return <div><Balance>
  </Balance><Order></Order></div>;
}
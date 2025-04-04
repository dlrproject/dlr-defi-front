/*
 * @Author: Jtons 3010440586@qq.com
 * @Date: 2025-03-31 21:18:37
 * @LastEditors: Jtons 3010440586@qq.com
 * @LastEditTime: 2025-03-31 21:26:03
 * @FilePath: \dlr-front-end\src\router\modules\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { lazy } from 'react';

// 使用懒加载方式导入组件
const SwapInterface = lazy(() => import('../views/SwapInterface/SwapInterface'));
const Pool = lazy(() => import('../views/Pool/Pool'));

const routes = [
  {
    path: '/',
    redirect: '/swap'
  },
  {
    path: '/swap',
    name: 'Swap',
    component: SwapInterface,
    meta: {
      title: '交易'
    }
  },
  {
    path: '/pool',
    name: 'Pool',
    component: Pool,
    meta: {
      title: '流动池'
    }
  },
  {
    path: '/farm',
    name: 'Farm',
    component: () => <div className="coming-soon">挖矿功能即将上线</div>,
    meta: {
      title: '挖矿'
    }
  },
  {
    path: '/stake',
    name: 'Stake',
    component: () => <div className="coming-soon">质押功能即将上线</div>,
    meta: {
      title: '质押'
    }
  }
];

export default routes;
import React from 'react';
import './Pool.css';

const Pool = () => {
  return (
    <div className="pool-container">
      <div className="pool-card">
        <h2>流动池</h2>
        <div className="pool-info">
          <p>添加流动性以赚取手续费</p>
          <button className="add-liquidity-btn">
            添加流动性
          </button>
        </div>
        <div className="your-liquidity">
          <h3>您的流动性</h3>
          <p className="no-liquidity">暂无流动性</p>
        </div>
      </div>
    </div>
  );
};

export default Pool; 
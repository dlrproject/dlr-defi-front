/*
 * @Author: Jtons 3010440586@qq.com
 * @Date: 2025-03-31 21:15:04
 * @LastEditors: Jtons 3010440586@qq.com
 * @LastEditTime: 2025-03-31 21:16:29
 * @FilePath: \dlr-front-end\src\components\Navbar.js
 * @Description: 导航栏组件，包含钱包连接功能和页面导航
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

import './Navbar.css';

const Navbar = () => {
  // 使用 useLocation hook 获取当前路由信息，用于高亮当前页面导航
  const location = useLocation();
  // 主题状态管理
  const [theme, setTheme] = useState('light');
  const [account, setAccount] = useState(''); // 添加账户状态

  // 初始化主题
  useEffect(() => {
    // 从 localStorage 获取保存的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    // 应用主题
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // 检查钱包连接状态
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error('检查钱包连接失败:', error);
        }
      }
    };

    checkWalletConnection();

    // 监听账户变化
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => { });
      }
    };
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // 保存主题设置到 localStorage
    localStorage.setItem('theme', newTheme);
    // 应用新主题
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  /**
   * 连接钱包函数
   * 使用 MetaMask 或其他以太坊钱包进行连接
   * 流程：
   * 1. 检查是否安装了钱包插件
   * 2. 请求用户授权连接钱包
   * 3. 处理连接结果
   */
  const connectWallet = async () => {
    try {
      // 检查是否安装了钱包插件
      if (!window.ethereum) {
        alert("请安装Metamask插件或使用其他以太坊钱包");
        return;
      }

      // 请求用户授权连接钱包
      // eth_requestAccounts 是 MetaMask 提供的 API，用于请求用户授权访问其账户
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      // 处理连接失败的情况
      console.error('连接钱包失败:', error);
      alert('连接钱包失败，请重试');
    }
  }

  // 格式化账户地址
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* 导航栏容器 */}
      <nav className="navbar">
        {/* 网站 Logo 链接 */}
        <Link to="/" className="navbar-brand">
          DLR
        </Link>

        {/* 导航菜单列表 */}
        <ul className="navbar-nav">
          {/* 交易页面链接 */}
          <li>
            <Link
              to="/swap"
              className={`nav-link ${location.pathname === '/swap' ? 'active' : ''}`}
            >
              交易
            </Link>
          </li>

          {/* 流动池页面链接 */}
          <li>
            <Link
              to="/pool"
              className={`nav-link ${location.pathname === '/pool' ? 'active' : ''}`}
            >
              流动池
            </Link>
          </li>

          {/* 挖矿页面链接 */}
          <li>
            <Link
              to="/farm"
              className={`nav-link ${location.pathname === '/farm' ? 'active' : ''}`}
            >
              挖矿
            </Link>
          </li>

          {/* 质押页面链接 */}
          <li>
            <Link
              to="/stake"
              className={`nav-link ${location.pathname === '/stake' ? 'active' : ''}`}
            >
              质押
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          {/* 主题切换按钮 */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
          >
            {theme === 'light' ? <BulbOutlined /> : <BulbFilled />}
          </button>

          {account ? (
            <div className="wallet-address">
              {formatAddress(account)}
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={connectWallet}>
              连接钱包
            </button>
          )}
        </div>
      </nav>

      {/* 导航栏占位符，用于固定定位的导航栏 */}
      <div className="navbar-placeholder"></div>
    </>
  );
};

export default Navbar;
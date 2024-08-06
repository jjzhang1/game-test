// src/contexts/WalletProvider.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextProps {
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      // 检查初始连接状态
      ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          setIsConnected(accounts.length > 0);
        })
        .catch((error: any) => {
          console.error('Error checking wallet connection', error);
        });

      // 监听账户变化
      ethereum.on('accountsChanged', handleAccountsChanged);

      // 监听网络断开
      ethereum.on('disconnect', handleDisconnect);

      // 监听链切换
      ethereum.on('chainChanged', handleChainChanged);

      // 清除事件监听
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('disconnect', handleDisconnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);
  const handleChainChanged = (chainId: string) => {
    alert(`Chain changed to ${chainId}`);
    window.location.reload();
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      alert('Wallet disconnected');
    } else {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    alert('Wallet disconnected');
  };

  return (
    <WalletContext.Provider value={{ isConnected }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

'use client';

import { useEffect, useState } from 'react';
import { connectWallet, disconnectWallet, getWalletState, WalletState } from '@/lib/web3';
import styles from './Wallet.module.css';

export function Wallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    balance: null,
    error: null,
  });

  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check wallet on mount
  useEffect(() => {
    const checkWallet = async () => {
      const state = await getWalletState();
      setWallet(state);
    };

    checkWallet();
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const address = await connectWallet();
      if (address) {
        const state = await getWalletState();
        setWallet(state);
      }
    } catch (err) {
      setWallet(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Connection failed',
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setWallet({
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
      error: null,
    });
    setShowDropdown(false);
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (!wallet.isConnected) {
    return (
      <button
        className={styles.connectButton}
        onClick={handleConnect}
        disabled={loading}
      >
        {loading ? 'CONNECTING...' : 'CONNECT WALLET'}
      </button>
    );
  }

  return (
    <div className={styles.walletContainer}>
      <button
        className={styles.walletButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className={styles.address}>{formatAddress(wallet.address || '')}</span>
        <span className={styles.status}>●</span>
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem}>
            <span className={styles.label}>Address</span>
            <code className={styles.value}>{wallet.address}</code>
          </div>

          {wallet.balance && (
            <div className={styles.dropdownItem}>
              <span className={styles.label}>Balance</span>
              <span className={styles.value}>{wallet.balance}</span>
            </div>
          )}

          <button
            className={`${styles.dropdownItem} ${styles.disconnect}`}
            onClick={handleDisconnect}
          >
            DISCONNECT
          </button>
        </div>
      )}
    </div>
  );
}

// Raw EIP-1193 Web3 utilities - no external libraries
import './types';

export const BASE_CHAIN_ID = 8453;
export const BASE_RPC_URL = 'https://mainnet.base.org';
export const AGL_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698';

// ERC20 ABI encoding for contract calls
export const ERC20_ABI = {
  balanceOf: '0x70a08231', // balanceOf(address)
  decimals: '0x313ce567', // decimals()
  symbol: '0x95d89b41', // symbol()
  totalSupply: '0x18160ddd', // totalSupply()
  allowance: '0xdd62ed3e', // allowance(address,address)
} as const;

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

// Connect wallet with EIP-1193
export async function connectWallet(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  if (!window.ethereum) {
    throw new Error('No Web3 wallet detected. Please install MetaMask or similar.');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (Array.isArray(accounts) && accounts.length > 0) {
      // Auto-switch to Base if needed
      await switchToBase();
      return accounts[0];
    }
    return null;
  } catch (err) {
    console.error('[v0] Wallet connection failed:', err);
    throw err;
  }
}

// Disconnect wallet
export function disconnectWallet(): void {
  if (typeof window === 'undefined') return;

  // Most wallets don't support disconnect, but we can clear local state
  sessionStorage.removeItem('agl_wallet_address');
}

// Switch to Base mainnet
export async function switchToBase(): Promise<void> {
  if (typeof window === 'undefined' || !window.ethereum) return;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + BASE_CHAIN_ID.toString(16) }],
    });
  } catch (err: any) {
    // Chain doesn't exist, add it
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x' + BASE_CHAIN_ID.toString(16),
            chainName: 'Base Mainnet',
            nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
            rpcUrls: [BASE_RPC_URL],
            blockExplorerUrls: ['https://basescan.org'],
          },
        ],
      });
    } else {
      throw err;
    }
  }
}

// Get current wallet state
export async function getWalletState(): Promise<WalletState> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return {
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
      error: 'No wallet detected',
    };
  }

  try {
    // Get accounts
    const accounts = (await window.ethereum.request({
      method: 'eth_accounts',
    })) as string[];

    const address = accounts?.[0] || null;

    // Get chainId
    const chainIdHex = (await window.ethereum.request({
      method: 'eth_chainId',
    })) as string;

    const chainId = parseInt(chainIdHex, 16);

    // Get balance
    let balance = null;
    if (address) {
      const balanceHex = (await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })) as string;
      balance = balanceHex;
    }

    return {
      address,
      isConnected: !!address,
      chainId,
      balance,
      error: null,
    };
  } catch (err) {
    console.error('[v0] Failed to get wallet state:', err);
    return {
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
      error: 'Failed to get wallet state',
    };
  }
}

// Raw eth_call for contract reading
export async function ethCall(
  to: string,
  data: string,
  blockTag: string = 'latest'
): Promise<string> {
  const response = await fetch(BASE_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [{ to, data }, blockTag],
      id: 1,
    }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`RPC error: ${result.error.message}`);
  }

  return result.result;
}

// Encode function call for eth_call
export function encodeFunctionCall(selector: string, params: string = ''): string {
  return selector + params;
}

// Decode uint256 from hex
export function decodeUint256(hex: string): string {
  return BigInt(hex).toString();
}

// Format balance for display (assumes 18 decimals)
export function formatBalance(balance: string, decimals: number = 18): string {
  const bn = BigInt(balance);
  const divisor = BigInt(10) ** BigInt(decimals);
  const whole = bn / divisor;
  const remainder = ((bn % divisor) * BigInt(10000)) / divisor;

  return `${whole}.${remainder.toString().padStart(4, '0')}`;
}

// Pad address for contract calls
export function padAddress(address: string): string {
  return address.toLowerCase().replace(/^0x/, '0x' + '0'.repeat(64 - address.length + 2));
}

// Listen for wallet events
export function onAccountsChanged(callback: (accounts: string[]) => void): () => void {
  if (typeof window === 'undefined' || !window.ethereum) return () => {};

  window.ethereum?.on?.('accountsChanged', callback);
  return () => {
    window.ethereum?.removeListener?.('accountsChanged', callback);
  };
}

export function onChainChanged(callback: (chainId: string) => void): () => void {
  if (typeof window === 'undefined' || !window.ethereum) return () => {};

  window.ethereum?.on?.('chainChanged', callback);
  return () => {
    window.ethereum?.removeListener?.('chainChanged', callback);
  };
}

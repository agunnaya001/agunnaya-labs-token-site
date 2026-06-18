// Extend Window interface for EIP-1193 provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, handler: (...args: any[]) => void) => void;
      removeListener?: (event: string, handler: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
      isBraveWallet?: boolean;
      isTrustWallet?: boolean;
    };
  }
}

export {};

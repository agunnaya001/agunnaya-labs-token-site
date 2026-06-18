// AGL Contract interactions using raw eth_call

import {
  AGL_ADDRESS,
  ERC20_ABI,
  ethCall,
  encodeFunctionCall,
  decodeUint256,
  formatBalance,
  padAddress,
} from './web3';

export async function getAGLDecimals(): Promise<number> {
  const data = ERC20_ABI.decimals;
  const result = await ethCall(AGL_ADDRESS, data);
  return parseInt(decodeUint256(result));
}

export async function getAGLSymbol(): Promise<string> {
  // symbol() returns encoded string
  const data = ERC20_ABI.symbol;
  const result = await ethCall(AGL_ADDRESS, data);

  // Decode string from result (skip 32 bytes offset, get length, then string)
  const lengthHex = result.slice(66, 130);
  const length = parseInt(lengthHex, 16);
  const stringHex = result.slice(130, 130 + length * 2);
  return Buffer.from(stringHex, 'hex').toString('utf-8');
}

export async function getAGLTotalSupply(): Promise<string> {
  const data = ERC20_ABI.totalSupply;
  const result = await ethCall(AGL_ADDRESS, data);
  return decodeUint256(result);
}

export async function getAGLBalance(address: string): Promise<string> {
  const paddedAddress = padAddress(address);
  const data = encodeFunctionCall(ERC20_ABI.balanceOf, paddedAddress);
  const result = await ethCall(AGL_ADDRESS, data);
  return decodeUint256(result);
}

export async function getAGLBalanceFormatted(address: string): Promise<string> {
  const balance = await getAGLBalance(address);
  const decimals = await getAGLDecimals();
  return formatBalance(balance, decimals);
}

export interface AGLTokenStats {
  symbol: string;
  decimals: number;
  totalSupply: string;
  totalSupplyFormatted: string;
  marketCap?: number;
  circulatingSupply?: string;
}

export async function getAGLTokenStats(): Promise<AGLTokenStats> {
  const [symbol, decimals, totalSupply] = await Promise.all([
    getAGLSymbol(),
    getAGLDecimals(),
    getAGLTotalSupply(),
  ]);

  const totalSupplyFormatted = formatBalance(totalSupply, decimals);

  return {
    symbol,
    decimals,
    totalSupply,
    totalSupplyFormatted,
  };
}

export interface StakingTier {
  name: string;
  duration: number; // in days
  apy: number; // percentage
  minAmount?: string;
}

// Staking tiers configuration
export const STAKING_TIERS: StakingTier[] = [
  { name: 'Flexible', duration: 0, apy: 12 },
  { name: '30 Day', duration: 30, apy: 20 },
  { name: '60 Day', duration: 60, apy: 35 },
  { name: '90 Day', duration: 90, apy: 50 },
];

// Calculate staking rewards
export function calculateRewards(
  principalAmount: number,
  tierApy: number,
  daysStaked: number
): number {
  const dailyRate = tierApy / 365 / 100;
  return principalAmount * dailyRate * daysStaked;
}

// Calculate APY breakdown
export function calculateAPYBreakdown(
  amount: number,
  apy: number
): { daily: number; weekly: number; monthly: number; yearly: number } {
  const daily = amount * (apy / 365 / 100);
  const weekly = daily * 7;
  const monthly = daily * 30;
  const yearly = amount * (apy / 100);

  return { daily, weekly, monthly, yearly };
}

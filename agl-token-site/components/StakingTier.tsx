'use client';

import { STAKING_TIERS, StakingTier as TierType } from '@/lib/contracts';
import styles from './StakingTier.module.css';

interface StakingTierProps {
  tier: TierType;
  isSelected?: boolean;
  onSelect?: (tier: TierType) => void;
}

export function StakingTier({ tier, isSelected = false, onSelect }: StakingTierProps) {
  return (
    <div
      className={`${styles.tier} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect?.(tier)}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{tier.name}</h3>
        {tier.duration > 0 && (
          <span className={styles.duration}>{tier.duration} days</span>
        )}
      </div>

      <div className={styles.apyDisplay}>
        <span className={styles.apyValue}>{tier.apy}%</span>
        <span className={styles.apyLabel}>APY</span>
      </div>

      <div className={styles.benefits}>
        <div className={styles.benefit}>
          <span className={styles.icon}>✓</span>
          <span>Earn passive rewards</span>
        </div>
        <div className={styles.benefit}>
          <span className={styles.icon}>✓</span>
          <span>Flexible withdrawal</span>
        </div>
        {tier.duration > 0 && (
          <div className={styles.benefit}>
            <span className={styles.icon}>✓</span>
            <span>{tier.duration}-day lock period</span>
          </div>
        )}
      </div>

      <button className={styles.selectButton}>
        {isSelected ? 'SELECTED' : 'SELECT TIER'}
      </button>
    </div>
  );
}

interface StakingTierSelectorProps {
  onSelect?: (tier: TierType) => void;
  selectedTier?: TierType | null;
}

export function StakingTierSelector({
  onSelect,
  selectedTier,
}: StakingTierSelectorProps) {
  return (
    <div className={styles.selector}>
      <h2>Choose Your Staking Tier</h2>
      <div className={styles.grid}>
        {STAKING_TIERS.map((tier) => (
          <StakingTier
            key={tier.name}
            tier={tier}
            isSelected={selectedTier?.name === tier.name}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getAGLPrice, PriceData, formatPrice, formatLiquidity, formatPriceChange } from '@/lib/price';
import styles from './PriceDisplay.module.css';

export function PriceDisplay() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await getAGLPrice();
        setPrice(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch price');
        console.error('[v0] Price fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();

    // Refresh every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className={styles.priceContainer}>
        <div className={styles.error}>⚠️ {error}</div>
      </div>
    );
  }

  if (loading || !price) {
    return (
      <div className={styles.priceContainer}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  const changeColor = price.priceChange24h >= 0 ? styles.positive : styles.negative;

  return (
    <div className={`${styles.priceContainer} glow`}>
      <div className={styles.header}>
        <h3>AGL Price</h3>
      </div>

      <div className={styles.priceMain}>
        <span className={styles.price}>{formatPrice(price.priceUsd)}</span>
        <span className={`${styles.change} ${changeColor}`}>
          {formatPriceChange(price.priceChange24h)}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.stat}>
          <span className={styles.label}>24H Volume</span>
          <span className={styles.value}>{formatLiquidity(price.volume24h)}</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.label}>Liquidity</span>
          <span className={styles.value}>{formatLiquidity(price.liquidity)}</span>
        </div>

        {price.marketCap && (
          <div className={styles.stat}>
            <span className={styles.label}>Market Cap</span>
            <span className={styles.value}>{formatLiquidity(price.marketCap)}</span>
          </div>
        )}

        {price.fdv && (
          <div className={styles.stat}>
            <span className={styles.label}>FDV</span>
            <span className={styles.value}>{formatLiquidity(price.fdv)}</span>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <small>Updated {new Date(price.timestamp).toLocaleTimeString()}</small>
      </div>
    </div>
  );
}

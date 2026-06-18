'use client';

import { useEffect, useState } from 'react';
import { getAGLTokenStats } from '@/lib/contracts';
import styles from './TokenomicsChart.module.css';

export function TokenomicsChart() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAGLTokenStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tokenomics');
        console.error('[v0] Tokenomics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>⚠️ {error}</div>
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  // Mock distribution data for visualization
  const distribution = [
    { label: 'Community', percentage: 40, color: '#39FF14' },
    { label: 'Team', percentage: 20, color: '#2dd60f' },
    { label: 'Reserves', percentage: 25, color: '#7fff59' },
    { label: 'Partnerships', percentage: 15, color: '#1aaa00' },
  ];

  const svgSize = 300;
  const radius = 80;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;

  let currentAngle = -90;
  const segments = distribution.map((item) => {
    const sliceAngle = (item.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      pathData,
      angle: startAngle + sliceAngle / 2,
    };
  });

  return (
    <div className={`${styles.container} glow`}>
      <div className={styles.header}>
        <h3>Token Distribution</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.chartWrapper}>
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className={styles.chart}
          >
            {segments.map((segment, idx) => (
              <g key={idx}>
                <path
                  d={segment.pathData}
                  fill={segment.color}
                  opacity="0.8"
                  className={styles.segment}
                  style={{ '--segment-color': segment.color } as any}
                />
                <title>{`${segment.label}: ${segment.percentage}%`}</title>
              </g>
            ))}

            {/* Center donut hole */}
            <circle
              cx={centerX}
              cy={centerY}
              r="40"
              fill="var(--bg-secondary)"
            />
          </svg>

          <div className={styles.centerLabel}>
            <div className={styles.label}>Total Supply</div>
            <div className={styles.value}>
              {parseFloat(stats.totalSupplyFormatted).toLocaleString()}
            </div>
          </div>
        </div>

        <div className={styles.legend}>
          {distribution.map((item, idx) => (
            <div key={idx} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.legendLabel}>{item.label}</span>
              <span className={styles.legendPercent}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>Symbol</span>
          <span className={styles.value}>{stats.symbol}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Decimals</span>
          <span className={styles.value}>{stats.decimals}</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

const ICONS = {
  thermometer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
    </svg>
  ),
  droplets: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  wind: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  ),
  waves: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  salt: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  fish: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/>
      <path d="M18 12v.5"/>
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.98-.23 6.15 1.34 7.29C5.07 14 6.54 14 7 13.5v-2.83"/>
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/>
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.09-3.96"/>
    </svg>
  ),
};

function MetricCard({ icon, label, value, unit, trend, trendDir, color, glowColor }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid rgba(${color ? hexToRgb(color) : '99,179,255'},0.15)`,
      borderRadius: 14,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s',
      cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Glow blob */}
      {glowColor && (
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(30px)',
          opacity: 0.35,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ color: color || '#60a5fa' }}>{ICONS[icon] || ICONS.thermometer}</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>
          {label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#f0f6ff',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '-0.02em',
        }}>
          {value ?? '—'}
        </span>
        {unit && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>

      {trend && (
        <div style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: 600,
          color: trendDir === 'up' ? '#fca5a5' : '#6ee7b7',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}>
          <span>{trendDir === 'up' ? '↑' : '↓'}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function MetricGrid({ region }) {
  if (!region) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: 20 }}>
        Select a region from the map to view detailed metrics.
      </div>
    );
  }

  const metrics = [
    {
      icon: 'thermometer', label: 'Sea Surface Temp', value: region.sst, unit: '°C',
      trend: '+1.8°C above avg', trendDir: 'up', color: '#ef4444', glowColor: '#ef4444',
    },
    {
      icon: 'droplets', label: 'Chlorophyll-a', value: region.chlorophyll, unit: 'mg/m³',
      trend: region.chlorophyll < 1 ? 'Below normal' : 'Normal range', trendDir: region.chlorophyll < 1 ? 'up' : 'down',
      color: '#10b981', glowColor: '#10b981',
    },
    {
      icon: 'wind', label: 'Wind Speed', value: region.windSpeed?.toFixed(0), unit: 'km/h',
      trend: region.windSpeed > 25 ? 'Elevated' : 'Normal', trendDir: region.windSpeed > 25 ? 'up' : 'down',
      color: '#3b82f6', glowColor: '#3b82f6',
    },
    {
      icon: 'waves', label: 'Wave Height', value: region.waveHeight?.toFixed(1), unit: 'm',
      trend: region.waveHeight > 2 ? 'Rough seas' : 'Calm', trendDir: region.waveHeight > 2 ? 'up' : 'down',
      color: '#8b5cf6', glowColor: '#8b5cf6',
    },
    {
      icon: 'eye', label: 'Visibility', value: region.visibility?.toFixed(0), unit: 'km',
      trend: 'Sea level', trendDir: 'down', color: '#06b6d4', glowColor: '#06b6d4',
    },
    {
      icon: 'fish', label: 'Fish Density Index', value: region.fishDensityIndex, unit: '/10',
      trend: 'AI estimated', trendDir: region.fishDensityIndex > 5 ? 'down' : 'up',
      color: '#f59e0b', glowColor: '#f59e0b',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff' }}>{region.name}</h3>
        <span style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 99,
          padding: '2px 8px',
        }}>
          {region.zone}
        </span>
        <span className={`badge-${region.alert?.level}`} style={{ marginLeft: 'auto' }}>
          {region.alert?.icon} {region.alert?.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

export default MetricGrid;

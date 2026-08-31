import React, { useState } from 'react';

const FISHING_ADVISORIES = [
  {
    region: 'Sunderbans',
    id: 'sunderbans',
    status: 'excellent',
    recommendation: 'RECOMMENDED',
    fishTypes: ['Hilsa', 'Rohu', 'Catla', 'Prawns'],
    catchForecast: 'High',
    bestTime: '05:00 – 09:00 AM',
    depth: '15–30m',
    windWarning: null,
    note: 'Chlorophyll index is high — strong phytoplankton presence. Expect dense Hilsa schools near estuary mouths.',
  },
  {
    region: 'Gulf of Kutch',
    id: 'rann_of_kutch',
    status: 'good',
    recommendation: 'SUITABLE',
    fishTypes: ['Pomfret', 'Croaker', 'Sardine'],
    catchForecast: 'Moderate',
    bestTime: '06:00 – 11:00 AM',
    depth: '10–25m',
    windWarning: null,
    note: 'Seasonal upwelling detected. Good nutrient mixing expected to drive moderate catch yields.',
  },
  {
    region: 'Goa Coast',
    id: 'goa',
    status: 'caution',
    recommendation: 'USE CAUTION',
    fishTypes: ['Mackerel', 'Tuna', 'Kingfish'],
    catchForecast: 'Low-Moderate',
    bestTime: '07:00 – 10:00 AM',
    depth: '20–40m',
    windWarning: 'Winds 15–22 km/h expected. Stay within 10 nautical miles.',
    note: 'SST slightly elevated. Fish migration shifting southward. Tuna schools moving deeper.',
  },
  {
    region: 'Andaman Islands',
    id: 'andaman',
    status: 'banned',
    recommendation: 'DO NOT FISH',
    fishTypes: [],
    catchForecast: 'N/A',
    bestTime: '—',
    depth: '—',
    windWarning: 'Storm-force winds. Waves up to 3.5m. IMMEDIATE BAN.',
    note: 'Coral bleaching event ongoing. All fishing suspended by order of Andaman & Nicobar Administration. Return to harbor.',
  },
  {
    region: 'Kanyakumari',
    id: 'kanyakumari',
    status: 'caution',
    recommendation: 'USE CAUTION',
    fishTypes: ['Yellowfin Tuna', 'Skipjack', 'Barracuda'],
    catchForecast: 'Moderate',
    bestTime: '04:30 – 08:00 AM',
    depth: '25–50m',
    windWarning: 'Swell height 2.1m. Small vessels not advised.',
    note: 'Junction of Arabian Sea and Bay of Bengal. High current variability. Deep-sea tuna present.',
  },
];

const STATUS_STYLES = {
  excellent: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', label: '✅ Excellent' },
  good: { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)', label: '🟢 Good' },
  caution: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: '⚠️ Caution' },
  banned: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', label: '🚫 Banned' },
};

function AdvisoryCard({ advisory }) {
  const [expanded, setExpanded] = useState(false);
  const style = STATUS_STYLES[advisory.status];

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${advisory.status === 'banned' ? 'rgba(239,68,68,0.25)' : 'var(--border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all 0.25s',
      }}
    >
      {advisory.status === 'banned' && (
        <div style={{
          background: 'rgba(239,68,68,0.08)',
          borderBottom: '1px solid rgba(239,68,68,0.2)',
          padding: '6px 16px',
          fontSize: 11,
          fontWeight: 700,
          color: '#fca5a5',
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ animation: 'pulse 1s infinite' }}>🔴</span>
          FISHING BAN IN EFFECT — RETURN TO HARBOR IMMEDIATELY
        </div>
      )}
      <div
        style={{ padding: '16px 18px', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff' }}>
                {advisory.region}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: style.color,
                background: style.bg,
                border: `1px solid ${style.border}`,
                padding: '2px 10px',
                borderRadius: 99,
              }}>
                {style.label}
              </span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
              {advisory.recommendation} • Catch: <b style={{ color: '#f0f6ff' }}>{advisory.catchForecast}</b> • Best: <b style={{ color: '#f0f6ff' }}>{advisory.bestTime}</b>
            </div>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 18, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>
            ⌄
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 18px',
          background: 'rgba(7,14,29,0.5)',
          animation: 'fadeSlideIn 0.2s ease',
        }}>
          {advisory.windWarning && (
            <div style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 12,
              color: '#fcd34d',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>⛈️</span> {advisory.windWarning}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>RECOMMENDED DEPTH</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#93c5fd' }}>{advisory.depth}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>TARGET SPECIES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {advisory.fishTypes.length > 0 ? advisory.fishTypes.map(f => (
                  <span key={f} style={{
                    fontSize: 11,
                    color: '#6ee7b7',
                    background: 'rgba(16,185,129,0.08)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    padding: '1px 8px',
                    borderRadius: 99,
                  }}>
                    🐟 {f}
                  </span>
                )) : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>N/A</span>}
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}>
            🔬 <b style={{ color: '#f0f6ff' }}>AI Analysis:</b> {advisory.note}
          </div>
        </div>
      )}
    </div>
  );
}

function FisheryPage({ marineData }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }} className="scroll-area">
      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.06))',
          border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 40 }}>🎣</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f6ff', marginBottom: 4 }}>
              Fishery Intelligence Mode
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              AI-powered catch forecasts and real-time safety advisories tailored for fishing communities along the Indian coast.
              Updated every 3 hours from oceanographic sensors and satellite data.
            </p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Next update in</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#34d399', fontFamily: 'JetBrains Mono' }}>02:47:13</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Safe Zones', value: '2', icon: '✅', color: '#10b981' },
            { label: 'Caution Zones', value: '2', icon: '⚠️', color: '#f59e0b' },
            { label: 'Banned Zones', value: '1', icon: '🚫', color: '#ef4444' },
            { label: 'Total Monitored', value: '6', icon: '🛰️', color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '14px 16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: 'JetBrains Mono' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Advisories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FISHING_ADVISORIES.map(a => (
            <AdvisoryCard key={a.id} advisory={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FisheryPage;

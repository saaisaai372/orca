import React, { useState } from 'react';

const ROUTES = [
  {
    id: 'r1',
    from: 'Mumbai Port',
    to: 'Kochi Port',
    distance: '850 nm',
    duration: '42h',
    status: 'clear',
    statusLabel: 'All Clear',
    risk: 'Low',
    hazards: [],
    waypoints: ['Ratnagiri', 'Malpe', 'Mangalore'],
    cargo: 'Container',
    recommendation: 'Optimal route. No significant weather systems detected. Recommend maintaining standard speed of 18 knots.',
  },
  {
    id: 'r2',
    from: 'Kolkata Port',
    to: 'Chennai Port',
    distance: '720 nm',
    duration: '36h',
    status: 'caution',
    statusLabel: 'Moderate Risk',
    risk: 'Medium',
    hazards: ['High swells (2.5m) off Andhra Pradesh coast', 'Wind gusts up to 45 km/h near Kalingapatnam'],
    waypoints: ['Visakhapatnam', 'Kalingapatnam'],
    cargo: 'Bulk Carrier',
    recommendation: 'Advise offshore deviation of 30nm between Visakhapatnam and Kalingapatnam. Reduce speed to 12 knots when approaching the Andhra shelf.',
  },
  {
    id: 'r3',
    from: 'JNPT Mumbai',
    to: 'Port Blair',
    distance: '1,420 nm',
    duration: '72h',
    status: 'danger',
    statusLabel: 'High Risk',
    risk: 'High',
    hazards: ['Storm alert near Andaman Islands', 'Wave height 3.5–4.5m', 'Cyclonic circulation detected 200nm NE of route'],
    waypoints: ['Lakshadweep (bypass)', 'Sri Lanka Strait'],
    cargo: 'Passenger / RoRo',
    recommendation: '⚠️ ROUTE SUSPENDED. Do not proceed until weather system clears. Alternative: divert south via Sri Lanka. ETA adjustment: +18 hours.',
  },
  {
    id: 'r4',
    from: 'Kandla Port',
    to: 'Cochin Port',
    distance: '980 nm',
    duration: '49h',
    status: 'clear',
    statusLabel: 'All Clear',
    risk: 'Low',
    hazards: [],
    waypoints: ['Okha', 'Porbandar', 'Veraval', 'Mumbai'],
    cargo: 'Tanker',
    recommendation: 'Favorable NE monsoon winds. Route is clear. Slight swell (1.2m) expected near Goa — within safe operating limits.',
  },
];

const STATUS_STYLE = {
  clear: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', icon: '✅' },
  caution: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', icon: '⚠️' },
  danger: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: '🚫' },
};

function RouteCard({ route }) {
  const [expanded, setExpanded] = useState(false);
  const style = STATUS_STYLE[route.status];

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${route.status === 'danger' ? 'rgba(239,68,68,0.25)' : 'var(--border)'}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'all 0.2s',
    }}>
      {route.status === 'danger' && (
        <div style={{
          background: 'rgba(239,68,68,0.08)',
          borderBottom: '1px solid rgba(239,68,68,0.2)',
          padding: '5px 16px',
          fontSize: 11, fontWeight: 700, color: '#fca5a5',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ animation: 'pulse 1s infinite' }}>⚠️</span>
          ROUTE SUSPENDED — MARITIME ADVISORY ACTIVE
        </div>
      )}

      <div style={{ padding: '16px 18px', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Route visual */}
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f6ff', minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span>🚢 {route.from}</span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span>{route.to}</span>
            </div>
            <div style={{ marginTop: 5, fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 12 }}>
              <span>📏 {route.distance}</span>
              <span>⏱ {route.duration}</span>
              <span>📦 {route.cargo}</span>
            </div>
          </div>

          <div style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: style.color, background: style.bg,
              border: `1px solid ${style.border}`,
              padding: '3px 10px', borderRadius: 99,
            }}>
              {style.icon} {route.statusLabel}
            </span>
            <span style={{ fontSize: 18, color: 'var(--text-muted)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>⌄</span>
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
          {/* Waypoints */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>WAYPOINTS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[route.from, ...route.waypoints, route.to].map((wp, i, arr) => (
                <React.Fragment key={wp}>
                  <span style={{
                    fontSize: 12, color: '#93c5fd',
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    padding: '2px 8px', borderRadius: 6,
                  }}>
                    ⚓ {wp}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Hazards */}
          {route.hazards.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>DETECTED HAZARDS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {route.hazards.map((h, i) => (
                  <div key={i} style={{
                    background: 'rgba(245,158,11,0.07)',
                    border: '1px solid rgba(245,158,11,0.18)',
                    borderRadius: 8,
                    padding: '7px 12px',
                    fontSize: 12, color: '#fcd34d',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span>⚡</span> {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendation */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', marginBottom: 6 }}>
              🤖 AI RECOMMENDATION
            </div>
            <div style={{ fontSize: 13, color: '#c8d8f0', lineHeight: 1.6 }}>
              {route.recommendation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MaritimePage() {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }} className="scroll-area">
      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.06))',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 40 }}>⚓</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f6ff', marginBottom: 4 }}>
              Maritime Route Intelligence
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              AI-optimized routing across Indian coastal shipping lanes. Real-time hazard detection, 
              weather routing, and safety advisories for commercial maritime operators.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Clear Routes', value: '2/4', color: '#10b981', icon: '🟢' },
            { label: 'Caution Routes', value: '1/4', color: '#f59e0b', icon: '🟡' },
            { label: 'Suspended', value: '1/4', color: '#ef4444', icon: '🔴' },
            { label: 'Avg Sea State', value: 'SSS-3', color: '#60a5fa', icon: '🌊' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '14px 16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: 'JetBrains Mono' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROUTES.map(r => (
            <RouteCard key={r.id} route={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaritimePage;

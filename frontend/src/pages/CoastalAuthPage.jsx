import React from 'react';
import { TrendChart, WindWaveChart } from '../components/Charts';

const ALERTS = [
  {
    id: 'a1',
    level: 'critical',
    icon: '🔴',
    title: 'Coral Bleaching Event — Andaman Islands',
    time: '14 min ago',
    category: 'Marine Ecology',
    description: 'Mass coral bleaching triggered by prolonged thermal stress (SST > 31°C for 4+ days). Estimated 40% of monitored reef surface affected. Immediate closure of tourist diving zones recommended.',
    actions: ['Deploy underwater temperature loggers', 'Notify MoEFCC', 'Suspend marine tourism permits', 'Begin stress monitoring protocol'],
    issued_by: 'Marine Biologist Agent',
  },
  {
    id: 'a2',
    level: 'critical',
    icon: '⛈️',
    title: 'Storm Warning — Bay of Bengal NE',
    time: '32 min ago',
    category: 'Meteorology',
    description: 'Low-pressure system developing 200nm northeast of Andaman Islands. Expected to intensify. Coastal communities within 50km should be on standby. IMD cyclone watch may be issued.',
    actions: ['Alert coastal communities', 'Put NDRF on standby', 'Restrict small vessel movement', 'Activate emergency helplines'],
    issued_by: 'Meteorology Agent',
  },
  {
    id: 'a3',
    level: 'warning',
    icon: '🌿',
    title: 'Algal Bloom Warning — Sunderbans Delta',
    time: '1h 12min ago',
    category: 'Water Quality',
    description: 'High chlorophyll-a concentrations (3.8 mg/m³) detected near Sunderbans estuary mouth. Potential hypoxic conditions developing. Shellfish harvesting should be suspended pending water quality testing.',
    actions: ['Water quality sampling', 'Suspend shellfish harvesting', 'Notify local fisheries dept', 'Monitor oxygen levels'],
    issued_by: 'Data Analyst Agent',
  },
  {
    id: 'a4',
    level: 'info',
    icon: '📡',
    title: 'Satellite Pass Scheduled — ISRO OceanSat-3',
    time: '2h 5min ago',
    category: 'Data Update',
    description: 'OceanSat-3 overflight scheduled at 16:45 IST. Expected data products: OSCAT wind vectors, OCM-3 chlorophyll, SST composite. Data ingestion will update all region metrics.',
    actions: ['Await data ingestion', 'Verify sensor calibration'],
    issued_by: 'Data Analyst Agent',
  },
];

const LEVEL_STYLE = {
  critical: { color: '#fca5a5', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', barColor: '#ef4444' },
  warning: { color: '#fcd34d', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', barColor: '#f59e0b' },
  info: { color: '#93c5fd', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)', barColor: '#3b82f6' },
};

function AlertCard({ alert }) {
  const style = LEVEL_STYLE[alert.level];
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${style.border}`,
      borderRadius: 14,
      overflow: 'hidden',
    }}>
      <div style={{ height: 3, background: style.barColor }} />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{alert.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#f0f6ff' }}>{alert.title}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, color: style.color,
                background: style.bg, border: `1px solid ${style.border}`,
                padding: '1px 8px', borderRadius: 99,
              }}>
                {alert.category}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                🕐 {alert.time} • via {alert.issued_by}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              {alert.description}
            </p>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>RECOMMENDED ACTIONS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {alert.actions.map((a, i) => (
                  <div key={i} style={{
                    fontSize: 12, color: style.color,
                    background: style.bg, border: `1px solid ${style.border}`,
                    padding: '3px 10px', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    <span style={{ opacity: 0.7 }}>→</span> {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoastalAuthPage({ marineData, trendData }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }} className="scroll-area">
      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.06))',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 40 }}>🏛️</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f6ff', marginBottom: 4 }}>
              Coastal Authority Command
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Operational dashboard for coastal defence, disaster management, and environmental authorities.
              Real-time ORCA agent alerts, escalation protocols, and environmental incident tracking.
            </p>
          </div>
        </div>

        {/* Alert summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Critical Alerts', value: '2', color: '#ef4444', icon: '🔴' },
            { label: 'Warnings', value: '1', color: '#f59e0b', icon: '⚠️' },
            { label: 'Info Notices', value: '1', color: '#60a5fa', icon: 'ℹ️' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: 'JetBrains Mono' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts feed */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          🔔 Active Incidents & Alerts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {ALERTS.map(a => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>

        {/* Region environmental summary */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          📊 Environmental Monitoring Summary
        </h3>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 20,
        }}>
          <table className="orca-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>SST (°C)</th>
                <th>Chlorophyll</th>
                <th>Wave Ht</th>
                <th>Fishing Ban</th>
                <th>Eco Risk</th>
              </tr>
            </thead>
            <tbody>
              {marineData.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600, color: '#f0f6ff' }}>{r.name}</td>
                  <td><span className="mono" style={{ color: r.sst > 30.5 ? '#fca5a5' : '#6ee7b7' }}>{r.sst}</span></td>
                  <td><span className="mono" style={{ color: r.chlorophyll < 0.5 ? '#fca5a5' : r.chlorophyll > 3.5 ? '#fcd34d' : '#6ee7b7' }}>{r.chlorophyll}</span></td>
                  <td><span className="mono" style={{ color: r.waveHeight > 3 ? '#fca5a5' : '#a5b4fc' }}>{r.waveHeight?.toFixed(1)}m</span></td>
                  <td>
                    {r.fishingBan ? (
                      <span style={{ color: '#fca5a5', fontWeight: 700, fontSize: 12 }}>🚫 Active</span>
                    ) : (
                      <span style={{ color: '#6ee7b7', fontSize: 12 }}>✅ None</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-${r.alert?.level === 'critical' ? 'critical' : r.alert?.level === 'warning' ? 'warning' : 'normal'}`}>
                      {r.alert?.icon} {r.alert?.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trend charts */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          📈 12-Hour Trend Overlay
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '14px 16px',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff', marginBottom: 12 }}>
              SST & Chlorophyll (Andaman)
            </h4>
            <div style={{ height: 200 }}>
              <TrendChart data={trendData} />
            </div>
          </div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '14px 16px',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff', marginBottom: 12 }}>
              Wind & Wave Height
            </h4>
            <div style={{ height: 200 }}>
              <WindWaveChart data={trendData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoastalAuthPage;

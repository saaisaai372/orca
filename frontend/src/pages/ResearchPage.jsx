import React from 'react';
import { TrendChart } from '../components/Charts';

const SATELLITES = [
  { name: 'ISRO OceanSat-3', type: 'SST + Chlorophyll', status: 'Active', lastPass: '12:30 IST', nextPass: '16:45 IST', coverage: 'Indian Ocean' },
  { name: 'NOAA-21 (VIIRS)', type: 'Sea Surface Temp', status: 'Active', lastPass: '09:15 IST', nextPass: '21:00 IST', coverage: 'Global' },
  { name: 'Sentinel-3A (Copernicus)', type: 'Ocean Colour + SST', status: 'Active', lastPass: '11:05 IST', nextPass: '14:20 IST', coverage: 'Global' },
  { name: 'CFOSAT', type: 'Wind + Waves', status: 'Standby', lastPass: '08:00 IST', nextPass: '20:15 IST', coverage: 'Global' },
];

const PARAMETERS = [
  { name: 'Sea Surface Temperature (SST)', icon: '🌡️', source: 'OceanSat-3 / VIIRS', resolution: '1 km', updateFreq: '3h', unit: '°C', range: '0 – 35°C', status: 'live' },
  { name: 'Chlorophyll-a Concentration', icon: '🌿', source: 'OCM-3 (OceanSat-3)', resolution: '360 m', updateFreq: '12h', unit: 'mg/m³', range: '0.01 – 100 mg/m³', status: 'live' },
  { name: 'Wind Speed & Direction', icon: '💨', source: 'CFOSAT / IMD', resolution: '12.5 km', updateFreq: '6h', unit: 'km/h', range: '0 – 200 km/h', status: 'live' },
  { name: 'Wave Height & Period', icon: '🌊', source: 'CFOSAT / Altimeter', resolution: '25 km', updateFreq: '6h', unit: 'm / sec', range: '0 – 20 m', status: 'live' },
  { name: 'Sea Surface Salinity', icon: '🧂', source: 'Argo Float Network', resolution: '~100 km', updateFreq: '24h', unit: 'PSU', range: '32 – 38 PSU', status: 'delayed' },
  { name: 'Ocean Colour (CDOM)', icon: '🔵', source: 'Sentinel-3 OLCI', resolution: '300 m', updateFreq: '12h', unit: 'Index', range: '0 – 10', status: 'live' },
];

function ResearchPage({ trendData, marineData }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }} className="scroll-area">
      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(139,92,246,0.06))',
          border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 40 }}>🔬</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f6ff', marginBottom: 4 }}>
              Research & Data Intelligence
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Satellite data pipelines, oceanographic parameter monitoring, and deep-dive analytics
              for marine researchers, universities, and scientific agencies.
            </p>
          </div>
        </div>

        {/* Satellite Status */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          🛰️ Satellite Data Sources
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
          {SATELLITES.map(sat => (
            <div key={sat.name} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              gap: 14,
              alignItems: 'center',
            }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>🛰️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#f0f6ff', marginBottom: 2 }}>{sat.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{sat.type} · {sat.coverage}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: '#8ba3c7' }}>Last: {sat.lastPass}</span>
                  <span style={{ fontSize: 11, color: '#8ba3c7' }}>Next: <b style={{ color: '#f0f6ff' }}>{sat.nextPass}</b></span>
                </div>
              </div>
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: sat.status === 'Active' ? '#6ee7b7' : '#fcd34d',
                  background: sat.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                  border: `1px solid ${sat.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                  padding: '2px 8px',
                  borderRadius: 99,
                }}>
                  {sat.status === 'Active' ? '● ' : '○ '}{sat.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Parameters */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          📡 Oceanographic Parameters
        </h3>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <table className="orca-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Source</th>
                <th>Resolution</th>
                <th>Update Freq</th>
                <th>Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PARAMETERS.map(p => (
                <tr key={p.name}>
                  <td>
                    <span style={{ marginRight: 6 }}>{p.icon}</span>
                    <span style={{ color: '#f0f6ff', fontWeight: 500 }}>{p.name}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.source}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.resolution}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.updateFreq}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.range}</td>
                  <td>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: p.status === 'live' ? '#6ee7b7' : '#fcd34d',
                      background: p.status === 'live' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      border: `1px solid ${p.status === 'live' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                      padding: '2px 8px',
                      borderRadius: 99,
                    }}>
                      {p.status === 'live' ? '🟢 Live' : '🟡 Delayed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trend comparison */}
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f6ff', marginBottom: 12 }}>
          📈 12-Hour Trend Analysis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {marineData.slice(0, 2).map(region => (
            <div key={region.id} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '14px 16px',
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff', marginBottom: 12 }}>
                {region.name}
              </h4>
              <div style={{ height: 180 }}>
                <TrendChart data={trendData} />
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  SST: <b style={{ color: '#fca5a5' }}>{region.sst}°C</b>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Chl-a: <b style={{ color: '#6ee7b7' }}>{region.chlorophyll} mg/m³</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;

import React from 'react';
import OrcaMap from '../components/OrcaMap';
import MetricGrid from '../components/MetricGrid';
import AgentFeed from '../components/AgentFeed';
import { TrendChart, WindWaveChart } from '../components/Charts';

function OverviewPage({
  marineData,
  selectedRegion,
  onRegionClick,
  insights,
  insightsLoading,
  trendData,
  onRefreshInsights,
}) {
  const criticalCount = marineData.filter(r => r.alert?.level === 'critical').length;
  const warningCount = marineData.filter(r => r.alert?.level === 'warning').length;
  const normalCount = marineData.filter(r => r.alert?.level === 'normal').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      {/* Top bar — Alert summary */}
      <div style={{
        padding: '10px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(7,14,29,0.6)',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Active Alerts:</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="badge-critical">🔴 {criticalCount} Critical</span>
          <span className="badge-warning">🟡 {warningCount} Warnings</span>
          <span className="badge-normal">🟢 {normalCount} Normal</span>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
          Last updated: {new Date().toLocaleTimeString('en-IN')} IST
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0, overflow: 'hidden' }}>
        {/* Left: Map + Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid var(--border)' }}>
          {/* Map */}
          <div style={{ flex: '0 0 340px', padding: '16px 16px 8px 16px', position: 'relative' }}>
            <OrcaMap
              regions={marineData}
              selectedRegion={selectedRegion}
              onRegionClick={onRegionClick}
            />
            {/* Map legend */}
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: 28,
              background: 'rgba(7,14,29,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '8px 12px',
              display: 'flex',
              gap: 14,
              zIndex: 999,
            }}>
              {[['🔴','Critical'],['🟡','Warning'],['🟢','Normal']].map(([icon,label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px' }}>
            {selectedRegion ? (
              <>
                <MetricGrid region={selectedRegion} />
                {/* Trend Charts */}
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    padding: '14px 16px',
                  }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff', marginBottom: 12 }}>
                      SST & Chlorophyll Trend
                    </h4>
                    <div style={{ height: 160 }}>
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
                      Wind & Wave Trend
                    </h4>
                    <div style={{ height: 160 }}>
                      <WindWaveChart data={trendData} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                gap: 12,
                color: 'var(--text-muted)',
              }}>
                <div style={{ fontSize: 40 }}>🌊</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Click a region marker on the map
                </div>
                <div style={{ fontSize: 13 }}>
                  to view detailed oceanographic metrics
                </div>
              </div>
            )}

            {/* All Regions Table */}
            <div style={{
              marginTop: 16,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff' }}>
                  All Monitored Regions
                </h4>
              </div>
              <table className="orca-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>SST (°C)</th>
                    <th>Chlorophyll</th>
                    <th>Wind</th>
                    <th>Waves</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {marineData.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => onRegionClick(r)}
                      style={{
                        cursor: 'pointer',
                        background: selectedRegion?.id === r.id ? 'rgba(59,130,246,0.06)' : 'transparent',
                      }}
                    >
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13, color: '#f0f6ff' }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.zone}</div>
                      </td>
                      <td>
                        <span className="mono" style={{ color: r.sst > 30.5 ? '#fca5a5' : '#f0f6ff' }}>
                          {r.sst}
                        </span>
                      </td>
                      <td>
                        <span className="mono" style={{ color: r.chlorophyll < 0.5 ? '#fca5a5' : r.chlorophyll > 3.5 ? '#fcd34d' : '#6ee7b7' }}>
                          {r.chlorophyll}
                        </span>
                      </td>
                      <td>
                        <span className="mono" style={{ color: r.windSpeed > 28 ? '#fca5a5' : '#93c5fd' }}>
                          {r.windSpeed?.toFixed(0)} km/h
                        </span>
                      </td>
                      <td>
                        <span className="mono" style={{ color: r.waveHeight > 3 ? '#fca5a5' : '#a5b4fc' }}>
                          {r.waveHeight?.toFixed(1)} m
                        </span>
                      </td>
                      <td>
                        <span className={`badge-${r.alert?.level}`}>
                          {r.alert?.icon} {r.alert?.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Agent Feed */}
        <div style={{ padding: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <AgentFeed
            insights={insights}
            loading={insightsLoading}
            onRefresh={onRefreshInsights}
          />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

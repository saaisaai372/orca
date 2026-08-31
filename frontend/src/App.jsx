import React, { useState, useEffect, useCallback } from 'react';
import { generateMarineData, generateTrendData, generateAgentInsights } from './services/marineData';
import OverviewPage from './pages/OverviewPage';
import FisheryPage from './pages/FisheryPage';
import MaritimePage from './pages/MaritimePage';
import CoastalAuthPage from './pages/CoastalAuthPage';
import ResearchPage from './pages/ResearchPage';

const NAV_ITEMS = [
  { id: 'overview',  label: 'Command Center',  icon: '🌐', subtitle: 'Live overview' },
  { id: 'fishery',   label: 'Fishery Mode',    icon: '🎣', subtitle: 'Catch advisories' },
  { id: 'maritime',  label: 'Maritime Routing',icon: '⚓', subtitle: 'Shipping lanes' },
  { id: 'coastal',   label: 'Coastal Authority',icon: '🏛️', subtitle: 'Alerts & incidents' },
  { id: 'research',  label: 'Research & Data', icon: '🔬', subtitle: 'Satellites & params' },
];

function OrcaLogo() {
  return (
    <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        boxShadow: '0 0 20px rgba(14,165,233,0.35), 0 0 40px rgba(29,78,216,0.2)',
        flexShrink: 0,
      }}>
        🐋
      </div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em', color: '#f0f6ff', lineHeight: 1 }}>
          ORCA
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', color: '#4d6689', textTransform: 'uppercase', marginTop: 3 }}>
          Ocean Risk & Condition Analyzer
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeView, onNavigate }) {
  return (
    <div style={{
      width: 228,
      height: '100%',
      background: 'var(--bg-dark)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <OrcaLogo />

      {/* Nav */}
      <div style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', padding: '8px 8px 6px', textTransform: 'uppercase' }}>
          Stakeholder Views
        </div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item${activeView === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, lineHeight: 1 }}>{item.label}</div>
              <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>{item.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom info */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--border)',
        background: 'rgba(7,14,29,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.75 }} />
            <div style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#34d399' }}>4 Agents Active</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          📡 Data Source: NOAA / ISRO Simulated<br />
          🔄 Auto-refresh: 60s
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          {['📊', '🔬', '🌦️', '🎯'].map((emoji, i) => (
            <div key={i} style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
              title: ['Analyst','Biologist','Meteorologist','Advisor'][i],
            }}>
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar({ activeView, lastUpdated }) {
  const current = NAV_ITEMS.find(n => n.id === activeView);
  return (
    <div style={{
      height: 58,
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      background: 'rgba(7,14,29,0.85)',
      backdropFilter: 'blur(12px)',
      flexShrink: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{current?.icon}</span>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f0f6ff', lineHeight: 1 }}>{current?.label}</h2>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>ORCA — AI Marine Intelligence Platform</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Satellite indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>🛰️</span>
          <span>OceanSat-3 live</span>
        </div>
        {/* Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>🕐</span>
          <span>{lastUpdated}</span>
        </div>
        {/* Status pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 99,
          padding: '4px 12px',
        }}>
          <div style={{ position: 'relative', width: 7, height: 7 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.75 }} />
            <div style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#34d399' }}>All Systems Online</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [marineData, setMarineData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [trendData, setTrendData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('—');

  const refreshData = useCallback(() => {
    const data = generateMarineData();
    setMarineData(data);
    setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    // Keep selected region updated
    setSelectedRegion(prev => prev ? data.find(r => r.id === prev.id) || prev : null);

    // Update trend data for selected region
    const regionId = selectedRegion?.id || 'andaman';
    setTrendData(generateTrendData(regionId, 12));
  }, [selectedRegion?.id]);

  const refreshInsights = useCallback(() => {
    setInsightsLoading(true);
    // Simulate agent thinking delay
    setTimeout(() => {
      const data = generateMarineData();
      setInsights(generateAgentInsights(data));
      setInsightsLoading(false);
    }, 1200);
  }, []);

  // Initial load
  useEffect(() => {
    refreshData();
    refreshInsights();
    setTrendData(generateTrendData('andaman', 12));
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 60000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const handleRegionClick = useCallback((region) => {
    setSelectedRegion(region);
    setTrendData(generateTrendData(region.id, 12));
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-deep)' }}>
      {/* Sidebar */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar activeView={activeView} lastUpdated={lastUpdated} />

        {/* Page content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {activeView === 'overview' && (
            <OverviewPage
              marineData={marineData}
              selectedRegion={selectedRegion}
              onRegionClick={handleRegionClick}
              insights={insights}
              insightsLoading={insightsLoading}
              trendData={trendData}
              onRefreshInsights={refreshInsights}
            />
          )}
          {activeView === 'fishery' && (
            <FisheryPage marineData={marineData} />
          )}
          {activeView === 'maritime' && (
            <MaritimePage />
          )}
          {activeView === 'coastal' && (
            <CoastalAuthPage marineData={marineData} trendData={trendData} />
          )}
          {activeView === 'research' && (
            <ResearchPage trendData={trendData} marineData={marineData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';

const agentColors = {
  observation: { bg: '#1e3a5f', border: '#3b82f6', dot: '#60a5fa', label: 'OBSERVATION' },
  analysis:    { bg: '#2d1b5e', border: '#8b5cf6', dot: '#a78bfa', label: 'ANALYSIS' },
  forecast:    { bg: '#1a3a2e', border: '#0ea5e9', dot: '#38bdf8', label: 'FORECAST' },
  recommendation: { bg: '#1a3322', border: '#10b981', dot: '#34d399', label: 'RECOMMENDATION' },
};

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function AgentBubble({ insight, index, isNew }) {
  const style = agentColors[insight.role] || agentColors.observation;

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        gap: 12,
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
        animation: `fadeSlideIn 0.4s ease ${index * 0.15}s forwards`,
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: style.bg,
          border: `1px solid ${style.border}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>
          {insight.avatar}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#f0f6ff' }}>
            {insight.agent}
          </span>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: style.dot,
            background: `${style.bg}cc`,
            border: `1px solid ${style.border}44`,
            padding: '1px 7px',
            borderRadius: 99,
          }}>
            {style.label}
          </span>
          <span style={{ fontSize: 11, color: '#4d6689', marginLeft: 'auto' }}>
            {timeAgo(insight.timestamp)}
          </span>
        </div>

        <div style={{
          background: `${style.bg}88`,
          border: `1px solid ${style.border}33`,
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: 13,
          lineHeight: 1.6,
          color: '#c8d8f0',
        }}>
          {insight.message}
        </div>
      </div>
    </div>
  );
}

function AgentFeed({ insights, loading, onRefresh }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(7,14,29,0.8)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#10b981',
              animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
              opacity: 0.75,
            }} />
            <div style={{
              position: 'relative',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
            }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#f0f6ff' }}>
            Live Agent Reasoning
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {loading && (
            <span style={{ fontSize: 12, color: '#60a5fa', animation: 'pulse 1.5s infinite' }}>
              Agents analyzing…
            </span>
          )}
          <button
            onClick={onRefresh}
            style={{
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: '#93c5fd',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Agent count badges */}
      <div style={{
        padding: '10px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: 6,
        background: 'rgba(7,14,29,0.5)',
        flexShrink: 0,
      }}>
        {Object.entries(agentColors).map(([role, style]) => (
          <div key={role} style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: style.dot,
            background: `${style.bg}88`,
            border: `1px solid ${style.border}33`,
            padding: '2px 8px',
            borderRadius: 99,
          }}>
            {style.label}
          </div>
        ))}
      </div>

      {/* Messages */}
      <div
        className="scroll-area"
        style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 18, overflowY: 'auto' }}
      >
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ display: 'flex', gap: 12, opacity: 0.4 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-card-hover)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 12, width: 140, borderRadius: 6, background: 'var(--bg-card-hover)', marginBottom: 8,
                    backgroundImage: 'linear-gradient(90deg, transparent, rgba(99,179,255,0.1), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                  }} />
                  <div style={{ height: 56, borderRadius: 10, background: 'var(--bg-card-hover)',
                    backgroundImage: 'linear-gradient(90deg, transparent, rgba(99,179,255,0.1), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          insights.map((insight, idx) => (
            <AgentBubble key={insight.id} insight={insight} index={idx} />
          ))
        )}
      </div>
    </div>
  );
}

export default AgentFeed;

import React from 'react';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#0c1629',
        border: '1px solid rgba(99,179,255,0.2)',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 12,
        color: '#f0f6ff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <div style={{ color: '#8ba3c7', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function TrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="sstGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="chloroGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,179,255,0.06)" />
        <XAxis dataKey="time" stroke="#4d6689" tick={{ fontSize: 11 }} />
        <YAxis stroke="#4d6689" tick={{ fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#8ba3c7', paddingTop: 8 }} />
        <Area
          type="monotone"
          dataKey="sst"
          name="SST (°C)"
          stroke="#ef4444"
          strokeWidth={2}
          fill="url(#sstGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#ef4444' }}
        />
        <Area
          type="monotone"
          dataKey="chloro"
          name="Chlorophyll (mg/m³)"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#chloroGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#10b981' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WindWaveChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,179,255,0.06)" />
        <XAxis dataKey="time" stroke="#4d6689" tick={{ fontSize: 11 }} />
        <YAxis stroke="#4d6689" tick={{ fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#8ba3c7', paddingTop: 8 }} />
        <Line
          type="monotone"
          dataKey="wind"
          name="Wind (km/h)"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="wave"
          name="Wave Ht (m)"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

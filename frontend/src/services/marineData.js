/**
 * ORCA — Marine Data Service
 * Generates realistic simulated marine data for the Indian Ocean & Indian Coastal Waters.
 * In production, this would connect to NOAA, Copernicus Marine Service, etc.
 */

const REGIONS = [
  {
    id: 'goa',
    name: 'Goa Coast',
    lat: 15.3,
    lon: 73.8,
    zone: 'Arabian Sea',
    baseSST: 29.5,
    baseChloro: 1.8,
    baseWind: 18,
    baseWaveHeight: 1.2,
    fishingBan: false,
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    lat: 8.1,
    lon: 77.5,
    zone: 'Laccadive Sea',
    baseSST: 30.2,
    baseChloro: 0.9,
    baseWind: 22,
    baseWaveHeight: 2.1,
    fishingBan: false,
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    lat: 11.9,
    lon: 92.9,
    zone: 'Bay of Bengal',
    baseSST: 31.4,
    baseChloro: 0.2,
    baseWind: 35,
    baseWaveHeight: 3.5,
    fishingBan: true,
  },
  {
    id: 'sunderbans',
    name: 'Sunderbans',
    lat: 21.6,
    lon: 88.0,
    zone: 'Bay of Bengal',
    baseSST: 28.7,
    baseChloro: 3.8,
    baseWind: 12,
    baseWaveHeight: 0.9,
    fishingBan: false,
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    lat: 10.5,
    lon: 72.6,
    zone: 'Arabian Sea',
    baseSST: 30.8,
    baseChloro: 0.3,
    baseWind: 28,
    baseWaveHeight: 2.8,
    fishingBan: false,
  },
  {
    id: 'rann_of_kutch',
    name: 'Gulf of Kutch',
    lat: 22.8,
    lon: 69.8,
    zone: 'Arabian Sea',
    baseSST: 27.2,
    baseChloro: 2.4,
    baseWind: 15,
    baseWaveHeight: 1.0,
    fishingBan: false,
  },
];

function randomVariance(base, spread) {
  return parseFloat((base + (Math.random() - 0.5) * spread * 2).toFixed(2));
}

function classifyAlert(sst, chlorophyll, windSpeed, waveHeight) {
  if (sst > 31.0 && chlorophyll < 0.4) {
    return { level: 'critical', label: 'Coral Bleaching Risk', icon: '🔴' };
  }
  if (windSpeed > 30 || waveHeight > 3.0) {
    return { level: 'critical', label: 'Storm Warning', icon: '⛈️' };
  }
  if (chlorophyll > 4.0) {
    return { level: 'warning', label: 'Algal Bloom Detected', icon: '🟡' };
  }
  if (sst > 30.0 || windSpeed > 20) {
    return { level: 'warning', label: 'Elevated Conditions', icon: '🟠' };
  }
  return { level: 'normal', label: 'Normal', icon: '🟢' };
}

export function generateMarineData() {
  const now = new Date();
  return REGIONS.map((region) => {
    const sst = randomVariance(region.baseSST, 0.8);
    const chlorophyll = randomVariance(region.baseChloro, 0.4);
    const windSpeed = randomVariance(region.baseWind, 5);
    const waveHeight = randomVariance(region.baseWaveHeight, 0.5);
    const salinity = randomVariance(35.0, 0.8);
    const visibility = Math.max(1, randomVariance(12, 4));
    const alert = classifyAlert(sst, chlorophyll, windSpeed, waveHeight);

    return {
      ...region,
      sst,
      chlorophyll,
      windSpeed,
      waveHeight,
      salinity,
      visibility,
      alert,
      humidity: randomVariance(78, 10),
      pressure: randomVariance(1013, 8),
      uvIndex: randomVariance(7, 3),
      fishDensityIndex: parseFloat((Math.random() * 10).toFixed(1)),
      timestamp: now.toISOString(),
    };
  });
}

export function generateTrendData(regionId, hours = 12) {
  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];
  const now = new Date();
  const points = [];

  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourLabel = `${String(time.getHours()).padStart(2, '0')}:00`;
    points.push({
      time: hourLabel,
      sst: randomVariance(region.baseSST, 0.6),
      chloro: randomVariance(region.baseChloro, 0.3),
      wind: randomVariance(region.baseWind, 4),
      wave: randomVariance(region.baseWaveHeight, 0.4),
    });
  }
  return points;
}

export function generateAgentInsights(data) {
  const criticalRegions = data.filter((r) => r.alert.level === 'critical');
  const warningRegions = data.filter((r) => r.alert.level === 'warning');
  const avgSST = (data.reduce((s, r) => s + r.sst, 0) / data.length).toFixed(1);
  const maxWind = Math.max(...data.map((r) => r.windSpeed)).toFixed(0);

  const insights = [
    {
      id: 1,
      agent: 'Data Analyst Agent',
      role: 'observation',
      avatar: '📊',
      message: `Live scan complete. Monitoring ${data.length} regions across Indian coastal waters. Average SST is ${avgSST}°C. ${criticalRegions.length} region(s) flagged CRITICAL, ${warningRegions.length} flagged WARNING. Max wind speed recorded at ${maxWind} km/h.`,
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: 2,
      agent: 'Marine Biologist Agent',
      role: 'analysis',
      avatar: '🔬',
      message: criticalRegions.length > 0
        ? `ALERT: ${criticalRegions[0].name} shows SST of ${criticalRegions[0].sst}°C with chlorophyll at only ${criticalRegions[0].chlorophyll} mg/m³. This thermal-stress signature is consistent with mass coral bleaching events. The phytoplankton collapse indicates a disrupted marine food web — fish migration patterns are expected to shift south within 48–72 hours.`
        : `Current chlorophyll levels across monitored zones are within seasonal norms. The Sunderbans region shows healthy phytoplankton density at ${data.find(r=>r.id==='sunderbans')?.chlorophyll} mg/m³, indicating active upwelling. No biological stress events detected at this time.`,
      timestamp: new Date(Date.now() - 80000).toISOString(),
    },
    {
      id: 3,
      agent: 'Meteorology Agent',
      role: 'forecast',
      avatar: '🌦️',
      message: warningRegions.length > 0
        ? `Atmospheric pressure gradient indicates a developing low-pressure system near ${warningRegions[0].name}. Current wind speed of ${warningRegions[0].windSpeed.toFixed(0)} km/h is projected to intensify to 45–55 km/h over the next 6 hours. Wave heights may breach 4m. IMD coordinates advised.`
        : `Synoptic charts show stable atmospheric conditions across all monitored regions. No developing low-pressure systems detected. Ocean-atmosphere interaction metrics are nominal. Forecast window: 72 hours stable.`,
      timestamp: new Date(Date.now() - 40000).toISOString(),
    },
    {
      id: 4,
      agent: 'Stakeholder Advisor Agent',
      role: 'recommendation',
      avatar: '🎯',
      message: (() => {
        let msg = 'RECOMMENDATIONS — ';
        if (criticalRegions.some(r => r.id === 'andaman')) {
          msg += '🔴 Andaman fishermen: Suspend operations; coral bleaching & storm risk. 🟢 Sunderbans: Excellent conditions, high fish density index (FDI). ';
        }
        msg += `Maritime operators: ${warningRegions.length > 0 ? `Avoid ${warningRegions.map(r=>r.name).join(', ')} due to sea state.` : 'All shipping lanes clear.'} Coastal Authorities: `;
        msg += criticalRegions.length > 0 ? 'Activate coral monitoring protocol for affected zones.' : 'Standard monitoring protocols sufficient.';
        return msg;
      })(),
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
  ];

  return insights;
}

export const REGIONS_CONFIG = REGIONS;

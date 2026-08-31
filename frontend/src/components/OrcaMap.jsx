import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const RISK_COLORS = {
  critical: '#ef4444',
  warning:  '#f59e0b',
  normal:   '#10b981',
};

function OrcaMap({ regions, onRegionClick, selectedRegion }) {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const markers     = useRef([]);

  // Init map once
  useEffect(() => {
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [15, 82],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      opacity: 0.75,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!mapInstance.current || !regions.length) return;

    // Remove old markers
    markers.current.forEach(m => m.remove());
    markers.current = [];

    regions.forEach(region => {
      const color     = RISK_COLORS[region.alert?.level] || '#10b981';
      const isSelected = selectedRegion?.id === region.id;
      const size       = isSelected ? 26 : 18;

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:2.5px solid #fff;
            border-radius:50%;
            box-shadow:0 0 ${isSelected?22:12}px ${color}88;
            position:relative;
          ">
            ${region.alert?.level !== 'normal' ? `
            <div style="
              position:absolute;top:-5px;left:-5px;right:-5px;bottom:-5px;
              border:2px solid ${color};border-radius:50%;
              animation:orca-ping 1.4s ease-out infinite;opacity:0.6;
            "></div>` : ''}
          </div>
          <style>
            @keyframes orca-ping{
              0%{transform:scale(1);opacity:0.6;}
              100%{transform:scale(2.2);opacity:0;}
            }
          </style>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([region.lat, region.lon], { icon });

      marker.bindPopup(L.popup({ closeButton: false, maxWidth: 230 }).setContent(`
        <div style="background:#0c1629;color:#f0f6ff;padding:12px 14px;border-radius:10px;
          font-family:Inter,sans-serif;font-size:13px;border:1px solid rgba(99,179,255,0.2);min-width:200px;">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${region.name}</div>
          <div style="color:#8ba3c7;font-size:12px;margin-bottom:10px;">${region.zone}</div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div>🌡️ SST: <b style="color:#fca5a5">${region.sst}°C</b></div>
            <div>🌿 Chlorophyll: <b style="color:#6ee7b7">${region.chlorophyll} mg/m³</b></div>
            <div>💨 Wind: <b style="color:#93c5fd">${region.windSpeed?.toFixed(0)} km/h</b></div>
            <div>🌊 Waves: <b style="color:#a5b4fc">${region.waveHeight?.toFixed(1)} m</b></div>
          </div>
          <div style="margin-top:10px;padding:3px 10px;border-radius:99px;background:${color}22;
            color:${color};border:1px solid ${color}44;font-size:11px;font-weight:600;display:inline-block;">
            ${region.alert?.icon} ${region.alert?.label}
          </div>
        </div>
      `));

      marker.on('click', () => {
        onRegionClick && onRegionClick(region);
      });

      marker.addTo(mapInstance.current);
      markers.current.push(marker);
    });
  }, [regions, selectedRegion, onRegionClick]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden' }}
    />
  );
}

export default OrcaMap;

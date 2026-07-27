import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Destination coordinates [Lat, Lng]
const DESTINATIONS = [
  { name: 'Bengaluru (Home)', coords: [12.9716, 77.5946], type: 'Home' },
  { name: 'Vietnam', coords: [14.0583, 108.2772], type: 'Completed' },
  { name: 'Malaysia (Kuala Lumpur)', coords: [3.1390, 101.6869], type: 'Completed' },
  { name: 'Philippines (Manila)', coords: [14.5995, 120.9842], type: 'Completed' },
  { name: 'Macau', coords: [22.1987, 113.5439], type: 'Completed' },
  { name: 'Sri Lanka (Colombo)', coords: [6.9271, 79.8612], type: 'Completed' },
  { name: 'Mysore', coords: [12.2958, 76.6394], type: 'Completed' },
  { name: 'Maldives (Male)', coords: [4.1755, 73.5093], type: 'Upcoming' },
  { name: 'Mauritius', coords: [-20.3484, 57.5522], type: 'Upcoming' },
  { name: 'Nepal (Pokhara)', coords: [28.2096, 83.9856], type: 'Upcoming' },
];

// Sample connecting travel flight path from Bengaluru -> Regional Hubs
const FLIGHT_PATH = [
  [12.9716, 77.5946], // Bengaluru
  [3.1390, 101.6869], // Kuala Lumpur
  [14.0583, 108.2772], // Vietnam
  [22.1987, 113.5439], // Macau
  [14.5995, 120.9842], // Manila
  [6.9271, 79.8612],  // Colombo
  [4.1755, 73.5093],  // Maldives
];

export default function TravelMap() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-12 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🗺️</span> Interactive Travel Map
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Explore pinned destinations and regional flight connections across Asia & Indian Ocean
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[420px] w-full rounded-xl overflow-hidden border border-slate-800">
        <MapContainer
          center={[12.0, 85.0]}
          zoom={4}
          scrollWheelZoom={false}
          className="h-full w-full z-10"
        >
          {/* Dark Mode Tile Provider */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Connected Flight Line */}
          <Polyline
            positions={FLIGHT_PATH}
            color="#2dd4bf"
            weight={2}
            dashArray="6, 8"
          />

          {/* Pinned Destination Markers */}
          {DESTINATIONS.map((dest, idx) => (
            <Marker key={idx} position={dest.coords}>
              <Popup>
                <div className="text-slate-900 font-sans p-1">
                  <strong className="block text-sm">{dest.name}</strong>
                  <span className="text-xs text-slate-600 uppercase font-semibold">
                    Status: {dest.type}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import museumIconUrl from '../assets/museumIcon.PNG';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import './MapView.css';

// Removed global Leaflet icon configuration

// Custom marker icon
const museumIcon = new L.Icon({
  iconUrl: museumIconUrl, // Use the imported museum icon URL
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: shadowUrl, // Use the imported shadow URL
  shadowSize: [41, 41]
});

const MapView = ({
  center = [20.6597, -103.3496], // Default center (Guadalajara)
  zoom = 12,
  markers = [],
  height = '400px',
  onMarkerClick
}) => {
  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={museumIcon}
          >
            <Popup>
              <div>
                <h3>{marker.title}</h3>
                <p>{marker.description}</p>
                <button 
                  onClick={() => onMarkerClick(marker.id)}
                  className="view-museum-btn"
                >
                  Ver museo
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

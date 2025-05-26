import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import museumIconUrl from '../assets/mapSymbol.PNG';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import './MapView.css';


const museumIcon = L.icon({
  iconUrl: museumIconUrl,
  iconSize: [48, 48], // Adjust size as needed
  iconAnchor: [24, 48], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -48], // Point from which the popup should open relative to the iconAnchor
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const MapView = ({ 
  center = [20.6597, -103.3496], // Default center (Guadalajara)
  zoom = 12,
  markers = [],
  height = '400px'
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
        {markers.map((marker, index) => (
       <Marker
       key={index}
       position={[marker.lat, marker.lng]}
       icon={museumIcon}
     >
       <Popup>
         <div>
           <h3>{marker.title}</h3>
           {marker.description && <p>{marker.description}</p>}
           {marker.address && <p>{marker.address}</p>}
         </div>
       </Popup>
     </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

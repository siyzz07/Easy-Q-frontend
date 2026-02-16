import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import type { Imap } from "../../Shared/types/Types";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


const ChangeView = ({
  center,
  zoom,
}: {
  center: { lat: number; lng: number };
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};


const LocationMarker = ({
  position,
  setPosition,
  onSelect,
}: {
  position: { lat: number; lng: number };
  setPosition: (pos: { lat: number; lng: number }) => void;
  onSelect: (pos: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPos);
      onSelect(newPos);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Map: FC<Imap> = ({
  onSelect,
  defaultCenter = { lat: 12.9716, lng: 77.5946 },
  zoom = 13,
  height = "400px",
}) => {
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number }>(
    defaultCenter
  );
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    defaultCenter
  );

  useEffect(() => {
     if (defaultCenter) {
         setMapCenter(defaultCenter);
         setMarkerPos(defaultCenter);
     }
  }, [defaultCenter.lat, defaultCenter.lng]);

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPos(userLocation);
          setMapCenter(userLocation);
          onSelect(userLocation);
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    }
  };

  return (
    <div style={{ height, position: "relative", width: "100%", zIndex: 0 }}>
      <div
        onClick={locateMe}
        title="Locate Me"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          cursor: "pointer",
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MapPin size={24} color="#4285F4" />
      </div>

      <MapContainer
        key={`${mapCenter.lat}-${mapCenter.lng}`} 
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={mapCenter} zoom={zoom} />
        <LocationMarker
          position={markerPos}
          setPosition={setMarkerPos}
          onSelect={onSelect}
        />
      </MapContainer>
    </div>
  );
};

export default Map;

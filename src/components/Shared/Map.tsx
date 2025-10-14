import React, { useState } from "react";
import type { FC } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Imap } from "../../Shared/types/Types";
import { MapPin } from "lucide-react";

const containerStyle = { width: "100%", height: "400px" };

const Map: FC<Imap> = ({
  onSelect,
  defaultCenter = { lat: 12.9716, lng: 77.5946 },
  zoom = 13,
  height = "400px",
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [markerPos, setMarkerPos] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  
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
          // alert("Could not get your location. Please allow location access.");
        }
      );
    } else {
      // alert("Geolocation is not supported by your browser.");
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkerPos(clickedLocation);
      onSelect(clickedLocation);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div style={{ height, position: "relative" }}>
      {/* MapPin icon as clickable button */}
      <MapPin
        onClick={locateMe}
        size={32}
        color="#4285F4"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          cursor: "pointer",
        }}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onClick={handleMapClick}
      >
        <Marker position={markerPos} />
      </GoogleMap>
    </div>
  );
};

export default Map;

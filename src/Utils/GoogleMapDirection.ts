export const GoogleMapDirection = (lat: number, lng: number) => {
    console.log('reached on map');
    
  window.open(
    `${import.meta.env.VITE_GOOGLE_MAP}${lat},${lng}`
  );
};
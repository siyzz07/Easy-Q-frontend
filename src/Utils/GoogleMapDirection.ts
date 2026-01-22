export const GoogleMapDirection = (lat: number, lng: number) => {

  window.open(
    `${import.meta.env.VITE_GOOGLE_MAP}${lat},${lng}`
  );
};
  export const convertRailwayTime = (time24?: string) => {
    if (!time24) return "--";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hours12 = h % 12 || 12;
    return `${hours12}:${minutes} ${ampm}`;
  };
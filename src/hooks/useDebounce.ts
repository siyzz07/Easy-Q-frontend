import { useEffect, useState } from "react";

export function useDebounce(value: string, delay = 500): string {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (value.length <= 2) {
      setDebouncedValue("");
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

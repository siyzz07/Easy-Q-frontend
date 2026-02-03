import React, { useEffect, useState } from "react";

type Suggestion = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSelect: (data: { name: string; lat: number; lng: number }) => void;
  error?: string | null;
};

const   LocationAutoSuggest: React.FC<Props> = ({
  value,
  onChange,
  onSelect,
  error,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value.trim() || value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&addressdetails=1&limit=6&countrycodes=in&accept-language=en`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        const data: Suggestion[] = await res.json();
        setSuggestions(data);
        setShow(true);
      } catch (err) {
        console.log("Suggestion error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (item: Suggestion) => {
    const name = item.display_name;
    const lat = Number(item.lat);
    const lng = Number(item.lon);

    onChange(name);
    setSuggestions([]);
    setShow(false);

    onSelect({ name, lat, lng });
  };

  return (
    <div className="relative w-full ">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShow(true)}
        placeholder="Enter a place (e.g. Kochi)"
        className={`w-full h-12 pl-12 pr-4 rounded-xl bg-transparent outline-none transition-colors ${
          error ? "bg-red-50 text-red-600" : ""
        }`}
      />

      {loading && (
        <p className="absolute left-4 -bottom-6 text-xs text-gray-400">
          {/* searching... */}
        </p>
      )}

      {show && suggestions.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-white rounded-b-xl shadow-lg z-[9999] overflow-hidden">
          {suggestions.map((item) => (
            <button
              key={item.place_id}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
            >
              {item.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutoSuggest;

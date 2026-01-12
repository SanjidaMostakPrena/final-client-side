
import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fly to marker component
const FlyToMarker = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 12, { animate: true, duration: 1.5 });
  }, [coords, map]);
  return null;
};

// Normalize text for search
const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[\s'’-]/g, "")
    .replace(/[^a-z]/g, "");

// Service center data
const serviceCenters = [
  { district: "Dhaka", latitude: 23.8103, longitude: 90.4125, covered_area: ["Gulshan", "Banani", "Dhanmondi", "Mirpur"] },
  { district: "Cox's Bazar", latitude: 21.4272, longitude: 92.0058, covered_area: ["Cox's Bazar Sadar", "Ukhia", "Teknaf"] },
  { district: "Sylhet", latitude: 24.8949, longitude: 91.8687, covered_area: ["Khadimnagar", "Zindabazar", "Bimanbandar"] },
  { district: "Narail", latitude: 23.1712, longitude: 89.5093, covered_area: ["Narail Sadar", "Lohagara", "Kalia"] },
  { district: "Brahmanbaria", latitude: 23.9570, longitude: 91.1230, covered_area: ["Brahmanbaria Sadar", "Nabinagar", "Kasba"] },
  // Add other districts here
];

// Remove duplicate districts
const uniqueCenters = Array.from(
  new Map(serviceCenters.map(c => [normalize(c.district), c])).values()
);

const Coverage = () => {
  const defaultPosition = [23.685, 90.3563]; // Bangladesh center
  const [flyToCoords, setFlyToCoords] = useState(null);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    const input = e.target.location.value.trim();
    if (!input) return;

    const normalizedInput = normalize(input);

    const district = uniqueCenters.find(
      (c) => normalize(c.district) === normalizedInput
    );

    if (district) {
      setFlyToCoords([district.latitude, district.longitude]);
    } else {
      const matches = uniqueCenters.filter(c => normalize(c.district).includes(normalizedInput));
      if (matches.length) {
        setError(`Did you mean: ${matches.map(m => m.district).join(", ")}?`);
      } else {
        setError("❌ District not found. Please check spelling.");
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-500 min-h-screen px-4 py-14 max-w-7xl mx-auto">
<div className="max-w-7xl mx-auto px-4 pt-10">
  <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-900 dark:text-indigo-200">
    Nationwide Coverage
  </h1>
</div>

     

      <p className="text-center text-lg text-indigo-900 dark:text-gray-300 max-w-3xl mx-auto mb-10">
        BookCourier delivers books from libraries to homes across all 64 districts of Bangladesh. Search your district and explore our service reach.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
      >
        <input
          type="search"
          name="location"
          placeholder="Search district (e.g. Dhaka, Sylhet)"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-indigo-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-500"
        />
        <button
          type="submit"
          className="mt-auto inline-block w-full px-10 sm:w-auto bg-gradient-to-r from-teal-400 to-indigo-500 dark:from-teal-500 dark:to-indigo-600 hover:from-indigo-500 hover:to-teal-400 dark:hover:from-indigo-600 dark:hover:to-teal-500 text-white py-2 rounded-xl font-semibold transition-all duration-300"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-700 max-w-7xl mx-auto h-[650px]">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {uniqueCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup className="text-gray-900 dark:text-gray-200">
                <h3 className="font-bold text-teal-600 dark:text-teal-400">{center.district}</h3>
                <p className="text-sm mt-1">
                  Areas: {center.covered_area.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}

          {flyToCoords && <FlyToMarker coords={flyToCoords} />}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;

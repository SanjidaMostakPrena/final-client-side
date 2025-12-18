import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router-dom'; 

// Helper component to handle flyTo dynamically
const FlyToMarker = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 14);
  }, [coords, map]);
  return null;
};

const Coverage = () => {
  const defaultPosition = [23.6850, 90.3563];
  const ServiceCenters = useLoaderData() || []; // ensure it's always array
  const [flyToCoords, setFlyToCoords] = useState(null);
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    if (!location || ServiceCenters.length === 0) return;

    const district = ServiceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      setFlyToCoords(coord);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f0f4f8] to-[#ffffff] p-8">
      <h2 className="text-5xl font-bold text-center mb-6 text-gray-800">
        We are Available in 64 Districts
      </h2>

      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg">
        At BookCourier, we believe in making books accessible to everyone. Explore our wide network 
        of library service centers across the country. Find your nearest district and see how 
        we deliver knowledge right to your doorstep.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-xl mx-auto">
        <label className="flex items-center gap-2 w-full bg-white rounded-lg shadow px-4 py-2">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow outline-none text-gray-700"
            name="location"
            placeholder="Search district..."
          />
        </label>

        <button type="submit" className="btn btn-neutral bg-blue-600 text-white hover:bg-blue-700 transition rounded-lg px-4 py-2">
          Search
        </button>
      </form>

      <div className="border rounded-lg overflow-hidden shadow-lg w-full h-[800px]">
        <MapContainer
          center={defaultPosition}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px] w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ServiceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong className="text-blue-600">{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(', ')}.
              </Popup>
            </Marker>
          ))}

          {/* Fly to searched district */}
          {flyToCoords && <FlyToMarker coords={flyToCoords} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

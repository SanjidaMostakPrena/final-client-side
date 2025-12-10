import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const ServiceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value.trim();
    if (!location) return;

    const district = ServiceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];

      // flyTo works only if we access the Leaflet instance
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div>
      <h2 className="text-5xl mb-6">We are Available in 64 Districts</h2>

      {/* Fixed form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <label className="input flex items-center gap-2 w-full">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            name="location"
            placeholder="Search district..."
          />
        </label>

        <button type="submit" className="btn btn-neutral">Search</button>
      </form>

      <div className="border w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}   // FIXED
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ServiceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(', ')}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

// import React, { useRef, useState, useEffect } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";


// const FlyToMarker = ({ coords }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (coords) map.flyTo(coords, 12, { animate: true, duration: 1.5 });
//   }, [coords, map]);
//   return null;
// };


// const normalize = (text = "") => text.toLowerCase().replace(/[^a-z]/g, "");

// const serviceCenters = [
  
//   { "district": "Dhaka", "latitude": 23.8103, "longitude": 90.4125, "covered_area": ["Gulshan", "Banani", "Dhanmondi", "Mirpur"] },
//   { "district": "Faridpur", "latitude": 23.6076, "longitude": 89.8433, "covered_area": ["Sadarpur", "Boalmari", "Bhanga"] },
//   { "district": "Gazipur", "latitude": 23.9996, "longitude": 90.4203, "covered_area": ["Tongi", "Kaliakair", "Sreepur"] },
//   { "district": "Gopalganj", "latitude": 23.0050, "longitude": 89.8281, "covered_area": ["Gopalganj Sadar", "Kotalipara", "Tungipara"] },
//   { "district": "Kishoreganj", "latitude": 24.4302, "longitude": 90.7760, "covered_area": ["Kishoreganj Sadar", "Bhairab", "Hossainpur"] },
//   { "district": "Madaripur", "latitude": 23.1648, "longitude": 90.2039, "covered_area": ["Madaripur Sadar", "Shibchar", "Kalkini"] },
//   { "district": "Manikganj", "latitude": 23.8618, "longitude": 90.0053, "covered_area": ["Manikganj Sadar", "Singair", "Shibalaya"] },
//   { "district": "Munshiganj", "latitude": 23.5500, "longitude": 90.5000, "covered_area": ["Sreenagar", "Lohajang", "Sirajdikhan"] },
//   { "district": "Narsingdi", "latitude": 23.9240, "longitude": 90.7167, "covered_area": ["Narsingdi Sadar", "Palash", "Belabo"] },
//   { "district": "Narail", "latitude": 23.1712, "longitude": 89.5093, "covered_area": ["Narail Sadar", "Lohagara", "Kalia"] },
//   { "district": "Narayanganj", "latitude": 23.6239, "longitude": 90.5000, "covered_area": ["Bandar", "Sonargaon", "Rupganj"] },
//   { "district": "Tangail", "latitude": 24.2500, "longitude": 89.9167, "covered_area": ["Tangail Sadar", "Mirzapur", "Kalihati"] },

//   { "district": "Bagerhat", "latitude": 22.6600, "longitude": 89.7900, "covered_area": ["Bagerhat Sadar", "Mongla", "Fakirhat"] },
//   { "district": "Chuadanga", "latitude": 23.6400, "longitude": 88.8500, "covered_area": ["Chuadanga Sadar", "Alamdanga", "Damurhuda"] },
//   { "district": "Jessore", "latitude": 23.1700, "longitude": 89.2000, "covered_area": ["Jessore Sadar", "Abhaynagar", "Bagherpara"] },
//   { "district": "Jhenaidah", "latitude": 23.5400, "longitude": 89.1500, "covered_area": ["Jhenaidah Sadar", "Kaliganj", "Kotchandpur"] },
//   { "district": "Khulna", "latitude": 22.8456, "longitude": 89.5403, "covered_area": ["Daulatpur", "Sonadanga", "Khalishpur"] },
//   { "district": "Kushtia", "latitude": 23.9000, "longitude": 89.1200, "covered_area": ["Kushtia Sadar", "Bheramara", "Kumarkhali"] },
//   { "district": "Magura", "latitude": 23.4850, "longitude": 89.4190, "covered_area": ["Magura Sadar", "Mohammadpur", "Sreepur"] },
//   { "district": "Meherpur", "latitude": 23.7500, "longitude": 88.6400, "covered_area": ["Meherpur Sadar", "Gangni", "Mujibnagar"] },
//   { "district": "Narail", "latitude": 23.1712, "longitude": 89.5093, "covered_area": ["Narail Sadar", "Lohagara", "Kalia"] },
//   { "district": "Satkhira", "latitude": 22.7140, "longitude": 89.0670, "covered_area": ["Satkhira Sadar", "Kalaroa", "Debhata"] },

//   { "district": "Barguna", "latitude": 22.1833, "longitude": 90.1833, "covered_area": ["Barguna Sadar", "Amtali", "Taltali"] },
//   { "district": "Barishal", "latitude": 22.7010, "longitude": 90.3535, "covered_area": ["Kazirhat", "Bakerganj", "Agailjhara"] },
//   { "district": "Bhola", "latitude": 22.6850, "longitude": 90.6500, "covered_area": ["Bhola Sadar", "Borhanuddin", "Char Fasson"] },
//   { "district": "Jhalokati", "latitude": 22.6725, "longitude": 90.2030, "covered_area": ["Jhalokati Sadar", "Nalchity", "Kathalia"] },
//   { "district": "Patuakhali", "latitude": 22.3590, "longitude": 90.3290, "covered_area": ["Patuakhali Sadar", "Bauphal", "Kalapara"] },
//   { "district": "Pirojpur", "latitude": 22.5786, "longitude": 90.3245, "covered_area": ["Pirojpur Sadar", "Nazirpur", "Mathbaria"] },

//   { "district": "Bogura", "latitude": 24.8500, "longitude": 89.3700, "covered_area": ["Bogura Sadar", "Sherpur", "Nandigram"] },
//   { "district": "Joypurhat", "latitude": 25.0933, "longitude": 89.0310, "covered_area": ["Joypurhat Sadar", "Panchbibi", "Khetlal"] },
//   { "district": "Naogaon", "latitude": 24.8500, "longitude": 88.9500, "covered_area": ["Naogaon Sadar", "Raninagar", "Manda"] },
//   { "district": "Natore", "latitude": 24.4100, "longitude": 89.0000, "covered_area": ["Natore Sadar", "Baraigram", "Singra"] },
//   { "district": "Nawabganj", "latitude": 24.6400, "longitude": 88.5300, "covered_area": ["Nawabganj Sadar", "Shibganj", "Patnitala"] },
//   { "district": "Pabna", "latitude": 24.0000, "longitude": 89.2500, "covered_area": ["Pabna Sadar", "Bera", "Santhia"] },
//   { "district": "Rajshahi", "latitude": 24.3745, "longitude": 88.6042, "covered_area": ["Boalia", "Shah Makhdum", "Motihar"] },
//   { "district": "Sirajganj", "latitude": 24.4500, "longitude": 89.7000, "covered_area": ["Sirajganj Sadar", "Raiganj", "Shahjadpur"] },

//   { "district": "Habiganj", "latitude": 24.3786, "longitude": 91.4146, "covered_area": ["Habiganj Sadar", "Nabiganj", "Chunarughat"] },
//   { "district": "Moulvibazar", "latitude": 24.4881, "longitude": 91.7770, "covered_area": ["Moulvibazar Sadar", "Kulaura", "Sreemangal"] },
//   { "district": "Sunamganj", "latitude": 24.9000, "longitude": 91.3833, "covered_area": ["Sunamganj Sadar", "Jagannathpur", "Shalla"] },
//   { "district": "Sylhet", "latitude": 24.8949, "longitude": 91.8687, "covered_area": ["Khadimnagar", "Zindabazar", "Bimanbandar"] },

//   { "district": "Brahmanbaria", "latitude": 23.9570, "longitude": 91.1230, "covered_area": ["Brahmanbaria Sadar", "Nabinagar", "Kasba"] },
//   { "district": "Chandpur", "latitude": 23.2192, "longitude": 90.6608, "covered_area": ["Chandpur Sadar", "Haimchar", "Kachua"] },
//   { "district": "Comilla", "latitude": 23.4616, "longitude": 91.1809, "covered_area": ["Muradnagar", "Debidwar", "Chandina"] },
//   { "district": "Feni", "latitude": 23.0146, "longitude": 91.3969, "covered_area": ["Feni Sadar", "Chhagalnaiya", "Parshuram"] },
//   { "district": "Lakshmipur", "latitude": 22.9500, "longitude": 90.8333, "covered_area": ["Lakshmipur Sadar", "Ramganj", "Raipur"] },
//   { "district": "Noakhali", "latitude": 22.8167, "longitude": 91.1000, "covered_area": ["Noakhali Sadar", "Begumganj", "Senbagh"] },

//   { "district": "Bandarban", "latitude": 22.2000, "longitude": 92.2180, "covered_area": ["Bandarban Sadar", "Thanchi", "Ruma"] },
//   { "district": "Brahmanbaria", "latitude": 23.9570, "longitude": 91.1230, "covered_area": ["Brahmanbaria Sadar", "Nabinagar", "Kasba"] },
//   { "district": "Chattogram", "latitude": 22.3569, "longitude": 91.7832, "covered_area": ["Pahartali", "Agrabad", "Nasirabad", "Foy’s Lake"] },
//   { "district": "Cox's Bazar", "latitude": 21.4272, "longitude": 92.0058, "covered_area": ["Cox's Bazar Sadar", "Ukhia", "Teknaf"] },
//   { "district": "Khagrachari", "latitude": 23.1190, "longitude": 91.9843, "covered_area": ["Khagrachari Sadar", "Dighinala", "Lakshmichhari"] },
//   { "district": "Rangamati", "latitude": 22.6073, "longitude": 92.2186, "covered_area": ["Rangamati Sadar", "Kaptai", "Belaichhari"] },

//   { "district": "Dinajpur", "latitude": 25.6231, "longitude": 88.6350, "covered_area": ["Dinajpur Sadar", "Parbatipur", "Birganj"] },
//   { "district": "Gaibandha", "latitude": 25.2728, "longitude": 89.5483, "covered_area": ["Gaibandha Sadar", "Sadullapur", "Sundarganj"] },
//   { "district": "Kurigram", "latitude": 25.8017, "longitude": 89.6447, "covered_area": ["Kurigram Sadar", "Phulbari", "Ulipur"] },
//   { "district": "Lalmonirhat", "latitude": 25.9500, "longitude": 89.1833, "covered_area": ["Lalmonirhat Sadar", "Aditmari", "Hatibandha"] },
//   { "district": "Nilphamari", "latitude": 25.9333, "longitude": 88.8333, "covered_area": ["Nilphamari Sadar", "Jaldhaka", "Kishoreganj"] },
//   { "district": "Panchagarh", "latitude": 26.3333, "longitude": 88.5667, "covered_area": ["Panchagarh Sadar", "Debiganj", "Atwari"] },
//   { "district": "Rangpur", "latitude": 25.7439, "longitude": 89.2752, "covered_area": ["Gangachara", "Mithapukur", "Badarganj"] },
//   { "district": "Thakurgaon", "latitude": 26.0333, "longitude": 88.4667, "covered_area": ["Thakurgaon Sadar", "Pirganj", "Ranisankail"] },

//   { "district": "Mymensingh", "latitude": 24.7471, "longitude": 90.4203, "covered_area": ["Trishal", "Bhaluka", "Muktagacha"] }


// ];

// const Coverage = () => {
//   const defaultPosition = [23.685, 90.3563];
//   const [flyToCoords, setFlyToCoords] = useState(null);
//   const [error, setError] = useState("");
//   const mapRef = useRef(null);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setError("");

//     const input = e.target.location.value.trim();
//     if (!input) return;

//     const normalizedInput = normalize(input);

//     const district = serviceCenters.find(
//       (c) => normalize(c.district) === normalizedInput
//     );

//     if (district) {
//       setFlyToCoords([district.latitude, district.longitude]);
//     } else {
//       setError("❌ District not found. Please check spelling.");
//     }
//   };

//   // Debug: check all districts
//   useEffect(() => {
//     console.log("Available districts:", serviceCenters.map((c) => c.district));
//   }, []);

//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16">
//       <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-4">
//         Nationwide Coverage
//       </h2>

//       <p className="text-center max-w-3xl mx-auto text-gray-700 mb-10 text-lg">
//         BookCourier delivers books from libraries to homes across all 64 districts
//         of Bangladesh. Search your district and explore our service reach.
//       </p>

//       <form
//         onSubmit={handleSearch}
//         className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
//       >
//         <input
//           type="search"
//           name="location"
//           placeholder="Search district (e.g. Dhaka, Sylhet)"
//           className="flex-1 px-4 py-3 rounded-xl border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
//           Search
//         </button>
//       </form>

//       {error && <p className="text-center text-red-600 font-medium mb-4">{error}</p>}

//       <div className="max-w-7xl mx-auto h-[650px] rounded-2xl overflow-hidden shadow-xl border">
//         <MapContainer
//           center={defaultPosition}
//           zoom={7}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//           ref={mapRef}
//         >
//           <TileLayer
//             attribution="© OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {serviceCenters.map((center, index) => (
//             <Marker key={index} position={[center.latitude, center.longitude]}>
//               <Popup>
//                 <h3 className="font-bold text-blue-900">{center.district}</h3>
//                 <p className="text-sm mt-1">
//                   Areas: {center.covered_area.join(", ")}
//                 </p>
//               </Popup>
//             </Marker>
//           ))}

//           {flyToCoords && <FlyToMarker coords={flyToCoords} />}
//         </MapContainer>
//       </div>
//     </section>
//   );
// };

// export default Coverage;
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

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 dark:text-indigo-200 mb-4">
        Nationwide Coverage
      </h2>

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
          className="mt-auto inline-block w-full sm:w-auto bg-gradient-to-r from-teal-400 to-indigo-500 dark:from-teal-500 dark:to-indigo-600 hover:from-indigo-500 hover:to-teal-400 dark:hover:from-indigo-600 dark:hover:to-teal-500 text-white py-2 rounded-xl font-semibold transition-all duration-300"
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

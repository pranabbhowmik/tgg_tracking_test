// import React, { useState } from "react";
// import axios from "axios";
// import {
//     MapContainer,
//     TileLayer,
//     Polyline,
//     Marker,
//     Popup,
//     useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const ShortestPathFinder = () => {
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [route, setRoute] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India center

//     // Custom icons
//     const startIcon = new L.Icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//         iconSize: [30, 30],
//     });

//     const endIcon = new L.Icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
//         iconSize: [30, 30],
//     });

//     // Helper component to change map center dynamically
//     const ChangeMapCenter = ({ center }) => {
//         const map = useMap();
//         map.setView(center, 10);
//         return null;
//     };

//     const handleFindPath = async () => {
//         if (!start || !end) {
//             alert("Please enter both start and destination locations");
//             return;
//         }

//         setLoading(true);

//         try {
//             // Get coordinates for start and end using OpenStreetMap Nominatim API
//             const startRes = await axios.get(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//                     start
//                 )}&limit=1`
//             );
//             const endRes = await axios.get(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//                     end
//                 )}&limit=1`
//             );

//             if (!startRes.data.length || !endRes.data.length) {
//                 alert(
//                     "Couldn't find one or both locations. Try different names."
//                 );
//                 setLoading(false);
//                 return;
//             }

//             const startCoords = [
//                 parseFloat(startRes.data[0].lat),
//                 parseFloat(startRes.data[0].lon),
//             ];
//             const endCoords = [
//                 parseFloat(endRes.data[0].lat),
//                 parseFloat(endRes.data[0].lon),
//             ];

//             // Fetch route from OSRM API
//             const routeRes = await axios.get(
//                 `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
//             );

//             const coordinates =
//                 routeRes.data.routes[0].geometry.coordinates.map(
//                     (coord) => [coord[1], coord[0]] // reverse [lon, lat] → [lat, lon]
//                 );

//             setRoute(coordinates);
//             setMapCenter(startCoords);
//         } catch (error) {
//             console.error("Error fetching route:", error);
//             alert("Failed to find route. Try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
//             <div className="bg-gray-900 shadow-2xl p-6 rounded-2xl w-full max-w-xl">
//                 <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                     🚗 Shortest Path Finder
//                 </h2>

//                 <div className="space-y-6">
//                     {/* Start Input */}
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Enter starting point..."
//                             value={start}
//                             onChange={(e) => setStart(e.target.value)}
//                             className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
//                         />
//                     </div>

//                     {/* Destination Input */}
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Enter destination..."
//                             value={end}
//                             onChange={(e) => setEnd(e.target.value)}
//                             className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
//                         />
//                     </div>

//                     <button
//                         onClick={handleFindPath}
//                         disabled={loading}
//                         className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
//                             loading
//                                 ? "bg-gray-600 cursor-not-allowed"
//                                 : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
//                         }`}
//                     >
//                         {loading ? "Finding Route..." : "Find Shortest Path"}
//                     </button>
//                 </div>
//             </div>

//             {/* Map Section */}
//             <div className="mt-8 w-full h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
//                 <MapContainer
//                     center={mapCenter}
//                     zoom={5}
//                     style={{ height: "100%", width: "100%" }}
//                 >
//                     <TileLayer
//                         attribution="&copy; OpenStreetMap contributors"
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <ChangeMapCenter center={mapCenter} />
//                     {route.length > 0 && (
//                         <>
//                             <Polyline
//                                 positions={route}
//                                 color="lime"
//                                 weight={5}
//                             />
//                             <Marker position={route[0]} icon={startIcon}>
//                                 <Popup>Start Point</Popup>
//                             </Marker>
//                             <Marker
//                                 position={route[route.length - 1]}
//                                 icon={endIcon}
//                             >
//                                 <Popup>Destination</Popup>
//                             </Marker>
//                         </>
//                     )}
//                 </MapContainer>
//             </div>
//         </div>
//     );
// };

// export default ShortestPathFinder;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ShortestPathFinder = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [route, setRoute] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [error, setError] = useState("");
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    // Refs for debouncing
    const debounceTimer = useRef(null);

    // --- Icons ---
    const startIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [32, 32],
    });

    const endIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
        iconSize: [32, 32],
    });

    // --- Map Recenter Component ---
    const ChangeMapCenter = ({ center }) => {
        const map = useMap();
        map.setView(center, 10);
        return null;
    };

    // --- Debounced Suggestion Fetch ---
    const fetchSuggestions = (query, type) => {
        clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(async () => {
            if (!query.trim()) {
                type === "start"
                    ? setStartSuggestions([])
                    : setEndSuggestions([]);
                return;
            }

            try {
                // FastAPI backend
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/search?q=${encodeURIComponent(
                        query
                    )}`
                );

                if (type === "start") setStartSuggestions(res.data || []);
                else setEndSuggestions(res.data || []);
            } catch (err) {
                console.error("Suggestion error:", err);
            }
        }, 600);
    };

    // --- Select suggestion ---
    const handleSelectSuggestion = (suggestion, type) => {
        const name = suggestion.display_name;
        if (type === "start") {
            setStart(name);
            setStartSuggestions([]);
        } else {
            setEnd(name);
            setEndSuggestions([]);
        }
    };

    // --- Find Path & Get Distance/Duration ---
    const handleFindPath = async () => {
        if (!start || !end) {
            setError("Please enter both start and destination locations.");
            return;
        }

        setLoading(true);
        setError("");
        setDistance(null);
        setDuration(null);

        try {
            // Get coordinates from Nominatim
            const [startRes, endRes] = await Promise.all([
                axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        start
                    )}&limit=1`
                ),
                axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        end
                    )}&limit=1`
                ),
            ]);

            if (!startRes.data.length || !endRes.data.length) {
                setError("Couldn't find one or both locations.");
                setLoading(false);
                return;
            }

            const startCoords = [
                parseFloat(startRes.data[0].lat),
                parseFloat(startRes.data[0].lon),
            ];
            const endCoords = [
                parseFloat(endRes.data[0].lat),
                parseFloat(endRes.data[0].lon),
            ];

            // Get route from OSRM
            const routeRes = await axios.get(
                `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
            );

            const data = routeRes.data.routes[0];
            const coordinates = data.geometry.coordinates.map((c) => [
                c[1],
                c[0],
            ]);

            setRoute(coordinates);
            setMapCenter(startCoords);

            // Distance (in km), Duration (in minutes)
            setDistance((data.distance / 1000).toFixed(2));
            setDuration((data.duration / 60).toFixed(1));
        } catch (err) {
            console.error("Route error:", err);
            setError("Failed to fetch route. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
            {/* Card Section */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-2xl p-8 rounded-2xl w-full max-w-xl">
                <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    🚗 Shortest Path Finder
                </h2>

                <div className="space-y-6 relative">
                    {/* Start Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter starting point..."
                            value={start}
                            onChange={(e) => {
                                setStart(e.target.value);
                                fetchSuggestions(e.target.value, "start");
                            }}
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {startSuggestions.length > 0 && (
                            <ul className="absolute z-20 bg-gray-800 border border-gray-700 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                                {startSuggestions.map((s, i) => (
                                    <li
                                        key={i}
                                        onClick={() =>
                                            handleSelectSuggestion(s, "start")
                                        }
                                        className="px-3 py-2 hover:bg-blue-600 cursor-pointer transition-colors"
                                    >
                                        {s.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Destination Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter destination..."
                            value={end}
                            onChange={(e) => {
                                setEnd(e.target.value);
                                fetchSuggestions(e.target.value, "end");
                            }}
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                        {endSuggestions.length > 0 && (
                            <ul className="absolute z-20 bg-gray-800 border border-gray-700 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                                {endSuggestions.map((s, i) => (
                                    <li
                                        key={i}
                                        onClick={() =>
                                            handleSelectSuggestion(s, "end")
                                        }
                                        className="px-3 py-2 hover:bg-cyan-600 cursor-pointer transition-colors"
                                    >
                                        {s.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Find Button */}
                    <button
                        onClick={handleFindPath}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                            loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
                        }`}
                    >
                        {loading ? "Finding Route..." : "Find Shortest Path"}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 text-center mt-2">{error}</p>
                    )}

                    {/* Route Summary */}
                    {distance && duration && (
                        <div className="mt-4 text-center bg-gray-800/70 p-4 rounded-xl border border-gray-700">
                            <p className="text-lg font-semibold text-cyan-300">
                                🚦 Route Summary
                            </p>
                            <p className="text-gray-300 mt-1">
                                Distance:{" "}
                                <span className="text-white font-bold">
                                    {distance} km
                                </span>
                            </p>
                            <p className="text-gray-300">
                                Estimated Time:{" "}
                                <span className="text-white font-bold">
                                    {duration} mins
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Map */}
            <div className="mt-8 w-full h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                <MapContainer
                    center={mapCenter}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeMapCenter center={mapCenter} />
                    {route.length > 0 && (
                        <>
                            <Polyline
                                positions={route}
                                color="lime"
                                weight={5}
                                opacity={0.8}
                            />
                            <Marker position={route[0]} icon={startIcon}>
                                <Popup>Start Point</Popup>
                            </Marker>
                            <Marker
                                position={route[route.length - 1]}
                                icon={endIcon}
                            >
                                <Popup>Destination</Popup>
                            </Marker>
                        </>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default ShortestPathFinder;

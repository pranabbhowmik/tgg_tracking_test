"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter = [22.5726, 88.3639]; // Kolkata
const apiKey =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjIxYmQ2MTUxNmUwZTRhNThhMjg3NjI3YjcwODk3Y2JmIiwiaCI6Im11cm11cjY0In0=";

const PathRouting = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // Fetch place suggestions
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query.trim()) return setSuggestions([]);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  // Fetch route + distance + time
  const getRoute = async (startPoint, endPoint) => {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startPoint[1]},${startPoint[0]}&end=${endPoint[1]},${endPoint[0]}`;
    const res = await fetch(url);
    const data = await res.json();

    const coords = data.features[0].geometry.coordinates.map((coord) => [
      coord[1],
      coord[0],
    ]);
    setRouteCoords(coords);

    // Extract distance (meters) and duration (seconds)
    const summary = data.features[0].properties.summary;
    setDistance((summary.distance / 1000).toFixed(2)); // in km
    setDuration((summary.duration / 60).toFixed(1)); // in minutes
  };

  const handleSearch = async () => {
    if (!startCoords || !endCoords) {
      alert("Please select both start and destination from suggestions.");
      return;
    }
    getRoute(startCoords, endCoords);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center relative">
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg mt-4 z-[1000] absolute top-4">
        {/* Start Location */}
        <div className="relative">
          <input
            type="text"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              fetchSuggestions(e.target.value, setStartSuggestions);
            }}
            placeholder="Enter start location"
            className="border p-2 rounded w-64"
          />
          {startSuggestions.length > 0 && (
            <ul className="absolute bg-white text-black border w-64 rounded shadow-md mt-1 z-[2000] max-h-48 overflow-y-auto">
              {startSuggestions.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setStart(sug.display_name);
                    setStartCoords([parseFloat(sug.lat), parseFloat(sug.lon)]);
                    setStartSuggestions([]);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {sug.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination Location */}
        <div className="relative">
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              fetchSuggestions(e.target.value, setDestSuggestions);
            }}
            placeholder="Enter destination"
            className="border p-2 rounded w-64"
          />
          {destSuggestions.length > 0 && (
            <ul className="absolute bg-white text-black border w-64 rounded shadow-md mt-1 z-[2000] max-h-48 overflow-y-auto">
              {destSuggestions.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setDestination(sug.display_name);
                    setEndCoords([parseFloat(sug.lat), parseFloat(sug.lon)]);
                    setDestSuggestions([]);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {sug.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Show Route
        </button>
      </div>

      {/* Distance + Duration Info */}
      {distance && duration && (
        <div className="absolute top-28 bg-white text-black shadow-md px-4 py-2 rounded-lg z-[1000] text-sm font-medium">
          <p>Distance: {distance} km</p>
          <p>Estimated Time: {duration} min</p>
        </div>
      )}

      {/* Map Section */}
      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {startCoords && (
          <Marker
            position={startCoords}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}

        {endCoords && (
          <Marker
            position={endCoords}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
        )}

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={4} />
        )}
      </MapContainer>
    </div>
  );
};

export default PathRouting;

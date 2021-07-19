import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  // InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Loading from "./Loading";
// https://react-google-maps-api-docs.netlify.app/#

export default function MapExample() {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBovLMDLdlFjnutFmK7SgE9j87MzDmr3rE",
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/volunteer_map_data")
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
        setLoading(false);
      });
  }, []);

  if (loadError) {
    return <h3>There was an error loading the map</h3>;
  }

  if (loading || !isLoaded) {
    return <Loading />;
  }

  return (
    <GoogleMap
      center={{ lat: 37.2356033, lng: -121.8759623 }}
      mapContainerStyle={{ width: "400px", height: "400px" }}
      zoom={5}
    >
      {mapData.map((dataPoint) => (
        <Marker
          key={dataPoint.request_id}
          position={{ lat: dataPoint.lat, lng: dataPoint.lng }}
        />
      ))}
    </GoogleMap>
  );
}

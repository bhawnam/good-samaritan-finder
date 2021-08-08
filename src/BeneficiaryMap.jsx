import React, { useState, useEffect } from "react";
import "./Forms.css";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Loading from "./Loading";
import { PlacesAutocomplete } from "./Autocomplete";
// https://react-google-maps-api-docs.netlify.app/#

export default function MapExample() {
  const [zipcode, setZipcode] = useState("");
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBovLMDLdlFjnutFmK7SgE9j87MzDmr3rE",
  });

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  let value = Math.floor(Math.random() * 100).toString();

  useEffect(() => {
    setLoading(true);
    fetch("/api/show_map_offerings_data")
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

  function submitAddress(event) {
    event.preventDefault();
    fetch("api/accept-user-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    }).then((response) => {
      response.json().then((result) => {
        if (result.success === false) {
          setAddress("");
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 2000
          });
        } else {
          setAddress("");
          setLat(result.lat);
          setLng(result.lng);
          setHasAddress(true);
          swal.fire({
            position: 'top',
            text: 'Here are the volunteers offering services near you!',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    });
  }

  return (
    <>
      {hasAddress ? (
        <GoogleMap
          center={{ lat, lng }}
          mapContainerStyle={{ width: "400px", height: "400px" }}
          zoom={10}
        >
          {mapData.map((dataPoint) => (
            <Marker
              key={dataPoint.request_id}
              position={{ lat: dataPoint.lat, lng: dataPoint.lng }}
              onClick={() => {
                setSelectedMarker(dataPoint);
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
              position={{
                lat: selectedMarker.lat,
                lng: selectedMarker.lng,
              }}
            >
              <div>
                <h4> Volunteer </h4>
                <h6> Fulfilled Requests: {value}</h6>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <GoogleMap
          center={{ lat: 37.8272, lng: -122.2913 }}
          mapContainerStyle={{ width: "400px", height: "400px" }}
          zoom={8}
        >
          {mapData.map((dataPoint) => (
            <Marker
              key={dataPoint.request_id}
              position={{ lat: dataPoint.lat, lng: dataPoint.lng }}
              onClick={() => {
                setSelectedMarker(dataPoint);
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
              position={{
                lat: selectedMarker.lat,
                lng: selectedMarker.lng,
              }}
            >
              <div>
                <h4> Volunteer </h4>
                <h6> Fulfilled Requests: {value}</h6>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      <br/>
      <form onSubmit={submitAddress}>
        <div className="form-login row mb-4">
        <label htmlFor="mapInputAddress1" className="form-label" >Where do you reside? </label> <br />
        <div className="col">
          <PlacesAutocomplete setAddress={setAddress} setZipcode={setZipcode} />
        </div>
        <div className="col">    
        <button type="submit" className="btn btn-primary">
          Choose
        </button>
        </div>
        </div>
      </form>
    </>
  );
}

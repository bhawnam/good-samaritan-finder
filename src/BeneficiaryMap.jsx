import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
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

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  function submitAddress(event){
    event.preventDefault();
    fetch("api/accept-user-address", 
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({address}),
      }).then((response) => {
      response.json().then((result) => {
        if ((result.success) == false){
          setAddress("");
          alert("Oops! Something went wrong!")
        } else {
          setAddress("");
          setLat(result.lat);
          setLng(result.lng);
          setHasAddress(true);
          alert("Here are the volunteers offering services near you.")
        }
      });
    });
  }

  return (
    <React.Fragment>
    {hasAddress ? (  
    <GoogleMap
      center={{ lat: lat, lng: lng }}
      mapContainerStyle={{ width: "400px", height: "400px" }}
      zoom={10}
    >
      {mapData.map((dataPoint) => (
        <Marker
          key={dataPoint.request_id}
          position={{ lat: dataPoint.lat, lng: dataPoint.lng }}
          onClick={() => { setSelectedMarker(dataPoint);
          }}
        />
      ))}
      {selectedMarker &&  (
        <InfoWindow 
        onCloseClick={() => {
          setSelectedMarker(null);
        }}
        position={{
          lat: selectedMarker.lat,
          lng: selectedMarker.lng
        }}
        > 
        <div>
          <h4> Volunteer </h4>  
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
          onClick={() => { setSelectedMarker(dataPoint);
          }}
        />
      ))}
      {selectedMarker &&  (
        <InfoWindow 
        onCloseClick={() => {
          setSelectedMarker(null);
        }}
        position={{
          lat: selectedMarker.lat,
          lng: selectedMarker.lng
        }}
        > 
        <div>
          <h4> Volunteer </h4>  
        </div>  
      </InfoWindow>
  )}
    </GoogleMap>
          )}
    <form onSubmit={submitAddress}>
    <h3>Where do you reside? </h3>
    <div className="form-login">
     <label> Address </label> <br/>
     <input type="text" className="form-input" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter your address" required/>
    </div>
    <button type="submit" className="btn"> Submit </button> 
    </form>
    </React.Fragment>
  );
}

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

  let value = Math.floor(Math.random() * 50).toString();

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
    <br />
    <h4> Why be a Beneficiary on our platform ? </h4>
    <p>
    Our generation has lived to see the unthinkable - a global pandemic and challenges emerging from changing 
    climatic conditions. While some of us have been fortunate to endure through the rough times, there have 
    been challenging and pressing times where some of us were desperately seeking help.
    </p>
    <p>
    Our platform <b> Good Samaritan Finder </b> is aimed at helping people in need by matching the beneficiaries
    with Good Samaritans offering their help. The beneficiary can put in a request of what their requirements are. 
    For instance, if a user is a high-risk personnel and needs to buy their medication but are unable to do so, 
    they can log onto our platform, state their requirements with some necessary details. Our platform will match 
    them to the Volunteer who has a bandwidth to buy those medicines and drop them off at the desired location. 
    We always make sure to match your requests with volunteers in the vicinity to provide you with help as fast as 
    possible.  
    </p>

  <p> <center> <b>  Would you like to get onboarded? </b>
    <a class="btn btn-primary mx-2" href="/join-us" role="button"> Join Us</a>
  </center> </p>  
  <hr/> <br/>
  <h4> Would you like to checkout volunteers near you? </h4>
  <br />
  <div className="beneficiary-map row">
    <div className="col">
      {hasAddress ? (
        <GoogleMap
          center={{ lat, lng }}
          mapContainerStyle={{ width: "500px", height: "500px" }}
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
          mapContainerStyle={{ width: "500px", height: "500px" }}
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
      </div>
      <div className="col">
        <br/>
        <br/>
      <p>
        You can enter your street address and checkout the volunteers offering 
        different services around you.
        You can also see how many requests they have fulfilled in the past on 
        our platform.
      </p>
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
      </div>
      </div>
      <hr/> <br/>
      <h4>
        Services our Good Samaritans Offer
      </h4>
      <p>
        Our is it to continue to grow and provide as many services we can.
        Currently our Volunteers provide their services to drop off the following 
        commodities to those in need:      
      </p>
      <ul>
        <li> Packaged Drinking Water</li>
        <li> First-Aid Kit</li>
        <li> Pre-prepared Meal Kits</li>
        <li> Blankets </li>
        <li> Pet Food</li>
      </ul>
      <p>     
      The platform keeps tabs of all these requirements that volunteers are willing 
      to contribute. 
      We also ensure the requests are handled in order such that the oldest request is fulfilled
      before the newly added ones.
      </p>
    </>
  );
}

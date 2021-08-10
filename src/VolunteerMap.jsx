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
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/show_map_requests_data")
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
    <>
    <br/>
    <h4> Why be a Volunteer on our platform ? </h4>
    <p>
    Our generation has lived to see the unthinkable - a global pandemic and challenges emerging from changing 
    climatic conditions. While some of us have been fortunate to endure through the rough times, there have 
    been challenging and pressing times where some of us were desperately seeking help.
    </p>
    <p>
    Our platform <b> Good Samaritan Finder </b> is aimed at helping people in need. We are here to provide you 
    means to organize the work that you can sign up for without getting overwhelmed with the requests and can continue what
    you do best - helping people.
    </p>
    <p>
    In the social media age, it is easy for a person to volunteer. But, the fact is one can only volunteer part-time 
    or have the capacity to only help x number of people. In such cases, if one would offer their services on social 
    media platforms, their inbox would be flooded with help requests that they may not have the bandwidth and/or the 
    resources to handle.
    </p>
    <p> <center> <b>Would you like to get onboarded? </b>
      <a class="btn btn-primary mx-2" href="/join-us" role="button"> Join Us</a>
    </center>
    </p>  
    <br/> <hr/>
    <h4> Check out beneficiary requests in your area!</h4>
    <br/>
    <div className="volunteer-map">
      <GoogleMap
        center={{ lat: 37.8272, lng: -122.2913 }}
        mapContainerStyle={{ width: "500px", height: "500px" }}
        zoom={7}
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
              <h6> Request </h6>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      </div>
    <hr/>        
    <br />        
    <h4> How you can help? </h4>
    <p>
    The goal of the platform is to only match volunteers with beneficiaries seeking help in a given area. The area in 
    miles is specified by the volunteer limiting the vicinity they can help out in. 
    </p>
    <p>
    We match the service offered by the Volunteer and the quantity of that service they can help out with, with that of a request 
    made by the beneficiary and notify both the users.
    </p>
    <p>
    More importantly offer the ability to match 
    multiple volunteers to one beneficiary - an example is a case where there are three volunteers willing to offer water, 
    food and drive time respectively to help a person who needs food and water in the area. 
    The platform intelligently coordinates with the volunteers willing to drive to go pick up the food 
    and water and deliver it to the beneficiary. More importantly, the platform also keeps track of 
    resources and reduces the supplies from the volunteers. 
    </p>

    <hr/> <br/>
      <h4>
        Services our Beneficiaries can seek
      </h4>
      <p>
        Our goal is it to continue to grow and provide as many services we can.
        Currently our Beneficiaries can seek the services for the following 
        commodities:      
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

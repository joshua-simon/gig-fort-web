import { useState } from "react";
import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
import { mapStyle } from "../util/mapStyle";
import logo from "../assets/logo.png";
import { getGigsToday } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsI5Nfl4xBcf9qsmtQAFzUkqMMmBC9WCw",
  });

  const gigs = useGigs()
  const currentDateMs = Date.now()
  const gigsToday = getGigsToday(gigs,currentDateMs)

  console.log(gigsToday)

  const center = {
    lat: -41.294,
    lng: 174.777,
  };

  const containerStyle = {
    width: "373px",
    height: "410px",
    borderRadius: "26px",
  };

  const map = isLoaded ? (
    <div className="map-container">
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={containerStyle}
        options={{ styles: mapStyle }}
      >
        {gigsToday.map((gig,i) => {
            const lat = gig.location.latitude
            const lng = gig.location.longitude
            const location = {lat:lat,lng:lng}
            return (
                <Marker
                position = {location}
            ></Marker>
            )
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );

  return (
    <div className="map">
      <div className="logo">
        <img src={logo} />
      </div>
      {map}
    </div>
  );
};

export default Map;

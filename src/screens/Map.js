import { useState } from "react";
import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
import { mapStyle } from "../util/mapStyle";
import logo from "../assets/logo.png";
import { getGigsToday } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";
import mapPin from "../assets/map-pin-new.png"
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsI5Nfl4xBcf9qsmtQAFzUkqMMmBC9WCw",
  });

  const gigs = useGigs()
  const currentDateMs = Date.now()
  const gigsToday = getGigsToday(gigs,currentDateMs)

  const center = {
    lat: -41.294,
    lng: 174.777,
  };

  const formattedDay = format(new Date(currentDateMs), "EEEE");
  const formattedWeek = format(new Date(currentDateMs), "LLLL do Y");

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
                icon = {{
                    url: mapPin,
                }}
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

      <div className="gigsToday_map">
        <p className="gigsToday_date_day">{formattedDay}</p>
        <p className="gigsToday_date_week">{formattedWeek}</p>
      </div>

      <div className="map_text">
        <p>Tap on the <img className="map_text_pin" src = {mapPin}/> icons on the map to see more gig info</p>
      </div>
      
      {map}


      <div className="arrows">
        <div className="arrow_left">
          <AiFillCaretLeft size={48} />
          <p>Previous Day</p>
        </div>
        <div className="arrow_right">
          <AiFillCaretRight size={48}/>
          <p>Next Day</p>
        </div>
      </div>

      <div className="buttons">
        <Link to='/list'>
          <button>List</button>
        </Link>
        <button>Free Events</button>
      </div>

    </div>
  );
};

export default Map;

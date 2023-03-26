import { useState,useMemo } from "react";
import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
import { mapStyle } from "../util/mapStyle";
import logo from "../assets/test2.png";
import { getGigsToday } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";
import mapPin from "../assets/map-pin-new.png"
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

const Map = () => {
  const [ selectedDateMs,setSelectedDateMs ] = useState(Date.now())
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsI5Nfl4xBcf9qsmtQAFzUkqMMmBC9WCw",
  });

  const gigs = useGigs()
  const currentDateMs = Date.now()


  const center = {
    lat: -41.294,
    lng: 174.777,
  };

  const selectedDateString = useMemo(() => {
    const formattedDate = format(new Date(selectedDateMs),'EEE LLL do Y')
    return formattedDate
  }, [selectedDateMs]);

  const currentDay = useMemo(() => {
    const formattedDay = format(new Date(selectedDateMs),'EEEE')
    return formattedDay
  },[selectedDateMs])

  const currentWeek = useMemo(() => {
    const formattedDay = format(new Date(selectedDateMs),'LLLL do Y')
    return formattedDay
  },[selectedDateMs])

    //Filtering through gigs to return only current day's gigs
    const gigsToday = gigs.filter((gig) => {
      const formattedGigDate = format(new Date(gig.dateAndTime.seconds * 1000), 'EEE LLL do Y')
      return formattedGigDate === selectedDateString;
    });

    const addDays = (amount) => {
      setSelectedDateMs((curr) => curr + 1000 * 60 * 60 * 24 * amount);
    };



  const containerStyle = {
    width: "90%",
    height: "450px",
    borderRadius: "26px",
    margin: "0 auto"
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
        <p className="gigsToday_date_day">{currentDay}</p>
        <p className="gigsToday_date_week">{currentWeek}</p>
      </div>

      <div className="map_text">
        <p>Tap on the <img className="map_text_pin" src = {mapPin}/> icons on the map to see more gig info</p>
      </div>
      
      {map}


      <div className="arrows">
        <div className="arrow_left">
          <AiFillCaretLeft size={48} onClick ={() => addDays(-1)} />
          <p>Previous Day</p>
        </div>
        <div className="arrow_right">
          <AiFillCaretRight size={48} onClick ={() => addDays(1)}/>
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

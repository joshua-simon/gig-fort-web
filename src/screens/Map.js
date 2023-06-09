import { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { mapStyle } from "../util/mapStyle";
import logo from "../assets/test2.png";
import { useGigs } from "../hooks/useGigs";
import mapPin from "../assets/map-pin-new.png";
import mapPin50pc from "../assets/map-pin6.png"
import { Link,useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";


const Map = () => {
  const [selectedDateMs, setSelectedDateMs] = useState(Date.now());
  const [ isFree,setIsFree ] = useState(false)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsI5Nfl4xBcf9qsmtQAFzUkqMMmBC9WCw",
  });


  const navigate = useNavigate()

  const gigs = useGigs();

  const center = {
    lat: -41.294,
    lng: 174.777,
  };

  const selectedDateString = useMemo(() => {
    const formattedDate = format(new Date(selectedDateMs), "EEE LLL do Y");
    return formattedDate;
  }, [selectedDateMs]);

  const currentDay = useMemo(() => {
    const formattedDay = format(new Date(selectedDateMs), "EEEE");
    return formattedDay;
  }, [selectedDateMs]);

  const currentWeek = useMemo(() => {
    const formattedDay = format(new Date(selectedDateMs), "LLLL do Y");
    return formattedDay;
  }, [selectedDateMs]);

  //Filtering through gigs to return only current day's gigs
  const gigsToday = gigs.filter((gig) => {
    const formattedGigDate = format(
      new Date(gig.dateAndTime.seconds * 1000),
      "EEE LLL do Y"
    );
    return formattedGigDate === selectedDateString;
  });

  const addDays = (amount) => {
    setSelectedDateMs((curr) => curr + 1000 * 60 * 60 * 24 * amount);
  };

  const freeGigsToday = gigsToday.filter((gig) => {
    return gig.isFree === true
  })

  const gigsToDisplay = isFree ? freeGigsToday : gigsToday


  const selectedStyle = {
    backgroundColor: "#F6F6F5",
    color:"#377D8A",
    borderRadius: "8px",
    fontfamily: "NunitoSans",
    border:"none",
    width:"116px",
    height:"37px",
    fontWeight:"700",
    fontSize:"14px",
  }

  let selectedButtonStyle
  !isFree ? selectedButtonStyle = selectedStyle : selectedButtonStyle = null


  const containerStyle = {
    width: "90%",
    height: "400px",
    borderRadius: "26px",
    margin: "0 auto",
  };

  const onMarkerClick = (id) => {
    navigate(`/gigDetails/${id}`)
  }

  const map = isLoaded ? (
    <div className="map-container">
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={containerStyle}
        options={{ styles: mapStyle }}
      >
        {gigsToDisplay.map((gig, i) => {
          const lat = gig.location.latitude;
          const lng = gig.location.longitude;
          const location = { lat: lat, lng: lng };
          return (
            <Marker
              position={location}
              icon={{
                url: mapPin50pc,
              }}
              onClick = {() => onMarkerClick(gig.id)}
            ></Marker>
          );
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
        <p>
          Tap on the <img className="map_text_pin" src={mapPin} /> icons on the
          map to see more gig info
        </p>
      </div>

      {map}

      <div className="arrows">
        <div className="arrow_left">
          <AiFillCaretLeft size={48} onClick={() => addDays(-1)} />
          <p>Previous Day</p>
        </div>
        <div className="arrow_right">
          <AiFillCaretRight size={48} onClick={() => addDays(1)} />
          <p>Next Day</p>
        </div>
      </div>

      <div className="buttons">
        <Link to="/list">
          <button>List</button>
        </Link>
        <button onClick = {() => setIsFree((currentState) => !currentState)} style ={selectedButtonStyle}>Free Events</button>
      </div>
    </div>
  );
};

export default Map;

import { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, OverlayView } from "@react-google-maps/api";
import { mapStyle } from "../util/mapStyle";
import { useGigs } from "../hooks/useGigs";
import mapPin50pc from "../assets/map-pin-new.png"
import { Link,useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";


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
    width: "100vw",
    height: "100vh",
  };

  const onMarkerClick = (id) => {
    navigate(`/gigDetails/${id}`)
  }

  const getPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height -16) }; // Adjust these values to position your text correctly
  };

  const map = isLoaded ? (
    <div className="map-container">
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={containerStyle}
        options={{ 
          styles: mapStyle,
          zoomControl:false,
          mapTypeControl:false,
          streetViewControl:false,
          fullscreenControl: false 
        }}
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
                scaledSize: new window.google.maps.Size(25, 35), // Set custom size for the icon
              }}
              onClick = {() => onMarkerClick(gig.id)}
            >
              <OverlayView
                position = {location}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={getPixelPositionOffset}
              >
              <div style={{ padding: "2px 5px", borderRadius: "3px",fontFamily:'Lato', fontWeight:'bold' }}>
                {gig.venue.length > 10 ? `${gig.venue.substring(0,9)}...` : gig.venue} {/* Assume gig.name is the text you want to display */}
              </div>
              </OverlayView>
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );

  return (
    <div className="map">

      <Header/>
      <Carousel setSelectedDate = {setSelectedDateMs} selectedDate = {selectedDateMs}/>
      {map}
      <Footer/>

    </div>
  );
};

export default Map;

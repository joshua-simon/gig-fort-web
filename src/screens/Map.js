import { useState } from 'react'
import { GoogleMap,useJsApiLoader } from '@react-google-maps/api';
import { mapStyle } from '../util/mapStyle';

const Map = () => {

    const { isLoaded } = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey:"AIzaSyDsI5Nfl4xBcf9qsmtQAFzUkqMMmBC9WCw"
        
    })

    const center = {
        lat:-41.294,
        lng:174.777
    }

    const containerStyle = {
        width: '373px',
        height: '410px',
        borderRadius: '26px'
      };

    const map = isLoaded ? (
        <div className="map-container">
    <GoogleMap
        zoom={14}
        center = {center}
        mapContainerStyle={containerStyle}
        options = {{styles:mapStyle}}
        >

        </GoogleMap>
        </div>
    ) : <></>

    return ( 
        <div>{map}</div>
     );
}
 
export default Map;
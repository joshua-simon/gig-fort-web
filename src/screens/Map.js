import { useGigs } from "../hooks/useGigs";

const Map = () => {

    const gigs = useGigs()


    console.log('gigs',gigs)
    return ( 
        <div>Map</div>
     );
}
 
export default Map;
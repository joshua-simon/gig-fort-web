import { getGigsToday } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";
import GigCard from "./GigCard";

const GigsToday = () => {

    const gigs = useGigs()
    const currentDateMs = Date.now()
    const gigsToday = getGigsToday(gigs, currentDateMs)

    return ( 
        <div>
            {
                gigsToday.map((gig,i) => {
                    return (
                        <GigCard
                            venue = {gig.venue}
                        />
                    )
                })
            }
        </div>
     );
}
 
export default GigsToday;
import { getGigsToday } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";
import GigCard from "./GigCard";

const GigsToday = () => {

    const gigs = useGigs()
    const currentDateMs = Date.now()
    const gigsToday = getGigsToday(gigs, currentDateMs)

    return ( 
        <div className="gigsToday">
            {
                gigsToday.map((gig,i) => {
                    return (
                        <GigCard
                            venue = {gig.venue}
                            blurb = {gig.blurb}
                            dateAndTime = {gig.dateAndTime}
                            gigName = {gig.gigName}
                            image = {gig.image}
                            isFree = {gig.isFree}
                            ticketPrice = {gig.ticketPrice}
                            location = {gig.location}
                            id = {gig.id}
                            tickets = {gig.ticket}
                            genre = {gig.genre}
                        />
                    )
                })
            }
        </div>
     );
}
 
export default GigsToday;
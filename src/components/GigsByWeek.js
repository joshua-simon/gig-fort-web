import { getGigsThisWeek } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";
import GigCard from "./GigCard";
import { Link } from "react-router-dom";


const GigsByWeek = () => {

    const currentDateMs = Date.now()
    const gigs = useGigs()
    const gigsThisWeek = getGigsThisWeek(gigs,currentDateMs)


 return (
    <div>
        {Object.entries(gigsThisWeek).map(([date,gigs]) => {
          const day = date.slice(0,3)
          const week = date.slice(4,18)
           return (
            <div>
               <div className="gigsThisWeek_date">
                  <p className="gigsThisWeek_date_day">{day}</p>
                  <p className="gigsThisWeek_date_week">{week}</p>
               </div>
                {gigs.map(gig => {
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
                })}
            </div>
           )          
        })}
    </div>
 )

}
 
export default GigsByWeek;
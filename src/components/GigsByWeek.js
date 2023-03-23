import { getGigsThisWeek } from "../util/helperFunctions";
import { useGigs } from "../hooks/useGigs";


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
                <h2>{day}</h2>
                {gigs.map(gig => {
                   return (
                    <div>{gig.gigName}</div>
                   ) 
                })}
            </div>
           )          
        })}
    </div>
 )

}
 
export default GigsByWeek;
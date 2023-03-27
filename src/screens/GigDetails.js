import { useParams } from "react-router-dom";
import { useGigs } from "../hooks/useGigs";
import header from '../assets/Ellipse_29.png'
import { TfiLocationPin } from 'react-icons/tfi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { ImTicket } from 'react-icons/im'
import { format } from "date-fns";

const GigDetails = () => {

    const { id } = useParams()
    const gigs = useGigs()
    const filteredGig = gigs.filter(gig => gig.id === id)
    

    const free = filteredGig[0]?.isFree ? "|  Free Entry" : "";

    const date = format( new Date(filteredGig[0]?.dateAndTime.seconds * 1000), "EEE LLL do Y")
    const time = format(new Date(filteredGig[0]?.dateAndTime.seconds * 1000), "hbbb");
    

    return ( 
    <div className="gigDetails_container">
        <img src = {header} />
        <img className="gigDetails_image" src = {filteredGig[0]?.image}/>
       <div className="gigDetails_details">
            <p>{filteredGig[0]?.gigName}</p>
            <div className="locationAndTime">
                <div className="lcoationAndTime_row">
                    <TfiLocationPin/>
                    {`${filteredGig[0].venue} ${free} `}
                </div>
                <div className="lcoationAndTime_row">
                    <AiOutlineClockCircle/>
                    <p>{`${date}  ${time}`}</p>
                </div>
            </div>
       </div>
    </div>
     );
}
 
export default GigDetails;
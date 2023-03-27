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
    const filteredGig = gigs?.filter(gig => gig.id === id)





let content


    if (filteredGig.length > 0)  {

        const free = filteredGig[0]?.isFree ? "|  Free Entry" : "";

        const isTicketPrice = !filteredGig[0]?.isFree ? (
        <div className="lcoationAndTime_row">
            <ImTicket/>
            <p>{filteredGig[0]?.ticketPrice}</p>
        </div>
        ) : null
    
        const date = format( new Date(filteredGig[0]?.dateAndTime.seconds * 1000), "EEE LLL do Y")
        const time = format(new Date(filteredGig[0]?.dateAndTime.seconds * 1000), "hbbb");



        content = <div className="gigDetails_container">
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
                {isTicketPrice}
            </div>
       </div>
    </div>
    } else {
        return null
    }
    

    return ( 
        <>
            {content}
        </>
     );
}
 
export default GigDetails;
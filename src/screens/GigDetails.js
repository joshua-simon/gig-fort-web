import { useParams } from "react-router-dom";
import { useGigs } from "../hooks/useGigs";
import header from "../assets/Ellipse_29.png";
import { TfiLocationPin } from "react-icons/tfi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImTicket } from "react-icons/im";
import { format } from "date-fns";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const GigDetails = () => {
  const { id } = useParams();
  const gigs = useGigs();
  const filteredGig = gigs?.filter((gig) => gig.id === id);

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }


  let content;

  if (filteredGig.length > 0) {
    const free = filteredGig[0]?.isFree ? "|  Free Entry" : "";

    const isTicketPrice = !filteredGig[0]?.isFree ? (
      <div className="locationAndTime_row">
        <ImTicket size={14} color = {'#4B4B4B'}  />
        <p>{`$${filteredGig[0]?.ticketPrice}`}</p>
      </div>
    ) : null;

    const isTicketed = filteredGig[0].tickets ? (
       <a href = {filteredGig[0]?.tickets}><button className="gigDetails_button">Find Tickets</button></a> 
    ) : null

    const date = format(
      new Date(filteredGig[0]?.dateAndTime.seconds * 1000),
      "EEE LLL do Y"
    );
    const time = format(
      new Date(filteredGig[0]?.dateAndTime.seconds * 1000),
      "hbbb"
    );

    content = (
      <div className="gigDetails_container">

        
        <div className="header">
            <img src={header} />    
            <button className="back_arrow" onClick={handleGoBack}>
                <AiOutlineArrowLeft size={28}/>
            </button>
        </div>

        <img className="gigDetails_image" src={filteredGig[0]?.image} />

        <div className="gigDetails_details">
          <p>{filteredGig[0]?.gigName}</p>

          <div className="locationAndTime">
            <div className="locationAndTime_row">
              <TfiLocationPin size={14} color = {'#4B4B4B'} />
             <p>{`${filteredGig[0].venue} ${free} `}</p> 
            </div>
            <div className="locationAndTime_row">
              <AiOutlineClockCircle size={14} color = {'#4B4B4B'}  />
              <p>{`${date}  ${time}`}</p>
            </div>
            {isTicketPrice}
          </div>
           
        </div>

          <div className="blurb">
            <h3>Event Details</h3>
            <p>{filteredGig[0].blurb}</p>
          </div>
          <div className="ticket">{isTicketed}</div>

      </div>
    );
  } else {
    return null;
  }

  return <>{content}</>;
};

export default GigDetails;

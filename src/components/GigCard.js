import { TfiLocationPin } from 'react-icons/tfi'


const GigCard = ({
  venue,
  blurb,
  dateAndTime,
  gigName,
  image,
  isFree,
  ticketPrice,
  location,
  id,
  tickets,
  genre
}) => {

  return (
    <div className="gigCardContainer">
        <div className="gigCard_header">
            <h2>{gigName}</h2>
            <div className='gigCard_header_sub'>
                <TfiLocationPin/>
                <p>{`${venue} | ${genre}`}</p>
            </div>
        </div>
        <div className="gigCard_imageAndBlurb">
            <img src = {image}/>
            <p>{`${blurb.substring(0,60)}...`}</p>
        </div>
    </div>
  );

};

export default GigCard;
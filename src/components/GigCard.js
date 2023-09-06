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
            <h3>{`${gigName?.substring(0,30)}...`}</h3>
            <div className='gigCard_header_sub'>
                <TfiLocationPin/>
                <h5>{`${venue} | ${genre ? genre : ''}`}</h5>
            </div>
        </div>
        <div className="gigCard_imageAndBlurb">
            <img src = {image}/>
            <p>{`${blurb?.substring(0,60)}...`}</p>
        </div>
            <p className='seeMore'>{`See More >>`}</p>
    </div>
  );

};

export default GigCard;
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TfiLocationPin } from 'react-icons/tfi'
import { subHours, subMinutes, format, set,getDate } from "date-fns";
import { AiFillHeart,AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark,BsBookmarkFill } from 'react-icons/bs'
import { AuthContext } from '../AuthContext';
import { useGigData } from '../hooks/useGigData';

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


  const { user } = useContext(AuthContext)

  const {
    isGigSaved,
    toggleSaveGig,
    likes,
    toggleLiked,
    isGigLiked,
    isPopupVisible
  } = useGigData(id, user?.uid);



  const dateInSeconds = dateAndTime?.seconds
  const gigDate = new Date(dateInSeconds*1000)
  const dateObject = new Date(gigDate)
  const dayOfMonth = getDate(dateObject);
  const monthName = format(new Date(gigDate), 'LLL');

  const gigFortLogoURL = 'https://play-lh.googleusercontent.com/bTmOoSUdABDQ2rAa80DPOgyHbZH-4YVoIbDtuJfEK47Tfjx3WutZ9RcUiP8jKugxtXKO=w240-h480-rw'

  return (
    <div className="gigCardContainer">
      <div className="gigCard_header">
        <div className="gigCard_header_text">
          <h3>
            {gigName?.length > 20 ? `${gigName?.substring(0, 19)}...` : gigName}
          </h3>
          <div className="gigCard_header_sub">
            <TfiLocationPin />
            <p>{`${venue} ${genre ? `| ${genre}` : ""}`}</p>
          </div>
        </div>

        <div className="gigCard_header_datebox">
          <p className="gigCard_header_datebox_day">{dayOfMonth}</p>
          <p className="gigCard_header_datebox_month">{monthName}</p>
        </div>
      </div>

      <div className="gigCard_imageAndBlurb">
        <img src={image ? image : gigFortLogoURL} />
        <div className="gigCard_imageAndBlurb_blurb">
          <p className="blurb">{`${blurb?.substring(0, 40)}...`}</p>

          <Link to = {`/gigDetails/${id}`} style = {{textDecoration: 'none'}}>
            <p className = 'seeMore'>{`See More >>`}</p>
          </Link>
          
        </div>
      </div>

      <div style={{ marginTop: "3%" }}>
        <p style={{ fontFamily: "Lato", color: "#747474" }}>{`${likes} ${
          likes === 1 ? "person has" : "people have"
        } liked this gig`}</p>
      </div>

      <div className="gigCard_buttons">
        <div className="gigCard_button" onClick={() => toggleLiked(id)}>
          {isGigLiked ? (
            <AiFillHeart size={24} color="#377D8A" />
          ) : (
            <AiOutlineHeart size={24} color="#377D8A" />
          )}
          <p>Like</p>
        </div>

        <div className="gigCard_button" onClick={() => toggleSaveGig(id)}>
          {isGigSaved ? (
            <BsBookmarkFill size={22} color="#377D8A" />
          ) : (
            <BsBookmark size={22} color="#377D8A" />
          )}
          <p>Save</p>
        </div>
      </div>
    </div>
  );

};

export default GigCard;
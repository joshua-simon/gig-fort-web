import { useState } from "react";
import { useGigs } from "../hooks/useGigs";
import GigsToday from "../components/GigsToday";
import GigsByWeek from "../components/GigsByWeek";
import { format } from "date-fns";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const List = () => {
  const [ showWeek,setShowWeek ] = useState(false)
  const currentDateMs = Date.now();
  const formattedDay = format(new Date(currentDateMs), "EEEE");
  const formattedWeek = format(new Date(currentDateMs), "LLLL do Y");

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

 const gigsToRender = showWeek ? (
    <GigsByWeek/>
 ) : (
    <GigsToday/>
 )

 const date = !showWeek ? (
   <div className="gigsToday_date">
     <p className="gigsToday_date_day">{formattedDay}</p>
     <p className="gigsToday_date_week">{formattedWeek}</p>
   </div>
 ) : (
  <div className="gigsToday_date">
</div>
 )

 const buttonStyle = {backgroundColor:'#F6F6F5',color:'#377D8A'}

  return (
    <div className="list">
      <button className="back_arrow" onClick={handleGoBack}>
        <AiOutlineArrowLeft size={28}/>
      </button>
      <div className="listButtons">
        <button onClick={() => setShowWeek(false)} style = {showWeek ? buttonStyle : null}>Gigs Today</button>
        <button onClick={() => setShowWeek(true)} style = {showWeek ? null : buttonStyle}>Gigs This Week</button>
      </div>
      {date}
      <div className="listContainer">
        {gigsToRender}
      </div>
    </div>
  );
};
 
export default List;


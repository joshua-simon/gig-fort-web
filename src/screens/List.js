import { useGigs } from "../hooks/useGigs";
import GigsToday from "../components/GigsToday";
import { format } from "date-fns";

const List = () => {
  const currentDateMs = Date.now();
  const formattedDay = format(new Date(currentDateMs), "EEEE");
  const formattedWeek = format(new Date(currentDateMs), "LLLL do Y");

  return (
    <div className="list">
      <div className="gigsToday_date">
        <p className="gigsToday_date_day">{formattedDay}</p>
        <p className="gigsToday_date_week">{formattedWeek}</p>
      </div>
      <div className="listButtons">
        <button>Gigs Today</button>
        <button>Gigs This Week</button>
      </div>
      <div className="listContainer">
        <GigsToday />
      </div>
    </div>
  );
};
 
export default List;


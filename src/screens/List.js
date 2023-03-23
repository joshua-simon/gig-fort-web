import { useGigs } from "../hooks/useGigs";
import GigsToday from "../components/GigsToday";

const List = () => {
  return (
    <div>
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


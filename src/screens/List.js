import { useGigs } from "../hooks/useGigs";
import GigsToday from "../components/GigsToday";

const List = () => {

    return ( 
        <div className="listContainer">
            <GigsToday/>
        </div>
     );
}
 
export default List;
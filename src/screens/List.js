import ListComponent from "../components/ListComponent";
import Footer from "../components/Footer";

const List = () => {
  return (
    <div className="list-component-container">
      <div className="list-component-container-content">
        <ListComponent/>
      </div>
      <div className="list-component-container-footer">
        <Footer/>
      </div>
    </div>
  )
}

export default List
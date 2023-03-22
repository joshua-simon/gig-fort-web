import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./screens/Map";
import List from "./screens/List";
import GigDetails from "./screens/GigDetails";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Map/>}/>
        <Route path = '/list' element = {<List/>}/>
        <Route path = '/gigDetails' element = {<GigDetails/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;

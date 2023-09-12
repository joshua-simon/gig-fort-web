import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./screens/Map";
import List from "./screens/List";
import GigDetails from "./screens/GigDetails";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Logout from "./screens/Logout";
import RegistrationSuccess from "./screens/RegistrationSuccess";
import ForgotPassword from "./screens/ForgotPassword";
import { AuthProvider } from "./AuthContext";
import './styles.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/list" element={<List />} />
          <Route path="/gigDetails/:id" element={<GigDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path = '/logout' element = {<Logout/>}/>
          <Route path = '/forgot-password' element = {<ForgotPassword/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

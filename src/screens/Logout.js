import { useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { auth } from "../firebase";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    let [color, setColor] = useState("#FFFFFF");

    const signUserOut = () => {
        setLoading(true); 
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          })
      };

    const loadingSpinner =  <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    
    return (
        <div className="logout-container">
            <p>Are you sure you want to log out?</p>
            <div className="logout-container-logout-button" onClick = {signUserOut}>{!loading ? 'Log out' : loadingSpinner}</div>
            <div className="logout-container-return-button" onClick = {() => navigate('/profile')}>Return to Profile</div>
        </div>
    )
}
 
export default Logout;
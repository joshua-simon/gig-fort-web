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
    const [userDetails,setUserDetails] = useState({email:'',password:''})
    const navigate = useNavigate()
    let [color, setColor] = useState("#FFFFFF");

    const loadingSpinner =  <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };
    
    return (
        <div className="login-container">
            <p className="login-container-header">Log in</p>


                <p className="input-text">Email</p>
                    <input
                    type = "text"
                    name = 'email'
                    onChange = {handleChange}
                    />


                    <p className="input-text">Password</p>
                    <input
                    type = "password"
                    name = 'password'
                    onChange = {handleChange}
                    /> 
            
            <div className="login-container-login-button" >{!loading ? 'Submit' : loadingSpinner}</div>
            <div className="login-container-forgotPassword-button">Forgot Password</div>
        </div>
    )
}
 
export default Logout;
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
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
    const [loginDetails,setLoginDetails] = useState({email:'',password:''})
    const [errorMessages,setErrorMessages] = useState({})
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
        setLoginDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const validateForm = () => {
        let isValid = true
        const error = {}

        if(loginDetails.email.trim() === '') {
            error.email = 'Email is required'
            isValid = false
        }
        if(loginDetails.password.trim() === '') {
            error.password = 'Password is required'
            isValid = false
        }    
        setErrorMessages(error)
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validateForm()) {
          setLoading(true);
            signInWithEmailAndPassword(auth,loginDetails.email,loginDetails.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setLoading(false);
                navigate('/profile')
            })
            
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const updatedErrorMessages = { ...errorMessages };

                switch (errorCode) {
                    case "auth/invalid-email":
                        updatedErrorMessages.email = "Invalid email";
                        break;
                    case "auth/user-disabled":
                        updatedErrorMessages.email = "User disabled";
                        break;
                    case "auth/user-not-found":
                        updatedErrorMessages.email = "User not found";
                        break;
                    case "auth/wrong-password":
                        updatedErrorMessages.password = "Wrong password";
                        break;
                    default:
                        break;
                }
                setErrorMessages(updatedErrorMessages);
                setLoading(false)
            });
        }
    }

    
    return (
        <div className="login-container">
            <p className="login-container-header">Log in</p>

            <form onSubmit = {handleSubmit}>
                <p className="input-text">Email</p>
                    <input
                    type = "text"
                    name = 'email'
                    placeholder = 'Enter your email'
                    onChange = {handleChange}
                    />
                {errorMessages.email ? <div style={{ color: 'red' }}>{errorMessages.email}</div> : null} 

                <p className="input-text">Password</p>
                    <input
                    type = "password"
                    name = 'password'
                    placeholder = 'Enter your password'
                    onChange = {handleChange}
                    /> 
                {errorMessages.password ? <div style={{ color: 'red' }}>{errorMessages.password}</div> : null} 

             <button type = "submit" className="login-container-login-button" >{!loading ? 'Submit' : loadingSpinner}</button>
            </form>
            <div className="login-container-forgotPassword-button">Forgot Password</div>
        </div>
    )
}
 
export default Logout;
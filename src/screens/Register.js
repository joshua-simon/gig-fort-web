import { useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };


const Register = () => {
    const [userDetails,setUserDetails] = useState({firstName:'',lastName:'',email:'',password:'',repeatPassword:''})
    const [errorMessages,setErrorMessages] = useState({})
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#FFFFFF");

    const navigate = useNavigate()


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };


    const validateForm = () => {
        let isValid = true
        const error = {}

        if(userDetails.firstName.trim() === '') {
            error.firstName = 'First Name is required'
            isValid = false
        }
        if(userDetails.lastName.trim() === '') {
            error.lastName = 'Last Name is required'
            isValid = false
        }
        if(userDetails.email.trim() === '') {
            error.email = 'Email is required'
            isValid = false
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(userDetails.email)) {
                error.email = 'Email is invalid'
                isValid = false
            }
        }
        if(userDetails.password.trim() === '') {
            error.password = 'Password is required'
            isValid = false
        } else {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if(!passwordRegex.test(userDetails.password)) {
                error.password = 'Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter';
                isValid = false
            }
        }
        if(userDetails.repeatPassword.trim() === '') {
            error.repeatPassword = 'Repeat Password is required'
            isValid = false
        }
        if(userDetails.password !== userDetails.repeatPassword) {
            error.repeatPassword = 'Passwords do not match'
            isValid = false
        }

        setErrorMessages(error)
        return isValid
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if(validateForm()) {
          setLoading(true);
            createUserWithEmailAndPassword(auth,userDetails.email,userDetails.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    userId: user.uid,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    email: userDetails.email,
                    userLocation: 'Wellington',
                    likedGigs: [],
                    savedGigs:[]
                })
                setLoading(false);
                setUserDetails({
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  repeatPassword: '',
                  userLocation: ''
                }); 
                navigate('/registration-success')
            })
            .catch((error) => {
                setLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;

                const updatedErrorMessages = { ...errorMessages };

                switch (errorCode) {
                  case "auth/email-already-in-use":
                    updatedErrorMessages.email = "Email is already in use";
                    break;
                  case "auth/invalid-email":
                    updatedErrorMessages.email = "Invalid email";
                    break;
                  case "auth/weak-password":
                    updatedErrorMessages.password = "Weak password";
                    break;
                  default:
                    // Handle other Firebase errors as needed
                    break;
                }
        
                setErrorMessages(updatedErrorMessages);
            })
            
        }
    }

    const loadingSpinner =  <ClipLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
  />

    return ( 
        <div className = "register-container">
            <h2>Sign up for Gig Fort</h2>

           <form
            onSubmit = {handleSubmit}
           >
                <label for = 'firstName'>Enter first name</label>
                <input
                    type = "text"
                    name = 'firstName'
                    onChange = {handleChange}
                />
                {errorMessages.firstName ? <div style={{ color: 'red' }}>{errorMessages.firstName}</div> : null}  

                <label for = "lastName">Enter last name</label>
                <input
                    type = "text"
                    name = 'lastName'
                    onChange = {handleChange}
                />
                {errorMessages.lastName ? <div style={{ color: 'red' }}>{errorMessages.lastName}</div> : null} 

                <label for = "email">Enter email</label>
                <input
                type = "text"
                name = 'email'
                onChange = {handleChange}
                />
                {errorMessages.email ? <div style={{ color: 'red' }}>{errorMessages.email}</div> : null} 

                <label for = "password">Enter password</label>
                <input
                type = "password"
                name = 'password'
                onChange = {handleChange}
                />
                {errorMessages.password ? <div style={{ color: 'red' }}>{errorMessages.password}</div> : null} 

                <label for = "repeatPassword">Please re-enter your password</label>
                <input
                type = "password"
                name = 'repeatPassword'
                onChange = {handleChange}
                />
                {errorMessages.repeatPassword ? <div style={{ color: 'red' }}>{errorMessages.repeatPassword}</div> : null} 

                <button 
                type = 'submit'
                className = 'register-submit-button'
                >{!loading ? 'Submit' : loadingSpinner}</button>

           </form>
        </div>
     );
}
 
export default Register;
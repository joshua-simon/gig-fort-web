import { useState,useContext } from "react";
import { updateUserDetails } from "../hooks/databaseFunctions";
import { useGetUser } from "../hooks/useGetUser";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const EditDetails = () => {
   
    const { user } = useContext(AuthContext)
    const userInfo = useGetUser(user?.uid)
    const { firstName,lastName } = userInfo || {}
    const [ userDetails, setUserDetails ] = useState({updatedFirstName:'',updatedLastName:'',location:'Wellington'})
    const [errorMessages,setErrorMessages] = useState({})
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

        if(userDetails.updatedFirstName.trim() === '') {
            error.firstName = 'Please do not leave this field empty'
            isValid = false
        }
        if(userDetails.updatedLastName.trim() === '') {
            error.lastName = 'Please do not leave this field empty'
            isValid = false
        }    
        setErrorMessages(error)
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()){
            updateUserDetails(userDetails.updatedFirstName,userDetails.updatedLastName,userDetails.location,user.uid)
            navigate('/profile')
            alert('Details updated')
        }
    }

    return (
        <div className="edit-details-container">
            <p>Edit details</p>
            <form onSubmit = {handleSubmit}>
                <input
                    type = "text"
                    defaultValue={firstName}
                    name = "updatedFirstName"
                    onChange={handleChange}
                />
                {errorMessages.firstName ? <p style={{ color: 'red' }}>{errorMessages.firstName}</p> : null}
                 <input
                    type = "text"
                    defaultValue = {lastName}
                    name = "updatedLastName"
                    onChange={handleChange}
                />
                {errorMessages.lastName ? <p style={{ color: 'red' }}>{errorMessages.lastName}</p> : null}
                <button type = "submit">Submit</button>              
            </form>
        </div>
    )
}
 
export default EditDetails;
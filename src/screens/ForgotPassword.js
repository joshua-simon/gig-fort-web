import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
    const [ resetEmail,setResetEmail ] = useState('')

    const sendPasswordEmail = () => {
        if(resetEmail.trim() === '') {
            alert('Email is required')
            return
        } else {
            sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                alert('Email sent')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            })
        }
    }

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-container-form" onSubmit = {sendPasswordEmail}>
                <input
                    type = "text"
                    name = "email"
                    placeholder = "Enter email address"
                    onChange = {(e) => setResetEmail(e.target.value)}
                />
                <button type = "submit">
                    Send a password reset email to my email address
                </button>
                <div className="return-to-login-button">Return to Login</div>
            </form>
        </div>
    )
}
 
export default ForgotPassword;
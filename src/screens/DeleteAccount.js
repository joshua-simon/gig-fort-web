import { deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const navigate = useNavigate()

    const deleteUserAccount = () => {
        deleteUser(auth.currentUser)
          .then(() => {
            alert('Account Deleted')
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div className="delete-account-container">
            <p>Are you sure you want to delete your account?</p>
            <button className="delete-account-container-delete-account-button" onClick = {deleteUserAccount}>Delete Account</button>
            <button className="delete-account-container-return-button" onClick = {() => navigate('/profile')}>Return to profile</button>
        </div>
    )
}
 
export default DeleteAccount;
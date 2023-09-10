import { useContext,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../AuthContext'
import { BsPerson } from 'react-icons/bs'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'

const Header = () => {
    const [userFirstName, setUserFirstName] = useState([]);
    const { user } = useContext(AuthContext)


    useEffect(() => {
        if (user) {
          const userRef = doc(db, 'users', user?.uid);
          const unsubscribeUser = onSnapshot(userRef, (userSnapshot) => {
          const userData = userSnapshot.data();
            
            if (userData) {
              setUserFirstName(userSnapshot.data().firstName || []);
            }
          });
      
          return () => {
            unsubscribeUser();
          };
        }
    }, [user]);

 

    const content = user ? (
      <Link to = {'/profile'} className="header-container-user">
        <div>
          <BsPerson size={32} color="white" />
          <p>{userFirstName}</p>
        </div>
      </Link>
    ) : (
      <div className="header-buttons">
        <Link to={"/login"} className="header-buttons-login">
          <div>Login</div>
        </Link>
        <Link to={"/register"} className="header-buttons-signUp">
          <div>Sign up</div>
        </Link>
      </div>
    );


    return (
    <div className="header-container">
        {content}
    </div>
    )
}
 
export default Header;
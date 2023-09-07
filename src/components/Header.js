import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-buttons">
                <Link to = {'/login'}  className="header-buttons-login">
                    <div>Login</div>
                </Link>
                <Link to = {'/register'}  className="header-buttons-signUp">
                    <div >Sign up</div>
                </Link>
            </div>
        </div>
    )
}
 
export default Header;
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer"
import logo from '../assets/logo_light_5.png'

const Profile = () => {

    const main = (
        <div className="profile-main">
            <div className="profile-main-header">
                <p className="profile-main-header-name">Joshua Simon</p>
                <p className="profile-main-header-location">Wellington</p>
            </div>
            <div className="profile-main-logo">
                <img src = {logo}/>
                <p>You haven't saved any gigs yet!</p>
            </div>
        </div>
    )

    return ( 
        <>
            <HeaderProfile/>
            {main}
            <Footer/>
        </>
     );
}
 
export default Profile;
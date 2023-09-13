import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import logo from "../assets/logo_light_5.png";
import { useGetUser } from "../hooks/useGetUser";
import { useGigs } from "../hooks/useGigs";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { isToday, isFuture } from "date-fns";
import GigCard from "../components/GigCard";

const Profile = () => {
  const [userSavedGigs, setUserSavedGigs] = useState([]);

  const { user } = useContext(AuthContext);
  const userDetails = useGetUser(user?.uid);
  const { firstName, lastName } = userDetails || {};

  const gigs = useGigs();

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      const unsubscribeUser = onSnapshot(userRef, (userSnapshot) => {
        const userData = userSnapshot.data();

        if (userData) {
          setUserSavedGigs(userSnapshot.data().savedGigs || []);
        }
      });

      return () => {
        unsubscribeUser();
      };
    }
  }, [user]);

  const savedGigs = gigs.filter((gig) => userSavedGigs?.includes(gig.id));

  const savedGigsFromCurrentDate = savedGigs?.filter((gig) => {
    const gigDate = gig.dateAndTime?.seconds * 1000;
    return isToday(new Date(gigDate)) || isFuture(new Date(gigDate));
  });


  const isGigs =
    savedGigsFromCurrentDate?.length === 0 ? (
      <div className="profile-main-logo">
        <img src={logo} />
        <p>You haven't saved any gigs yet!</p>
      </div>
    ) : (
      <div style = {{marginTop:'10%',marginBottom:'15%'}}>
        <p style = {{fontFamily:'NunitoSans', margin:0,fontSize:20,marginLeft: '5%',marginBottom: '3%'}}>Saved Gigs</p>
        {savedGigsFromCurrentDate.map((gig, i) => {
          return (
            <GigCard
                venue = {gig.venue}
                dateAndTime={gig.dateAndTime}
                blurb = {gig.blurb}
                gigName = {gig.gigName}
                image = {gig.image}
                id = {gig.id}
                genre = {gig.genre}
                isProfile = {true}
            />
          )
        })}
      </div>
    );

  const main = (
    <div className="profile-main">
      <div className="profile-main-header">
        <p className="profile-main-header-name">
          {firstName && lastName ? `${firstName} ${lastName}` : ""}
        </p>
        <p className="profile-main-header-location">Wellington</p>
      </div>
      {isGigs}
    </div>
  );

  return (
    <>
      <HeaderProfile />
      {main}
      <Footer />
    </>
  );
};

export default Profile;

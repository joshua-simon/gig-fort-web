import { doc,updateDoc,getDoc, arrayUnion, increment, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase'


export const addSavedGigs = async (gigId, userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        savedGigs: arrayUnion(gigId),
      });
    } catch (error) {
      console.error("Error adding saved gig", error);
    }
  };
  
  export const removeSavedGig = async (gigId, userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        savedGigs: arrayRemove(gigId),
      });
    } catch (error) {
      console.error("Error removing saved gig", error);
    }
  };
  
  export const incrementLikesByOne = async (gigId) => {
    const gigRef = doc(db, "gigs", gigId);
    try {
      await updateDoc(gigRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error incrementing likes", error);
    }
  };
  
  export const decrementLikesByOne = async (gigId) => {
    const gigRef = doc(db, "gigs", gigId);
    try {
      await updateDoc(gigRef, {
        likes: increment(-1),
      });
    } catch (error) {
      console.error("Error decrementing likes", error);
    }
  };
  
  export const addLikedGigIDtoUser = async (gigId, userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        likedGigs: arrayUnion(gigId),
      });
    } catch (error) {
      console.error("Error adding liked gig id to user", error);
    }
  };
  
  export const removeLikedGigIDfromUser = async (gigId, userId) => {
    const userRef = doc(db, 'users', userId);
    try {
      await updateDoc(userRef, {
        likedGigs: arrayRemove(gigId),
      });
    } catch (error) {
      console.error('Error removing gig id from user', error);
    }
  };
  
  export const getLikes = async (gigID) => {
    const gigRef = doc(db, "gigs", gigID);
    try {
      const gig = await getDoc(gigRef);
      return gig.data().likes;
    } catch (error) {
      console.error("Error getting likes", error);
    }
  };
  
  export const updateUserDetails = async (newFirstName, newLastName, userLocation, id) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        firstName: newFirstName,
        lastName: newLastName,
        userLocation: userLocation,
      });
    } catch (error) {
      alert(error);
    }
  };
  
  export const addUserIdToGig = async (gigId, userId) => {
    const gigRef = doc(db, "gigs", gigId);
    try {
      await updateDoc(gigRef, {
        notifiedUsers: arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error adding user id to gig", error);
    }
  };
  
  export const removeUserIdFromGig = async (gigId, userId) => {
    const gigRef = doc(db, "gigs", gigId);
    try {
      await updateDoc(gigRef, {
        notifiedUsers: arrayRemove(userId),
      });
    } catch (error) {
      console.error("Error removing user id from gig", error);
    }
  };
  
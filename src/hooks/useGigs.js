import { useState,useEffect } from "react";
import { query,collection,getDocs} from 'firebase/firestore' 
import { db } from "../firebase";

export const useGigs = () => {
    const [gigs, setGigs] = useState([])
  
    useEffect(() => {
      const getGigs = async () => {
        try {
          const q = query(collection(db, 'gigs'))
          const querySnapshot = await getDocs(q)
          const queriedGigs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            tickets: doc.data().tickets,
            venue: doc.data().venue,
            dateAndTime: doc.data().dateAndTime,
            isFree: doc.data().isFree,
            image: doc.data().image,
            genre: doc.data().genre,
            gigName: doc.data().gigName,
            blurb: doc.data().blurb,
            location: doc.data().location,
            ticketPrice: doc.data().ticketPrice
          }))
          setGigs(queriedGigs)
        } catch (err) {
          console.log(`Error: ${err}`)
        }
      }
      getGigs()
    }, [])
  
    return gigs
  }
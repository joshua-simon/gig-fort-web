import { AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'

const ButtonBar = () => {
    return (
        <div className="gigCard_buttons">
        <div className="gigCard_button" onClick={() => alert('Please sign in to like and save gigs')}>
            <AiOutlineHeart size={24} color="#377D8A" />
          <p>Like</p>
        </div>
  
        <div className="gigCard_button" onClick={() => alert('Please sign in to like and save gigs')}>
            <BsBookmark size={22} color="#377D8A" />
          <p>Save</p>
        </div>
      </div>
    )
}
 
export default ButtonBar;
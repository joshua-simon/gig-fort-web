import { useState,useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { BsMap,BsMapFill } from 'react-icons/bs'
import { FiList } from 'react-icons/fi'
import { FaListUl } from 'react-icons/fa'


const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedButton, setSelectedButton] = useState(location.pathname); 

    useEffect(() => {
        setSelectedButton(location.pathname);
      }, [location]);
    
      const toggleState = (path) => {
        setSelectedButton(path);
        navigate(path);
      };


    return (
        <div className="footer-container">
            <div className='footer-container-item' onClick = {() => toggleState('/list')} >
            {selectedButton === '/list' ? (
            <FaListUl size={20} color="#377D8A" />
          ) : (
            <FiList size={20} color="#377D8A" />
          )}
                <p>List</p>
            </div>
            <div className='footer-container-item' onClick = {() => toggleState('/')}>
            {selectedButton === '/' ? (
            <BsMapFill size={20} color="#377D8A" />
          ) : (
            <BsMap size={20} color="#377D8A"  />
          )}
                <p>Map</p>
            </div>
        </div>
    )
}
 
export default Footer;
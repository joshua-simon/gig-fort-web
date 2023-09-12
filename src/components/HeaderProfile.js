import { forwardRef } from 'react';
import { HiOutlineCog8Tooth } from 'react-icons/hi2'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const HeaderProfile = () => {
    const navigate = useNavigate()

    return (
        <div style={{ backgroundColor: '#2596be', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
            
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <HiOutlineCog8Tooth size={24} color='white' className='header-profile-cog' />
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                    <Dropdown.Item eventKey="1" onClick = {() => navigate('/logout')}>Log out</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Edit details</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Delete account</Dropdown.Item>
                    <Dropdown.Item eventKey="3">App information</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    );
}

// Custom Dropdown Toggle to remove default styles and show the icon
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <span
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </span>
));

export default HeaderProfile;

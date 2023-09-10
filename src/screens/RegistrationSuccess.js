import { Link } from 'react-router-dom'


const RegistrationSuccess = () => {
    return (
        <div className = 'registration-success-container'>
            <p>Congratulations! Your Gig Fort profile has been created</p>
            <Link to = {'/'} className='registration-success-container-button'>
                <p>Proceed to profile</p>
            </Link>
        </div>
    )
}
 
export default RegistrationSuccess;
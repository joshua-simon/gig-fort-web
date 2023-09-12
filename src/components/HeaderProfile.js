import { HiOutlineCog8Tooth } from 'react-icons/hi2'

const HeaderProfile = () => {
    return (
        <div style = {{backgroundColor: '#2596be',height:50,display:'flex', flexDirection:'row', justifyContent:'right',alignItems:'center'}}>
            <HiOutlineCog8Tooth size = {24} color = 'white' className = 'header-profile-cog' />
        </div>
    )
}
 
export default HeaderProfile;
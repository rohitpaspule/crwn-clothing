import { Link, Outlet } from "react-router-dom"
import CrwnLogo from '../../assets/crown.svg'
import './navigation.styles.scss'
import { useContext } from "react"
import { UserContext } from "../../contexts/user.contxt"
import { signOutUser } from "../../utils/firebase.utils"
const Navigation = () => {
    const { currentUser} = useContext(UserContext)
    const signOutHandler = async () =>{
      await signOutUser();
      //setCurrentUser(null)
      // setUser auth data is centralised in user context , as firebase provides auth change listener   
    }

    return <>
        <div className="navigation">
            <Link className="logo-container" to={'/'}>
                <div><img className="logo" src={CrwnLogo} alt="crwnlogo" /></div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to={'/shop'}>
                    Shop
                </Link>
                {currentUser ? <span className="nav-link" onClick={()=>{signOutHandler()}}> Sign Out</span>
                    : <Link className="nav-link" to={'/auth'}>
                        Sign In
                    </Link>}

            </div>
        </div>
        <Outlet />
    </>
}
export default Navigation
//this component if for the sigup and login for the navbar
// import "./Entrance.css"
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";


const SignOut = () => {
    const { loggedIn, logout } = useContext(AuthContext)
    return(
        <>
            {loggedIn?<a href="/sign-in">
                        <button
                            onClick={logout}
                            className="btn btn-primary w-49"
                            id='signup-bttn'>SIGN OUT
                        </button>
                    </a> : 
                    <a href="/login">
                        <button
                            className="btn btn-primary w-49"
                            id='signup-bttn'>login IN
                        </button>
                    </a>
                    
            }
        </>
    )
}
export default SignOut
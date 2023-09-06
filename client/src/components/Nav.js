import React, {useState} from 'react'
import logo from '../images/lmlmdblack.png'
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => {
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const toggleBurgerMenu = () => {
        setBurgerOpen(!burgerOpen);
        setMenuOpen(!menuOpen);
    }

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }


    return (
        <nav> 
            <div className="logo-container">
                <Link to="/"><img className="logo" src={logo}/></Link>
            </div>


            <div className={`burger ${burgerOpen ? 'open' : ''}`} onClick={toggleBurgerMenu}>
                <span className="burger-line line1"></span>
                <span className="burger-line line2"></span>
                <span className="burger-line line3"></span>
			</div>


            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/mymatches"><li className="menu-item">Matches</li></Link>
                <Link to="/ChatPage"><li className="menu-item">Chat</li></Link>
                <Link to="/MyPlaces"><li className="menu-item">Places</li></Link>
                <Link to="/MyProfile"><li className="menu-item">Profile</li></Link>
            </ul>

            <button className="nav-button" onClick={logout}>LOGOUT</button>

        </nav>
    )
}
export default Nav



            {/* <i className="log-out-icon" onClick={logout}>⇦</i> */}
            {/* {!authToken && !minimal && <button 
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Log in</button>} */}
import React, {useState} from 'react'
import logo from '../images/lmlmdblack.png'
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => {
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const handleClick2 = () => {
        navigate('/')
    }

    const toggleBurgerMenu = () => {
        setBurgerOpen(!burgerOpen);
        setMenuOpen(!menuOpen);
    }

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
    }


    return (
        <nav> 
            <div className="logo-container">
                <img className="logo" src={logo} onClick={handleClick2}/>
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


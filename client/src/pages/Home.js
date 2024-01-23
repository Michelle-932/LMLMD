import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import MyVideo from '../images/LMLMDVideo.mp4'
import {useState} from 'react'
import {useCookies} from'react-cookie'
import FooterHome from '../components/FooterHome'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    let navigate = useNavigate()

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    const handleClick2 = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(false)
    }

    const handleClick3 = () => {
        if (authToken) {
            navigate('/dashboard')
        }
    }


    return (
        <>

        <video autoPlay playsInline muted src={MyVideo} type='video/mp4' />

        {/* <Nav minimal={false} 
            authToken={authToken} 
            setShowModal={setShowModal} 
            showModal={showModal} 
            setIsSignUp={setIsSignUp}/> */}
        <div className="home">
            <h1 className="primary-title">Love Me, Love My Dog</h1>
            <h3>Dating is rough. Bring your dog!</h3>
            <div className="button-container">

                {authToken && <button
                    className="primary-button home-button"
                    onClick={handleClick3}
                >Dashboard</button>}
                
                
                <button className="primary-button home-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'SIGNUP'}
                </button>
                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

                {!authToken && <button 
                    className="primary-button home-button"
                    onClick={handleClick2}
                    disabled={showModal}
                >Log in</button>}

                <Link to="/demo"><button className="primary-button home-button">Learn More</button></Link>
            </div>
            <FooterHome/>
        </div>
        </>
    )
}

export default Home
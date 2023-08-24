import Nav from '../components/Nav'
import PlaceList from '../components/PlaceList'
import {useState} from 'react'
import {useCookies} from'react-cookie'
import {useNavigate} from 'react-router-dom'
import Footer from '../components/Footer'

const Places = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    const navigate = useNavigate()

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

    const handleMySavedPlacesClick = () => {
        navigate('/myplaces')
    }

    const handleSubmitPlaceClick = () => {
        navigate('/placesubmit')
    }

    return (
        <>
 
            <Nav
                minimal={true}
                setShowModal={() => { } }
                showModal={false} />

            <div className="place-hero">
                <h1 className="primary-title">Love Me, Love My Dog</h1>
                <h3 className="demo-title">"Dating is rough. Bring your dog!"</h3>
            </div>
            {/* <div className="place-intro-title">
                    
            </div> */}
            <div className="place-container">
                <div className="place-container-2">
                    <h2 className="page-title">Plan a dog-friendly date</h2>
                    <p>Below are some great places to go with your date... and your dog!</p>
                    <p>To save to your favorites, click the star below any of these listings.</p>
                    <p>Currently serving DFW Metro, Austin Metro, and SF Bay Area.</p>
                    <p>Know a good place? Click the Submit button below! </p>
                    <div>
                        <button className="secondary-button" onClick={handleMySavedPlacesClick}>My Saved Places</button>
                        <button className="secondary-button" onClick={handleSubmitPlaceClick}>Submit A Place</button>
                    </div>

                    <div className="placeList">
                    <PlaceList/>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Places
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import {useState} from 'react'
import {useCookies} from'react-cookie'
import Footer from '../components/Footer'
import {useNavigate} from 'react-router-dom'

const Demo = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    // const [cookies, setCookie, removeCookie] = useCookies(['user'])

    // const authToken = cookies.AuthToken

    let navigate = useNavigate()

    // const handleClick = () => {
    //     // if (authToken) {
    //     //     removeCookie('UserId', cookies.UserId)
    //     //     removeCookie('AuthToken', cookies.AuthToken)
    //     //     window.location.reload()
    //     //     return
    //     // }
    //     setShowModal(true)
    //     setIsSignUp(true)
    // }

    // const handleClick2 = () => {
    //     // if (authToken) {
    //     //     removeCookie('UserId', cookies.UserId)
    //     //     removeCookie('AuthToken', cookies.AuthToken)
    //     //     window.location.reload()
    //     //     return
    //     // }
    //     setShowModal(true)
    //     setIsSignUp(false)
    // }

    // // const handleClick3 = () => {
    // //     if (authToken) {
    // //         navigate('/dashboard')
    // //     }
    // // }

    const handleClick3 = () => {
        navigate('/')
    }

    return (
        <>
        <div className="demo">
            <div className="hero">
                <h1 className="primary-title">Love Me, Love My Dog</h1>
                <h3 className="demo-title">"Dating is rough. Bring your dog!"</h3>

                <div className="button-container">
                    <button className="primary-button home-button" onClick={handleClick3}>HOME</button>
                    {/* <button className="primary-button home-button">DEMO MODE</button> */}
                    <a href="https://github.com/michelle-932/LMLMD" target="_blank" rel="noopener noreferrer">
                        <button className="primary-button home-button">GITHUB</button></a>

                    {/* {authToken && <button
                        className="primary-button home-button"
                        onClick={handleClick3}
                    >Dashboard</button>}
                    
                    
                    <button className="primary-button home-button" onClick={handleClick}>
                        {authToken ? 'Signout' : 'SIGNUP'}
                    </button>
                    {showModal && (
                        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                    )}
                    <button className="primary-button home-button">DEMO</button> */}

                </div>
            </div>
            <div className="how-container">
                <div className="howItWorks">
                    <h2 className="demo-title">How does it work?</h2>
                    <div className="how-left column">
                        <p>I got the idea for this app while Watching a Rom-Com and seeing the familiar montage of awful dates.
                            I built Love Me, Love My Dog to solve some problems I remember having while trying to meet new people.
                        </p>
                        <ul>
                            <li>It's hard to find dog-friendly places to go, so you can meet your match and plan your date with this app!</li>
                            <li>Meet people in dog-friendly places, which are well lit, full of other people and open during business hours</li>
                            <li>Solve the problem of having nothing to talk about. At least you know you both like dogs!</li>
                            <li>Your dog is an excellent judge of character and can help you feel better in unfamiliar situations</li>
                        </ul>
                    </div>
                    <div className="how-right column">
                        <div className="how-1">
                            <h3>Create Profile</h3>
                            <p>Fill in your details and meet your match! Open to all regardless of disability, race, gender expression, or sexual orientation.</p>
                        </div>
                        <div className="how-2">
                            <h3>Find a Match</h3>
                            <p>Swipe right or use the accessible buttons to add to your list of matches.</p>
                        </div>
                        <div className="how-3">
                            <h3>Chat</h3>
                            <p>Share messages in the chat channel.</p>
                        </div>
                        <div className="how-4">
                            <h3>Plan Your Date!</h3>
                            <p>Visit our places page for a list of dog-friendly places to go. Then, save your favorites to your list!</p>
                        </div>
                    </div>

                </div>
                
            </div>


        </div>
        <Footer/>
        </>
    )
}

export default Demo
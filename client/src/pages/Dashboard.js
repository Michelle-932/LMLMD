import React from 'react'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('https://lmlmd-aaf8048793e5.herokuapp.com/user', {
                params: { userId }
            })
            console.log("Response from /user:", response.data)
            setUser(response.data)
            console.log("Updated user state:", user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])


    return (
        <>
        { user && 
            <>
            <Nav
            minimal={true}
            setShowModal={() => { } }
            showModal={false} />

            <div className="dashboard-container">

                <div className="dashboard-card">

                    <h1 className="page-title">Welcome</h1>

                    <Link to="/mymatches"><button className="dashboard-button button1">My Matches</button></Link>
                    <Link to="/chatpage"><button className="dashboard-button button2">Chat</button></Link>
                    <Link to="/myplaces"><button className="dashboard-button button3">My Places</button></Link>
                    <Link to="/myprofile"><button className="dashboard-button button4">My Profile</button></Link>

                </div>

            </div>
            <Footer/>

            </>
        }
        </>
    )


}

export default Dashboard
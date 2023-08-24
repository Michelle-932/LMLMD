import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import CalculatedAge from '../components/CalculatedAge'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const MyProfile = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId
    
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: {gender: user?.gender_interest}
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnboardingClick = () => {
        navigate('/onboarding')
    }

    console.log(user)

    return (
        <>
        {user &&
            <>
            <Nav />
            <div className="profile-page">
                <div className="profile-head">
                    <h1 className="page-title">My Profile</h1>
                    <p>This is your profile as it looks to other users. Click below to update your profile. </p>
                    <p><em><b>Please note:</b> If you update your profile, it will erase your matches & you'll start over.</em></p>
                    <button className="secondary-button" onClick={handleOnboardingClick}>Update My Profile</button>
                    <h2>{user.first_name}, <CalculatedAge dob_year={user.dob_year} dob_month={user.dob_month} dob_day={user.dob_day} /></h2>
                    <h2>{user.location}</h2>
                    <p>"{user.about}"</p>
                </div>

                <h4>More about me:</h4>
                <p>{user.aboutlong}</p>
                <div className="profile-pic-main">
                    <img src={user.url} alt={user.first_name + ' profile'} />
                </div>
            </div>
            </>
        }
        <Footer/>
        </>
    )
}

export default MyProfile
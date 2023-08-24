import CalculatedAge from './CalculatedAge'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const ProfileModal = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('https://kind-jade-katydid-tie.cyclic.cloud/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('https://kind-jade-katydid-tie.cyclic.cloud/gendered-users', {
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
            await axios.put('https://kind-jade-katydid-tie.cyclic.cloud/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user)

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

    return (
        <>
        {user &&
            <div className="profile">
                <div className="profile-head">
                    <h1>{genderedUser.first_name + 's'} Profile</h1>
                    <h2>{genderedUser.first_name}, <CalculatedAge dob_year={genderedUser.dob_year} dob_month={genderedUser.dob_month} dob_day={genderedUser.dob_day} /></h2>
                    <h3>{genderedUser.location}</h3>
                </div>

                <h4>{genderedUser.about}</h4>
                <h4>More about {genderedUser.first_name}:</h4>
                <p>{genderedUser.first_name.aboutlong}</p>
                <div>
                    <img src={genderedUser.url} alt ={genderedUser.first_name + ' s profile'}/>
                </div>
            </div>
        }
        </>
    )
}


export default ProfileModal
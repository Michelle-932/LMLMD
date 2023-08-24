import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import ChatContainer from '../components/ChatContainer'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const ChatPage = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [foundUsers, setFoundUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

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

    // const getGenderedUsers = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/gendered-users', {
    //             params: {gender: user?.gender_interest}
    //         })
    //         setGenderedUsers(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getFoundUsers = async () => {
        try {
            const response = await axios.get('https://kind-jade-katydid-tie.cyclic.cloud/mutual-gender-matches', {
                params: {
                    gender: user?.gender_identity, 
                    genderInterest: `${user?.gender_interest.men ? 'men,' : ''}${user?.gender_interest.women ? 'women,' : ''}${user?.gender_interest.nonBinary ? 'nonBinary' : ''}`
                }
            })
            setFoundUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getFoundUsers()
        }
    }, [user])

    // useEffect(() => {
    //     if (user) {
    //         getGenderedUsers()
    //     }
    // }, [user])

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

    const filteredFoundUsers = foundUsers?.filter(user => !matchedUserIds.includes(user.user_id))



    return (
        <>
        { user && 
            <>
                <div className="chatPage">         
                    <Nav />
                    <h3 className="page-title">Chat</h3>
                    <p>Click a match's name below to chat with them!</p>
                    <div>
                        <ChatContainer user={user}/>
                    </div> 
                    <Footer />
                </div>
            </>
        }   
        </> 
    )
}

export default ChatPage
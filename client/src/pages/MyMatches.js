import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import Nav from '../components/Nav'
import ProfileContainer from '../components/ProfileContainer'
import axios from 'axios'
import CalculatedAge from '../components/CalculatedAge'
import Footer from '../components/Footer'

const MyMatches = () => {
    const [user, setUser] = useState(null)
    const [foundUsers, setFoundUsers] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    // const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            console.log("Response from /user:", response.data)
            setUser(response.data)
            console.log("Updated user state:", user)
        } catch (error) {
            console.log(error)
        }
    }

    const getFoundUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/mutual-gender-matches', {
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

    console.log(user)


  
    const swiped = (direction, swipedUserId) => {
      if (direction === 'right') {
        updateMatches(swipedUserId)
      }
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

    
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredFoundUsers = foundUsers?.filter(user => !matchedUserIds.includes(user.user_id))
    // const selectedUser = filteredFoundUsers && filteredFoundUsers[selectedUserIndex];

    // const swipe = (direction) => {
    //     const selectedUser = filteredFoundUsers[selectedUserIndex]
    //     if (selectedUser) {
    //         if (direction === 'right') {
    //             updateMatches(selectedUser.user_id)
    //         }
    //         setLastDirection(direction)
    //     }
    // }



    // //to add swipe buttons:
    // const handleSwipeRight = () => {
    //     updateMatches(selectedUser.user_id);
    //     setSelectedUserIndex(selectedUserIndex + 1);
    // };
    
    // const handleSwipeLeft = () => {
    //     setSelectedUserIndex(selectedUserIndex + 1);
    // };
    
    // const handleSwipeUp = () => {
    //     setSelectedUserIndex(selectedUserIndex + 1);
    // };

    return (
        <>
        {user && (
            <>
            <Nav
                minimal={true}
                setShowModal={() => { } }
                showModal={false} />
            <div className="matchPage">
                
                <div className="swipe-container">
                    <h1 className="page-title">My Matches</h1>
                    <div className="card-container">
                            {filteredFoundUsers && filteredFoundUsers.length > 0 ? (
                                filteredFoundUsers.map((user) => (
                                <TinderCard 
                                    className="swipe" 
                                    key={user.user_id} 
                                    onSwipe={(dir) => swiped(dir, user.user_id)} 
                                    onCardLeftScreen={() => outOfFrame(user.first_name)}>
                                    <div 
                                        style={{ backgroundImage: 'url(' + user.url + ')' }} 
                                        className="card">
                                        <div className="card match-info">
                                            <h2>
                                                {user.first_name},{' '}
                                                <CalculatedAge 
                                                dob_year={user.dob_year} 
                                                dob_month={user.dob_month} 
                                                dob_day={user.dob_day} 
                                                />
                                            </h2>
                                            <h3>"{user.about}"</h3>
                                        </div>
                                    </div>
                                </TinderCard>
                                ))
                                ) : (
                                    <p>You have no new matches.</p>
                            )}
                    </div>
                    <div className="swipe-instructions">
                        <p>Swipe RIGHT to add them to your list of matches!</p>
                        <p>Swipe LEFT to never see them again.</p>
                        <p>Swipe UP if you're not sure.</p>
                        <p><i>Buttons coming soon!</i></p>
                    </div>
                    {/* {selectedUser && (
                        <div className="swipe-buttons">
                            <button onClick={handleSwipeLeft}>Swipe Left</button>
                            <button onClick={handleSwipeUp}>Swipe Up</button>
                            <button onClick={handleSwipeRight}>Swipe Right</button>
                        </div>
                    )} */}
                    
                    <ProfileContainer user={user}/>
                    
                </div>
            </div>
            <Footer/>
            </>
        )}
        </>
    )

}

export default MyMatches
import ProfileHeader from './ProfileHeader'
import MatchesDisplay from './MatchesDisplay'
import ProfileDisplay from './ProfileDisplay'
import {useState} from 'react'

const ProfileContainer = ({user}) => {
    const [clickedUser, setClickedUser] = useState(null)

    return (
        <div className="chat-container">
            <ProfileHeader user={user}/>
            
            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Profile</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

            {clickedUser && <ProfileDisplay user={user} clickedUser={clickedUser}/>}
        </div>
    )
}

export default ProfileContainer
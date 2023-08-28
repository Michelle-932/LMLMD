import axios from 'axios'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'

const MatchesDisplay = ({matches, setClickedUser, user}) => {

    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const matchedUserIds = matches.map(({user_id}) => user_id)
    const userId = cookies.UserId

    const getMatches = async () => {
        try {
            const response = await axios.get('https://lmlmd-aaf8048793e5.herokuapp.com/users', {
                params: {userIds: JSON.stringify(matchedUserIds)}
            })
            console.log("Response from /users:", response.data)
            setMatchedProfiles(response.data)
            console.log("Updated matchedProfiles state:", matchedProfiles)
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log("matchedUserIds:", matchedUserIds)
 

    useEffect(() => {
        getMatches()
    }, [matches])

    console.log(matchedProfiles)

    const filteredMatchedProfiles = matchedProfiles?.filter(
        (matchedProfile) => 
            matchedProfile.matches.filter((profile) => profile.user_id == userId).length > 0
    )
    console.log("filteredMatchedProfiles:", filteredMatchedProfiles)

    return (
        <>
        {user !== null && ( 
            <>
            <div className="matches-display">
                {matchedProfiles?.map((match, _index) => (
                    <div key = {match.user_id} className="match-card" onClick={() => setClickedUser(match)}>
                        <div className="img-container">
                            <img src={match?.url} alt ={match?.first_name + ' profile'}/>
                        </div>
                        <h3>{match?.first_name}</h3>
                    </div>
                ))}
                
            </div>
            </>
        )}
        </>
    )
}

export default MatchesDisplay
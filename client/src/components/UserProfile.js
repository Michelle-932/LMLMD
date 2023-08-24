import {useState} from 'react'
import CalculatedAge from './CalculatedAge';

const UserProfile = ({userProfile}) => {
    const {first_name, about, aboutlong, dob_year, dob_month, dob_day, url, location} = userProfile;
    // const userId = user?.user_id;
    // const clickedUserId = clickedUser?.user_id;
    // const [clickedUsersProfile, setClickedUsersProfile] = useState(null);

    return (
        <>
            {userProfile &&
                <div className="user-profile-container">
                    <div>
                        <h2>{first_name}, <CalculatedAge dob_year={dob_year} dob_month={dob_month} dob_day={dob_day} /></h2>
                        <h3>{location}</h3>
                    </div>

                    <h4>About Me:</h4>

                    <p>{aboutlong}</p>
                    <div className="profile-pic-main">
                        <img src={url} alt={first_name + ' profile'} />
                    </div>
                </div>
            }
        </>
    );

};

export default UserProfile;
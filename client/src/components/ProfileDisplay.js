import {useState, useEffect} from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import {useCookies} from 'react-cookie'

const ProfileDisplay = ({ user, clickedUser }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [clickedUsersProfile, setClickedUsersProfile] = useState(null);

    const userId = cookies.UserId
    const clickedUserId = clickedUser?.user_id;


  const getClickedUsersProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: clickedUserId },
      });
      setClickedUsersProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the clicked user's profile when the component mounts
  useEffect(() => {
    getClickedUsersProfile();
  }, []);

  return (
    <div className="clicked-user-profile">
      {clickedUsersProfile && <UserProfile userProfile={clickedUsersProfile} />}
    </div>
  );
};

export default ProfileDisplay;

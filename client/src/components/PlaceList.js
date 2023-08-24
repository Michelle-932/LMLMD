import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'

const PlaceList = () => {
  const [placesByMetro, setPlacesByMetro] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(null)

  useEffect(() => {
    // Fetch data from the backend API
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://kind-jade-katydid-tie.cyclic.cloud/places-by-metro'); 
        setPlacesByMetro(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaces();
  }, []);

  const [savedPlaces, setSavedPlaces] = useState([]);

  //function to toggle saved status of a place
  const toggleSavedStatus = async (placeId) => {
    if (savedPlaces.includes(placeId)) {
      setSavedPlaces(savedPlaces.filter((id) => id !== placeId));
    } else {
      setSavedPlaces([...savedPlaces, placeId]);
    }
  
    try {
      // Make a POST request to your backend API to update the user's saved places
      await axios.post('https://kind-jade-katydid-tie.cyclic.cloud/save-places', {
        userId: cookies.UserId, 
        savedPlaces: savedPlaces.includes(placeId) ? savedPlaces.filter((id) => id !== placeId) : [...savedPlaces, placeId]
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {placesByMetro.map((metro) => (
        <div key={metro._id}>
          <h2>{metro.place_metro}</h2>
          <ul className="place-list">
            {metro.places.map((place) => (
              <li key={place._id}>
                <h3 className="place-title">{place.place_name}</h3>
                <p>{place.place_street}</p>
                <p>{place.place_city}{', '}{place.place_state}{' '}{place.place_zip}</p>
                <p><a href={place.place_url}>Website</a></p>
                <p>{place.place_about}</p>
                <span
                  onClick={() => toggleSavedStatus(place._id)}
                  style={{ cursor: 'pointer', color: savedPlaces.includes(place._id) ? 'red' : 'gray ' }}
                >
                  ❤️
                </span>
                {savedPlaces.includes(place._id) ? <span>Saved to My Places</span> : <span>Save to My Places</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlaceList;

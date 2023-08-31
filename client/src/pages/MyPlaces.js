import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Nav from '../components/Nav'
import {Link} from 'react-router-dom'
import Footer from '../components/Footer'


const MyPlaces = ({saved_places}) => {
  const [cookies] = useCookies(['userId'])
  const [savedPlacesIds, setSavedPlaces] = useState([])
  const userId = cookies.UserId

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try { 
        console.log("fetching saved places for userID:", userId)
        const response = await axios.get(`https://lmlmd-aaf8048793e5.herokuapp.com/save-places?userId=${userId}`)
        const data = response.data
        console.log("Response data:", data)
        setSavedPlaces(response.data)
      } catch (error) {
        console.error('Error fetching saved places:', error)
      }
    }
  
    fetchSavedPlaces()
  }, [])



  return (
    <div>


        <Nav />

        <div className="place-hero">
                <h1 className="primary-title">Love Me, Love My Dog</h1>
                <h3 className="demo-title">"Dating is rough. Bring your dog!"</h3>
        </div>
        <div className="place-container">
          <div className="place-container-2">
            <h2 className="page-title">My Places</h2>
            <h3>Now that you've met your match, plan a fun, dog-friendly date!</h3>
            <h4>Don't see anything? <Link to="/places">Find a place to save to your list.</Link></h4>
            <h4>Know a great place? <Link to="/placesubmit">Submit one here.</Link></h4>
            <span>Be sure to follow these <a href="https://www.rainn.org/articles/online-dating-and-dating-app-safety-tips" target="_blank" rel="noopener noreferrer">tips for dating safely.</a></span>
          </div>
        </div>

        <div className="placeList">
          <ul>
            {savedPlacesIds.map((place) => (
              <li key={place._id}>
                <h3 className="place-title">{place.place_name}</h3>
                <p>{place.place_street}</p>
                <p>
                  {place.place_city}, {place.place_state} {place.place_zip}
                </p>
                <p><a href={place.place_url}>Website</a></p>
                <p>{place.place_about}</p>
              </li>
            ))}
          </ul>
        </div>

      <Footer/>
    </div>
  );
};

export default MyPlaces


  // const fetchSavedPlaces = async () => {
  //   try {
  //     const response = await axios.get(`https://lmlmd-aaf8048793e5.herokuapp.com/save-places?userId=${userId}`)

  //     setSavedPlaces(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  // useEffect(() => {
  //   fetchSavedPlaces()
  // }, [userId])
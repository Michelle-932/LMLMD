import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import PlaceSubmit from './pages/PlaceSubmit'
import MyProfile from './pages/MyProfile'
import MyMatches from './pages/MyMatches'
import ChatPage from './pages/ChatPage'
import Places from './pages/Places'
import MyPlaces from './pages/MyPlaces'
import Demo from './pages/Demo'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const App = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const authToken = cookies.AuthToken


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
          {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
          {authToken && <Route path="/placesubmit" element={<PlaceSubmit/>}/>}
          {authToken && <Route path="/myprofile" element={<MyProfile/>}/>}
          {authToken && <Route path="/mymatches" element={<MyMatches/>}/>}
          {authToken && <Route path="/chatpage" element={<ChatPage/>}/>}
          {authToken && <Route path="/places" element={<Places/>}/>}
          {authToken && <Route path="/myplaces" element={<MyPlaces/>}/>}
          {authToken && <Route path="/demo" element={<Demo/>}/>}



      </Routes>
    </BrowserRouter>
  )
}

export default App
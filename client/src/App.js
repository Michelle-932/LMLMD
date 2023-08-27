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
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/placesubmit" element={<PlaceSubmit />} />
        {authToken && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/mymatches" element={<MyMatches />} />
            <Route path="/chatpage" element={<ChatPage />} />
            <Route path="/places" element={<Places />} />
            <Route path="/myplaces" element={<MyPlaces />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
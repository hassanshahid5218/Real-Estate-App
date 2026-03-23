import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import CreateListing from './pages/createListing'
import UpdateListing from './pages/updateListing'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import Listing from './pages/Listing'
export default function App() {
  return (
  <>  
      
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/sign-in' element={<Signin />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/create-listing' element={<CreateListing />}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </>
  )
}

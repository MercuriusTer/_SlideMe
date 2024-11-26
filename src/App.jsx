import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'
import LayoutLogin from './layouts/LayoutLogin/LayoutLogin'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import Home from './pages/Home/Home'

import SaveLocation1 from './pages/SaveLocation/SaveLocation1'
import EditLocation1 from './pages/EditLocation/EditLocation1'
import SaveLocation2 from './pages/SaveLocation/SaveLocation2'
import EditLocation2 from './pages/EditLocation/EditLocation2'
import SaveLocationP from './pages/SaveLocation/SaveLocationP'
import EditLocationP from './pages/EditLocation/EditLocationP'


import RequestOrder from './pages/RequestOrder/RequestOrder'
import OfferChoice from './pages/OfferChoice/OfferChoice'
import ProcessPayment from './pages/ProcessPayment/ProcessPayment'
import ProcessWorking from './pages/ProcessWorking/ProcessWorking'
import ProcessDone from './pages/ProcessDone/ProcessDone'

// import fetchOrder from './data/order'
import List from './pages/List/List'

import Notification from './pages/Notification/Notification'

import Profile from './pages/Profile/Profile'
import Payment from './pages/Profile/Payment/Payment'
import EditProfile from './pages/Profile/EditProfile/EditProfile'
import Setting from './pages/Profile/Setting/Setting'

import useLocationData from './data/LocationData';
import useOrderData from './data/OrderData';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'

// BrowserRouter, HashRouter, MemoryRouter
// localhost:5174/<path>    <- BrowserRouter ***nginx
// localhost:5174/#/<path>  <- HashRouter *** compatable
// localhost:5174/<path>    <- MemoryRouter

// App -> Layout -> Navbar
// tab 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // This state will hold the user ID, and will be updated when loggedInUser changes
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  // useEffect to update loggedInUserID and other dependent data when loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setLoggedInUserID(loggedInUser.userID);
      setProfileData(loggedInUser.informProfile);
      setPaymentMethods(loggedInUser.paymentMethods);
      setSelectPosition1([])
      setSelectPosition2([])
    }
  }, [loggedInUser]);

  const { ordersList, addOrders, updateOrders, deleteOrders } = useOrderData(loggedInUserID);
  const { locations, addLocation, updateLocation, deleteLocation } = useLocationData(loggedInUserID);

  const [selectPosition1, setSelectPosition1] = useState([]);
  const [selectPosition2, setSelectPosition2] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);
  const [currentShowOrder, setCurrentShowOrder] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState(loggedInUser ? loggedInUser.paymentMethods : []);
  const [profileData, setProfileData] = useState(loggedInUser ? loggedInUser.informProfile : []);

  // Default Payment Method
  const defaultPaymentMethod = paymentMethods.find((method) => method.isDefault === true);

  return (
    <div className='App-container'>
      <HashRouter>
        <Routes>
          {!loggedInUser ?
            (
              <Route element={<LayoutLogin />} >
                <Route path={'/'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/home'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/login'} element={<Login onLogin={handleLogin} />} />
                <Route path={'/signup'} element={<Register onLogin={handleLogin} />} />
              </Route>

            ) :
            (

              <Route element={<Layout />}>

                <Route path={'/'} element={<Home
                  selectPosition1={selectPosition1}
                  selectPosition2={selectPosition2}
                />}
                />
                <Route path={'/home'} element={<Home
                  selectPosition1={selectPosition1}
                  selectPosition2={selectPosition2}
                />}
                />

                <Route path={'/home/save-location1'} element={<SaveLocation1
                  locations={locations}
                  addLocation={addLocation}
                  deleteLocation={deleteLocation}
                  setSelectPosition1={setSelectPosition1}
                  setSelectPosition2={setSelectPosition2}
                />}
                />
                <Route path={'/home/save-location1/edit-location1'} element={<EditLocation1
                  locations={locations}
                  addLocation={addLocation}
                  updateLocation={updateLocation}
                />}
                />
                <Route path={'/home/save-location2'} element={<SaveLocation2
                  locations={locations}
                  addLocation={addLocation}
                  deleteLocation={deleteLocation}
                  setSelectPosition1={setSelectPosition1}
                  setSelectPosition2={setSelectPosition2}
                />}
                />
                <Route path={'/home/save-location2/edit-location2'} element={<EditLocation2
                  locations={locations}
                  addLocation={addLocation}
                  updateLocation={updateLocation}
                />}
                />

                <Route path={'/home/request-order'} element={<RequestOrder
                  selectPosition1={selectPosition1}
                  selectPosition2={selectPosition2}
                />} />

                <Route path={'/home/offer-choice'} element={<OfferChoice
                  selectPosition1={selectPosition1}
                  selectPosition2={selectPosition2}
                  selectedOffer={selectedOffer}
                  setSelectedOffer={setSelectedOffer}
                />} />

                <Route path={'/list'} element={<List
                  ordersList={ordersList}
                  deleteOrders={deleteOrders}
                  setCurrentShowOrder={setCurrentShowOrder}
                />} />

                <Route path={'/list/process-payment'} element={<ProcessPayment
                  selectedOffer={selectedOffer}
                  addOrders={addOrders}
                  defaultPaymentMethod={defaultPaymentMethod}
                  setCurrentShowOrder={setCurrentShowOrder}
                />} />

                <Route path={'/list/process-working'} element={<ProcessWorking
                  ordersList={ordersList}
                  currentShowOrder={currentShowOrder}
                />} />

                <Route path={'/list/process-done'} element={<ProcessDone
                  currentShowOrder={currentShowOrder}
                  updateOrders={updateOrders}
                  setCurrentShowOrder={setCurrentShowOrder}
                />} />

                <Route path={'/profile'} element={<Profile
                  username={loggedInUser.user}
                />} />
                <Route path={'/profile/edit-profile'} element={<EditProfile
                  loggedInUserID={loggedInUserID}
                  profileData={profileData}
                  setProfileData={setProfileData}
                  username={loggedInUser.user}
                />} />
                <Route path={'/profile/payment'} element={<Payment
                  loggedInUserID={loggedInUserID}
                  paymentMethods={paymentMethods}
                  setPaymentMethods={setPaymentMethods}
                />} />

                <Route path={'/profile/save-location'} element={<SaveLocationP
                  locations={locations}
                  addLocation={addLocation}
                  deleteLocation={deleteLocation}
                />}
                />
                <Route path={'/profile/save-location/edit-location'} element={<EditLocationP
                  locations={locations}
                  addLocation={addLocation}
                  updateLocation={updateLocation}
                />}
                />
                <Route path={'/profile/setting'} element={<Setting
                  setLoggedInUser={setLoggedInUser} />} />

                <Route path={'/notification'} element={<Notification />} />
              </Route>

            )}
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;

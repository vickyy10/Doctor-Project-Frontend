
import './App.css'
import UserLogin from './Components/Pages/UserLogin'
import UserRegistration from './Components/Pages/UserRegistration'
import UserHome from './Components/Pages/UserHome'
import UserProfile from './Components/Pages/UserProfile'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/Pages/NavBar'
import ProfileEdit from './Components/Pages/ProfileEdit'
import DoctorProfileEdit from './Components/Pages/DoctorProfileEdit'
import AdminPanel from './Components/Pages/AdminPanel'



function App() {
 
  return (
    <div className='App'>
  
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path="/" element={<UserRegistration/>}></Route>
        <Route path="/Login" element={<UserLogin/>}></Route>
        <Route path="/home" element={<UserHome/>}></Route>
        <Route path="/profile" element={<UserProfile/>}></Route>
        <Route path="/profiledit/:id" element={<ProfileEdit />} />
        <Route path="/doctorprofiledit/:id" element={<DoctorProfileEdit />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
       
      </Routes>
     
    </div>
  )
}

export default App

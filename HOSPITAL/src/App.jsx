
import './App.css'
import UserLogin from './Components/Pages/UserLogin'
import UserRegistration from './Components/Pages/UserRegistration'
import UserHome from './Components/Pages/UserHome'
import UserProfile from './Components/Pages/UserProfile'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Route, Routes } from 'react-router-dom';



function App() {
 
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<UserRegistration/>}></Route>
        <Route path="/Login" element={<UserLogin/>}></Route>
        <Route path="/home" element={<UserHome/>}></Route>
        <Route path="/profile" element={<UserProfile/>}></Route>
      </Routes>
    </div>
  )
}

export default App

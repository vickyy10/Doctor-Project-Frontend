import {React,useState,useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfileEdit = () => {
const [Data, setData] = useState('');
const { id }=useParams()
const inputref=useRef()
const nav=useNavigate()
const {JWToken,user}=useContext(AuthContext)


  
useEffect(() => {
  if (user.is_doctor) {
    
    nav('/home')
  }else if(user.is_admin){
    nav('/adminpanel')
  }else{

    fetchData();
  }
  
}, [id]);
  
const fetchData = async () => {

      
    try {
        const response = await axios.get(`http://127.0.0.1:8000/UserProfile/`, {
          headers: {
            Authorization: `Bearer ${JWToken.access}`,
          },
        });
        setData(response?.data);
        console.log(response?.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };



    const edituser= async (name,email)=>{

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/UserProfile/`,{name:name,email:email},{
              headers: {
                Authorization: `Bearer ${JWToken.access}`,
              },
            })
            setData(response?.data);
            console.log(response?.data);
            nav('/home')
            
             // Set the data into the state
          } catch (error) {
            console.error('Error fetching data:', error);
          }

    }


    const submithandler=(e)=>{
        e.preventDefault()
        let name=inputref.current.name.value
        let email=inputref.current.email.value
        edituser(name,email)
    }


  return (

    <div>
      <img style={{width:"100%",height:"100vh",position:"absolute",zIndex:"-1",backdropFilter:"1px",filter:"brightness(0.5)"}} src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg" alt="" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 style={{padding:"10px"}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white  bg-black">
            edit profile
          </h2>
        </div>

        <div style={{padding:"30px",backdropFilter:"blur(20px)"}} className=" sm:mx-auto sm:w-full sm:max-w-sm ">
          <form ref={inputref}  onSubmit={submithandler} method="POST" className="space-y-6">
            <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                
                  defaultValue={Data.name}
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  
                  defaultValue={Data.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  save
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ProfileEdit

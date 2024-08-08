import React, { useRef } from 'react'
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserRegistration = () => {

  const nav=useNavigate()

  const inputref=useRef(null)

  const RegistrationAPI = async (name,email,Password,Cpassword,is_doctor)=>{
    
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/UserRegistration/', {name:name,email:email,password:Password,confirmpassword:Cpassword,is_doctor:is_doctor});
      console.log(response.data);
      toast.success('Registration Successfull')
      nav('/Login')
    } catch (error) { 
      const errorMessage = error.response?.data?.email?.[0] || error.response?.data?.non_field_errors?.[0];
    toast.error(errorMessage);
    }
  }

  
  
  const submitHandler= (e)=>{
    
    e.preventDefault();
    let name=inputref.current.name.value
    let email=inputref.current.email.value
    let Password=inputref.current.password.value
    let Cpassword=inputref.current.Cpassword.value
    let is_doctor=document.getElementById("isDoctor").checked
    
    
   
    RegistrationAPI(name,email,Password,Cpassword,is_doctor)
  }

  return (
    <div>
      <img style={{width:"100%",height:"100vh",position:"absolute",zIndex:"-1",backdropFilter:"1px",filter:"brightness(0.5)"}} src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg" alt="" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 style={{padding:"10px"}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white  bg-black">
            Sign Up 
          </h2>
        </div>

        <div style={{padding:"30px",backdropFilter:"blur(20px)"}} className=" sm:mx-auto sm:w-full sm:max-w-sm ">
          <form ref={inputref} onSubmit={submitHandler} action="#" method="POST" className="space-y-6">
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
                  required
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
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="Cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="Cpassword"
                    name="Cpassword"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="isDoctor"
                  name="isDoctor"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isDoctor"  className="ml-2 block text-sm text-gray-900">
                  Are you a doctor?
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
                <br></br>
                Already have an acount? <Link to='/Login' >Login</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration

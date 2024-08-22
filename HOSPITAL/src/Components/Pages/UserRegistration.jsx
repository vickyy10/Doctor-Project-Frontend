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
    <>
    <div style={{width:"100%",height:"100vh"}}>
      <img style={{width:"100%",height:"100vh",position:"absolute",zIndex:"-1",backdropFilter:"1px",filter:"brightness(0.5)"}} src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg" alt="" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 style={{padding:"10px"}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white  bg-black">
            Sign Up 
          </h2>
        </div>

        <div style={{padding:"30px",backdropFilter:"blur(20px)"}} className=" sm:mx-auto sm:w-full sm:max-w-sm ">
          <form ref={inputref} onSubmit={submitHandler} action="#" method="POST" className="space-y-6">
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder='Enter name'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
      <br />
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Enter email adress'
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
              
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder='Password'
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <br />
                <div className="mt-2">
                  <input
                    id="Cpassword"
                    name="Cpassword"
                    type="password"
                    placeholder='Confirm Password'
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
                <label style={{color:"white"}} htmlFor="isDoctor"  className="ml-2 block text-sm text-gray-900">
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
                <p style={{color:"white"}} >Already have an acount? <Link style={{color:"blue"}} to='/Login' >Login</Link> </p>
              </div>
          </form>
        </div>
      </div>
    </div>

    {/* ========================================== */}

    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
  {/* Background Divs */}
  <div className="absolute top-0 left-0 w-[60%] h-full bg-blue-100 "></div>
  <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-800"></div>
  <div className="absolute top-0 left-0 w-[60%] h-full bg-blue-800 rounded-tr-[300px]"></div>
  <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-100 rounded-bl-[200px]"></div>
  
  {/* Main Container */}
  <div className="relative z-10 w-[70%] h-[80vh] rounded-[40px] flex shadow-lg">
    {/* Left Side */}
    <div className=" hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-blue-300  items-center justify-center rounded-tl-[40px] rounded-bl-[40px] relative overflow-hidden">
      <img
        src="https://static.vecteezy.com/system/resources/previews/006/781/334/large_2x/young-asian-female-doctor-standing-on-blue-background-free-photo.JPG"
        alt="Doctor"
        className="w-full h-full object-cover rounded-tl-[40px] rounded-bl-[40px]"
      />
    </div>

    {/* Right Side */}
    <div className="w-1/2 bg-blue-40 backdrop-blur-md flex flex-col justify-center items-center rounded-tr-[40px] rounded-br-[40px] p-8">
      <div className="w-3/4">
        {/* Sign Up / Sign In Toggle */}
        <div className="mb-8 flex justify-between">
          <span className="text-xl font-semibold text-gray-700">Sign Up</span>
          <span className="text-xl text-gray-400">Sign In</span>
        </div>

        {/* Sign Up Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <div className="text-center mt-6">
          <a href="#" className="text-blue-600">
            I have an Account?
          </a>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default UserRegistration

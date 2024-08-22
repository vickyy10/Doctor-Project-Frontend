import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  let { loginUser, user } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(()=>{
    if (user) {
      nav('/home')
    }  
  },[user,nav])

  return (
      <>
    <div style={{width:"100%",height:"100vh"}}>
        <img
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: "-1",
            backdropFilter: "1px",
            filter: "brightness(0.5)",
          }}
          src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg"
          alt=""
          />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={loginUser} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                  >
                  Email address
                </label>
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
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                    >
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
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <br />
                <p style={{ color: "white" }}>
                  dont have an account ?{" "}
                  <Link style={{ color: "blue" }} to={"/"}>
                    sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
    </div>
     
{/* ========================================== */}


    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
  {/* Background Divs */}
  <div className="absolute top-0 left-0  w-[40%] h-full  bg-blue-800 "></div>
  <div className="absolute top-0 right-0 w-[60%] h-full  bg-blue-200"></div>
  <div className="absolute top-0 left-0 h-full w-[40%]  bg-blue-200  rounded-br-[300px]"></div>
  <div className="absolute top-0 right-0  w-[60%]  h-full  bg-blue-800 rounded-tl-[200px]"></div>
  
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
        <div className="mb-8 flex justify-around">
          <button className="text-4xl   text-white "
          onClick={()=>nav('/')}>Sign Up</button>
          <button className="text-4xl font-semibold text-white border-b-4 border-blue-500 pb-1">Sign In</button>
        </div>
        {/* Sign Up / Sign In Toggle */}

        {/* Sign Up Form */}
        <form className="space-y-6">

          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white">Password</label>
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
         
                  </>
   
  );
};

export default UserLogin;

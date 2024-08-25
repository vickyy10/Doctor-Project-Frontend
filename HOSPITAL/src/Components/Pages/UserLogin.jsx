import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  let { loginUser, user } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav("/home");
    }
  }, [user, nav]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
        {/* Background Divs */}
        <div className="absolute top-0 left-0  w-[40%] h-full  bg-blue-800 "></div>
        <div className="absolute top-0 right-0 w-[60%] h-full  bg-blue-200"></div>
        <div className="absolute top-0 left-0 h-full w-[40%]  bg-blue-200  rounded-br-[300px]"></div>
        <div className="absolute top-0 right-0  w-[60%]  h-full  bg-blue-800 rounded-tl-[200px] "></div>

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
          <div className="w-1/2  backdrop-blur-md flex flex-col justify-center items-center rounded-tr-[40px] rounded-br-[40px] p-8">
            <div className=" w-3/4 mb-4 flex justify-around">
              <button
                className="text-4xl   text-white "
                onClick={() => nav("/")}
              >
                Sign Up
              </button>
              <button className="text-4xl font-semibold text-white border-b-4 border-blue-500 pb-1">
                Sign In
              </button>
            </div>
            <div className="w-3/4">
              {/* Sign Up / Sign In Toggle */}

              {/* Sign Up Form */}
              <form onSubmit={loginUser} className="space-y-6">
                <div>
                  <label className="block text-white">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
                >
                  Sign In
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

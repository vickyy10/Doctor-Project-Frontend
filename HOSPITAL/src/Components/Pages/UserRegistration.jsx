import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const UserRegistration = () => {
  const nav = useNavigate();

  const inputref = useRef(null);

  const RegistrationAPI = async (
    name,
    email,
    Password,
    Cpassword,
    is_doctor
  ) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/UserRegistration/",
        {
          name: name,
          email: email,
          password: Password,
          confirmpassword: Cpassword,
          is_doctor: is_doctor,
        }
      );
      console.log(response.data);
      toast.success("Registration Successfull");
      nav("/Login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.non_field_errors?.[0];
      toast.error(errorMessage);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let name = inputref.current.name.value;
    let email = inputref.current.email.value;
    let Password = inputref.current.password.value;
    let Cpassword = inputref.current.Cpassword.value;
    let is_doctor = document.getElementById("isDoctor").checked;

    RegistrationAPI(name, email, Password, Cpassword, is_doctor);
  };

  return (
    <>
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
          <div className="w-1/2 backdrop-blur-md flex flex-col justify-center items-center rounded-tr-[40px] rounded-br-[40px] p-8">
            <div className="w-3/4 mb-4 flex justify-around">
              <button className="text-4xl font-semibold text-white border-b-4 border-blue-500 pb-1">
                Sign Up
              </button>
              <button
                className="text-4xl text-white"
                onClick={() => nav("/Login")}
              >
                Sign In
              </button>
            </div>
            <div className="w-3/4">
              {/* Sign Up / Sign In Toggle */}

              {/* Sign Up Form */}
              <form
                ref={inputref}
                onSubmit={submitHandler}
                className="space-y-2"
              >
                <div>
                  <label className="block text-white">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                  />
                </div>

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

                <div>
                  <label className="block text-white">Confirm Password</label>
                  <input
                    name="Cpassword"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="isDoctor"
                    name="isDoctor"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    style={{ color: "white" }}
                    htmlFor="isDoctor"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Are you a doctor?
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { FaPhoneAlt, FaEnvelope, FaHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const nav = useNavigate();
  const baseurl = "http://127.0.0.1:8000/";
  let { name, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [doctor, Setdoctor] = useState(null);
  const { JWToken } = useContext(AuthContext);

  useEffect(() => {
    if (user?.is_doctor) {
      fetchDoctor();
    } else if (!user) {
      nav("/Login");
      console.log("hi");
    } else {
      fetchData();
    }
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/DoctorHome/`, {
        headers: {
          Authorization: `Bearer ${JWToken.access}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/userhome/", {
        headers: {
          Authorization: `Bearer ${JWToken.access}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(data, "dataa");

  return (
    <>
      <div>
        <img
          className="w-full h-screen absolute z-[-1] object-cover"
          src="https://t4.ftcdn.net/jpg/04/41/59/09/360_F_441590929_etTMfeX0o5uaX3w1bHtt4XAHB8J18NM1.jpg"
          alt=""
        />
        {user?.is_doctor ? (
          <div className="bg-[url('https://img.lovepik.com/photo/48014/5955.jpg_wh860.jpg')]  bg-cover bg-center p-10 h-screen w-screen">
            <div className="justify-center flex flex-wrap  ">
              <div className="backdrop-blur-3xl">
                <img
                  style={{
                    height: "615px",
                    width: "600px",
                    objectFit: "cover",
                  }}
                  src={`${baseurl + data?.image}`}
                  alt="Doctor"
                  className="md:w-1/2"
                />
                <div className="w-[600px] z-10backdrop-blur-md h-16">
                  <div className="text-4xl font-bold pl-36 pt-3 text-white tracking-wider">
                    Dr. {data?.name}
                  </div>
                </div>
              </div>
              <div className="bg-red-900">
                <div className="bg-blue-50 p-4 w-96">
                  <div
                    onClick={() => nav(`/doctorprofiledit`)}
                    className="pl-5 mt-3 text-xl font-bold cursor-pointer hover:text-blue-900 hover:scale-y-110 text-blue-500 tracking-wider"
                  >
                    EDIT PROFILE
                  </div>
                  <div className="text-4xl font-bold pl-5 pt-3 tracking-wider">
                    Dr. {data?.name}
                  </div>
                  <div className="text-2xl  pl-5 tracking-wider">
                    {data?.department}
                  </div>
                  <div className="pl-5 tracking-wider mt-3">
                    MS,M.Ch (surgery)
                  </div>
                  <div className="pl-5 tracking-wider">
                    {data?.hospital} hospital
                  </div>
                  <div className="pl-5 tracking-wider">adress</div>
                </div>
                <div className="bg-white">
                  <div className="text-blue-500 font-bold tracking-wider text-xl pl-10 pt-4">
                    EXPERIENCE
                  </div>
                  <div className="text-blue-500 tracking-wider font-bold text-xl pl-10 pt-3">
                    LAGUAGES{" "}
                  </div>
                  <div className="text-blue-500 tracking-wider font-bold text-xl pl-10 pt-3 pb-4">
                    EXPERIENCE
                  </div>
                </div>
                <div className="bg-blue-50 pb-4">
                  <div className="text-blue-500 tracking-wider font-bold text-xl pl-14  pb-3 pt-4">
                    CONTACT
                  </div>
                  <div className="info space-y- ml-14 pl-4 border-l-4 items-center border-blue-500">
                    <div className="flex items-center space-x-2 pl-2">
                      <p className=" tracking-wide"> +123-456-7890</p>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                      <p className=" tracking-wide"> {data?.email}</p>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                      <p className=" tracking-wide ">{data?.hospital}</p>
                    </div>
                  </div>

                  <div className="info space-y- ml-14 mt-4 pl-4 pb-1 border-l-4 items-center border-blue-500">
                    <div className="flex items-center space-x-2 pl-2">
                      <p className="text-lg tracking-wide"> {data?.email}</p>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                      <p className="text-lg tracking-wide ">{data?.hospital}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* <div className=' bg-red-700' ><button onClick={()=>nav(`/profiledit`)} >edit profile</button></div> */}
            <div className="flex flex-wrap justify-around items-center">
              {data?.map((data, index) => (
                <div className=" mx-auto h-[310px] w-[500px] bg-blue-200 m-10   rounded-md ">
                  <div className=" text-3xl font-bold mt-4 mb-3 pl-20 ">
                    DR. {data?.name}
                  </div>
                  <div className="header flex justify-between items-center mr-2 p-2 rounded-br-[110px] rounded-tr-[110px] bg-blue-500">
                    <div className="info space-y-3 pl-5">
                      <div className="flex items-center space-x-2">
                        <FaPhoneAlt className="w-6 h-6 text-white" />
                        <p className="text-lg text-white"> +123-456-7890</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="w-6 h-6 text-white" />
                        <p className="text-lg text-white"> {data?.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaHospital className="w-6 h-6 text-white" />
                        <p className="text-lg text-white"> {data?.hospital}</p>
                      </div>
                    </div>
                    <div className="circle w-40 h-40 rounded-full overflow-hidden relative">
                      <img
                        src={`${baseurl + data?.image}`}
                        alt="Doctor's Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="title text-2xl font-bold mt-4 ml-5">
                    {data?.department}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserHome;

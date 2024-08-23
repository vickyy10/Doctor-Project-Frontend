import React,{useContext,useEffect,useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

import { FaPhoneAlt, FaEnvelope, FaHospital  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const UserHome = () => {
  const nav=useNavigate()
  const baseurl='http://127.0.0.1:8000/'
  let {name,user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [doctor,Setdoctor]= useState(null)
  const {JWToken}=useContext(AuthContext)
  
  
  
useEffect(()=>{

  if (user?.is_doctor){
   
    
    fetchDoctor();
  }else if(!user){
    nav('/Login')
    console.log('hi');
  }
  else{
    fetchData() 
  }
},[])

  const fetchDoctor = async () => {
    
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/DoctorHome/`, {
        headers: {
          Authorization: `Bearer ${JWToken.access}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/userhome/', {
        headers: {
          Authorization: `Bearer ${JWToken.access}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(data,'dataa');
  

  return (
    <>
    <div  >
    
       <img style={{width:"100%",height:"100vh",position:"absolute",zIndex:"-1",backdropFilter:"1px",filter:"brightness(0.5)"}} src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg" alt="" />
      {user?.is_doctor ?(
      <div style={{padding:"150px"}}>

      <div className="p-5">
      <div style={{padding:"20px",backdropFilter: "blur(20px)"}} className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          style={{ height: "400px", width: "400px", objectFit: "cover",borderRadius:"10px" }}
          src={`${baseurl + data?.image}`}
          alt="Doctor"
          className="md:w-1/2"
          />
        <div
          style={{ backdropFilter: "blur(20px)" }}
          className="p-5 md:w-1/2 flex flex-col justify-between"
          >
          <div>
            <h1 className="text-2xl font-bold text-center">Name: {data.name}</h1>
            <div className="mt-4">
              <span className="text-lg font-medium">Department: {data.department}</span>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium">Hospital: {data.hospital}</h2>
            </div>
          </div>
          <div className="mt-8 md:mt-0 flex justify-center">
            <button
              onClick={() => nav(`/doctorprofiledit`)}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
              Edit Profile
            </button>
              </div>
          </div>
        </div>
      </div>
    </div>




)
:(
  <>
      {/* <div className=' bg-red-700' ><button onClick={()=>nav(`/profiledit`)} >edit profile</button></div> */}
      <div className='flex flex-wrap justify-around items-center'  >

        {data?.map((data,index) => (
          <div className=" mx-auto h-[310px] w-[500px] bg-blue-200 m-10   rounded-md shadow-md">
          <div className=" text-3xl font-bold mt-4 mb-3 pl-20 ">DR. {data?.name}</div>
            <div className="header flex justify-between items-center mr-2 p-2 rounded-br-[110px] rounded-tr-[110px] bg-blue-500">
              
            <div className="info space-y-3 pl-5">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="w-6 h-6 text-white" />
              <p className="text-lg text-white">  +123-456-7890</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-6 h-6 text-white" />
              <p className="text-lg text-white">  {data?.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaHospital className="w-6 h-6 text-white" />
              <p className="text-lg text-white">  {data?.hospital}</p>
            </div>
          </div>
              <div className="circle w-40 h-40 rounded-full overflow-hidden relative">
                <img src="https://as1.ftcdn.net/v2/jpg/02/60/04/08/1000_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg" alt="Doctor's Image" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="title text-2xl font-bold mt-4 ml-5">{data?.department}</div>
          </div>
         
        ))}
        </div>
     
      </>
)}
      
    </div>

   


</>

  )
};

export default UserHome;

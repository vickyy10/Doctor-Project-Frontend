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

  return (
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
      <div style={{display:"flex",justifyContent:"center"}} ><button onClick={()=>nav(`/profiledit`)} >edit profile</button></div>
      <div className="flex flex-wrap justify-center mt-8 w-full">
        {data?.map((data,index) => (
          <MDBCard key={index} className="max-w-sm mx-4 mb-6">
            <MDBCardImage src={`${baseurl+data?.image}`} position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>name : {data?.name}</MDBCardTitle>
              <MDBCardText>
                department:{data?.department}
                <br />
                hospital: {data?.hospital}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
         
        ))}
      </div>
      </>
)}
      
    </div>
  );
};

export default UserHome;

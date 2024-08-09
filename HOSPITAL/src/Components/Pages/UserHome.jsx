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
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const UserHome = () => {
  const nav=useNavigate()
  const baseurl='http://127.0.0.1:8000/'
  let {name,user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [doctor,Setdoctor]= useState(null)
  
  
  
useEffect(()=>{

  if (user.is_doctor){
   
    
    fetchDoctor();
  }else{
   
    
    fetchData()
  }
},[])

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/DoctorHome/${user.user_id}/`); // Adjust the URL to match your endpoint
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/userhome/'); // Adjust the URL to match your endpoint
      setData(response?.data);
       // Set the data into the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {user.is_doctor ?(
      
     <div>
      
      <img src={`${baseurl+data?.image}`} alt="" />
      <h1>name :{data.name} </h1>
      <h1>department : {data.departmet}</h1>
      <h1>hospital : {data.hospital}</h1>
      <button onClick={()=>nav(`/doctorprofiledit/${user.user_id}`)} >edit</button>
     </div>
      
      
      )
      :(
      <>
      <button onClick={()=>nav(`/profiledit/${user.user_id}`)} >edit profile</button>
      <div className="flex flex-wrap justify-center mt-8 w-full">
        {data?.map((data,index) => (
          <MDBCard key={index} className="max-w-sm mx-4 mb-6">
            <MDBCardImage src={`${baseurl+data?.image}`} position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>{data?.name}</MDBCardTitle>
              <MDBCardText>
                {data?.departmet}
                {data?.hospital}
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

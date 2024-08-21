import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const {JWToken,user}=useContext(AuthContext)
    const [cont,setcont]=useState(true)
    const nav=useNavigate()

    useEffect(() => {
      if (user?.is_admin) {
        
        fetchUsers();
        fetchDoctors();
      }else{
        nav('/home')
      }
    }, []);

    const fetchUsers = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/users/',{
                headers: {
                  Authorization: `Bearer ${JWToken.access}`,
                },
              });
            let data = await response.json();
            setUsers(data);
            
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/doctors/', {
                headers: {
                  Authorization: `Bearer ${JWToken.access}`,
                },
              });
            let data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
    const blockuser = async(id,is_active,email)=>{


        try {
            let response = await axios.patch(`http://127.0.0.1:8000/api/users/${id}/`,{
                "is_active":is_active,
                "email":email
            },{
                headers: {
                  Authorization: `Bearer ${JWToken.access}`,
                },
              });

            fetchUsers();
            fetchDoctors();
             
              
            
        } catch (error) {
            console.warn(error);
            
            console.error('Error fetching users:', error);
        }

    }

    const blockdoctor = async(id,is_active,email)=>{
        try {
            let response = await axios.patch(`http://127.0.0.1:8000/api/doctors/${id}/`,{
                "is_active":is_active,
                "email":email
            },{
                headers: {
                  Authorization: `Bearer ${JWToken.access}`,
                },
              });
              
            fetchUsers();
            fetchDoctors();
             
              
            
        } catch (error) {
            console.warn(error);
            
            console.error('Error fetching users:', error);
        }

    }
    console.log(doctors);
  return (

    <div className="p-4">

      <div className="flex flex-col md:flex-row gap-8">
        {/* Users List */}
        <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
          {users.length > 0 ? (
            <ul>
              <li className="font-bold mb-2">
                <span>ID</span> -------- <span>Name</span> -------- <span>Email</span>
              </li>
              {users.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.id} --- {user.name} --- {user.email}
                  {user.is_active ? (
                    <button
                      style={{ marginLeft: "20px" }}
                      className="cls-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      onClick={() => blockuser(user.id, false,user.email)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      style={{ marginLeft: "20px" }}
                      className="cls-btn bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                      onClick={() => blockuser(user.id, true,user.email)}
                    >
                      Unblock
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {/* Doctors List */}
        <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Doctors</h2>
          {doctors.length > 0 ? (
            <ul>
              <li className="font-bold mb-2">
                <span>ID</span> -------- <span>Name</span> -------- <span>Email</span>
              </li>
              {doctors.map((doctor) => (
                <li key={doctor.id} className="mb-2">
                  {doctor.id} --- {doctor.name} --- {doctor.email}
                  {doctor.is_active? (
                    <button
                      style={{ marginLeft: "20px" }}
                      className="cls-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      onClick={() =>{ 
                        blockdoctor(doctor.id, false,doctor.email);
                        setcont(false);}}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      style={{ marginLeft: "20px" }}
                      className="cls-btn bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                      onClick={() => {blockdoctor(doctor.id, true,doctor.email)
                        setcont(true)
                      }}
                    >
                      Unblock
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default AdminPanel

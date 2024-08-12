import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const {JWToken}=useContext(AuthContext)

    useEffect(() => {
        fetchUsers();
        fetchDoctors();
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
    const blockuser = async(id,is_active)=>{


        try {
            let response = await axios.patch(`http://127.0.0.1:8000/api/users/${id}/`,{
                "is_active":is_active
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
    <div>
       <div className="admin-panel">
            <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

            <div className="users-list mb-8">
                <h2 className="text-2xl font-bold mb-2">Users</h2>
                {users.length > 0 ? (
                    <ul>
                        <li>id------------name ------------email </li>
                        {users.map(user => (
                            <li key={user.id} className="mb-2">
                                id : {user.id} ---{user.name} --- {user.email}
                                {user.is_active? <button style={{marginLeft:"20px"}} className='cls-btn' onClick={()=>blockuser(user.id,false)} >block</button>:<button style={{marginLeft:"20px"}} className='cls-btn' onClick={()=>blockuser(user.id,true)} >unblock</button>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            <div className="doctors-list">
                <h2 className="text-2xl font-bold mb-2">Doctors</h2>
                {doctors.length > 0 ? (
                    <ul>
                        {doctors.map(doctor => (
                            <li key={doctor.id} className="mb-2">
                                Dr. {doctor.name} - {doctor.email}
                                {/* {doctor.user_id.is_active? <button style={{marginLeft:"20px"}} className='cls-btn' onClick={()=>blockdoctor(doctor.user_id,false)} >block</button>:<button style={{marginLeft:"20px"}} className='cls-btn' onClick={()=>blockuser(doctor.user_id,true)} >unblock</button>} */}
                               
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No doctors found.</p>
                )}
            </div>
        </div>


    </div>
  )
}

export default AdminPanel

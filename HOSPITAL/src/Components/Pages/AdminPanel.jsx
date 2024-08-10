import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchDoctors();
    }, []);

    const fetchUsers = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/users/');
            let data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/doctors/');
            let data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
  return (
    <div>
       <div className="admin-panel">
            <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

            <div className="users-list mb-8">
                <h2 className="text-2xl font-bold mb-2">Users</h2>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.id} className="mb-2">
                                {user.name} - {user.email}
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

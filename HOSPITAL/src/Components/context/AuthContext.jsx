import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import {toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

   
    let [JWToken,setJWToken]=useState(()=>localStorage.getItem('JWToken')? JSON.parse(localStorage.getItem('JWToken')):null)
    let [User,setUser] = useState(()=>localStorage.getItem('JWToken')? jwtDecode(localStorage.getItem('JWToken')):null)
    const nav=useNavigate()

    
    let LoginUser= async (e)=>{
        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/Login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){

            setJWToken(data)
            const decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                
                
            
            localStorage.setItem('JWToken',JSON.stringify(data))

            if (decodedUser.is_admin){
                nav('/adminpanel')

            }
            else{

                nav('/home')
            }

        }else{
            toast.error("somthing went wrong")
        }
        
    }
    

    let LogoutUser=()=>{

        setJWToken(null)
        setUser(null)
        localStorage.removeItem('JWToken')
        nav('/Login')

    }


    let updateToken= async ()=>{
        console.log('update token called ');
        console.log("refresh token :",JWToken.refresh);
        
        let response = await fetch('http://127.0.0.1:8000/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':JWToken.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            
            setJWToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('JWToken',JSON.stringify(data))
            console.log("toke updated");
            
            
        }else{
            
            LogoutUser()
        }

    }

    useEffect(()=>{

        let interval = setInterval(()=>{
            if(JWToken){
                console.log("useffect worked");
                
                updateToken()
            }
        },1000 * 60 * 4)
        return ()=> clearInterval(interval)
    },[JWToken])

    
    let contextData={
        user:User,
        loginUser:LoginUser,
        logoutUser:LogoutUser,
        JWToken:JWToken
    }

    
  return (

    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
   
  )
}

export default AuthProvider


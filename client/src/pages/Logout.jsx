import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";


export default function Logout() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    navigate("/", {state: { loginResponse: {token:"", user:{}}}});
  },[])

  return (
    <div>Logout</div>
  )
}

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../components/DataProvider/DataProvider"; 

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext); 

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { msg, redirect } });
    }
  }, []);

  
  if (!user) {
    return null; 
  }

  return children; 
};

export default ProtectedRoute;

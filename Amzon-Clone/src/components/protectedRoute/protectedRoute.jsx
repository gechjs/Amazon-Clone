import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../components/DataProvider/DataProvider"; 

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user, loading }] = useContext(DataContext); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      if (!user) {
        navigate('/auth', { state: { msg, redirect } });
      }
    }
  }, [loading, user, navigate, msg, redirect]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null; 
  }

  return children; 
};

export default ProtectedRoute;

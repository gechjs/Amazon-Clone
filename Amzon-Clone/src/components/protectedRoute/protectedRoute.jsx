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

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
};

export default ProtectedRoute;

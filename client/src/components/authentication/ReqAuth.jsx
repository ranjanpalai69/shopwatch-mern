import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ReqAuth({ children }) {
    const isLoggedIn = localStorage.getItem('loggedUser');
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}

export default ReqAuth;


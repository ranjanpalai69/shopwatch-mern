import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import getLoggedUserData from '../../utils/LoggedUserData';
import UnauthorizedAccess from './UnauthorizedAccess';

function ReqAuthSuperAdmin({children}) {
    let loggeduser = getLoggedUserData();
    const location = useLocation();
    if (!loggeduser) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    } else if (loggeduser.role === "superAdmin") {
        return children
    }
    return <UnauthorizedAccess accessPer="This is for Super Admin Only" />
}

export default ReqAuthSuperAdmin

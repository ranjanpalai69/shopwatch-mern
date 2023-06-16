
import { Navigate, useLocation } from "react-router-dom";
import getLoggedUserData from "../../utils/LoggedUserData";
import UnauthorizedAccess from "./UnauthorizedAccess";


function ReqAuthAdmin({ children }) {
    let loggeduser = getLoggedUserData();
    const location = useLocation();
    if (!loggeduser) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    } else if (loggeduser.role === "admin") {
        return children
    }
    return <UnauthorizedAccess accessPer="This is for Admin Only"/>
}

export default ReqAuthAdmin;


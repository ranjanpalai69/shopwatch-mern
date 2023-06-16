import React from 'react';
import styles from "./styles/unauthorise.module.css"
import { useNavigate } from "react-router-dom"
const UnauthorizedAccess = ({accessPer}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.__admin__unauthorized_access}>
      <h1>Unauthorized Access</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <p>{accessPer}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default UnauthorizedAccess;

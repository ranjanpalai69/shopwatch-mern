import React from 'react'
import styles from "./styles/expired.module.css"
import expiredImg from "../../assets/invalid.jpg"
import { useNavigate } from 'react-router-dom'
function ExpiredToken({loginMess}) {
    const navigate=useNavigate()
    return (
        <>
            <div className={styles.__expired__token} >
                <img src={expiredImg} alt="Token Expired" />
                <p>Token Expired Or Invalid</p>
                {loginMess?    <p> {loginMess} ? <span className={styles._expired_resend_token} onClick={()=>navigate("/login")} >Click here</span></p>:    <p>Re-send token ? <span className={styles._expired_resend_token} onClick={()=>navigate("/forgetPassword")} >Click here</span></p>
}
            
            </div>
        </>
    )
}

export default ExpiredToken

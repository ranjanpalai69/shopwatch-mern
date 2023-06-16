import React from 'react'
import styles from "./styles/top.module.css"


function TopSection({ data }) {

    return (
        <>
            <div className={styles["middle-top"]} >
                {data.map((el,index) => (
                    <div className={styles.__each_top_div} key={index} >
                        <div className={styles.__middle_top_title} >{el.title}</div>
                        <div>
                            <div>{el.icon}</div>
                            <div>{el.count}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TopSection
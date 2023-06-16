import React from 'react'
import styles from "./styles/noOrder.module.css"
function NoOrderFound() {
    return (
        <>
            <h1 className={styles.__no_order_head} >No order found</h1>
            <p>It seems that you haven't placed any orders yet. Please visit our <a href="/products">products</a>  page to browse our selection of products.</p>


        </>
    )
}

export default NoOrderFound
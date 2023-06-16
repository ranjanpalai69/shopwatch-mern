import React from 'react';
import styles from './styles/emptywishlist.module.css';
import emptyWislImg from "../../assets/emptywishlist.png"
import { useNavigate } from 'react-router-dom'
const EmptyWishlist = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.__empty__wishlist}>
            <img src={emptyWislImg} alt="Wishlist is empty" />
            <p>Your wishlist is empty.</p>
            <button className={styles.seeProductsButton} onClick={() => navigate("/products")}>Explore Products</button>
        </div>
    );
};

export default EmptyWishlist;


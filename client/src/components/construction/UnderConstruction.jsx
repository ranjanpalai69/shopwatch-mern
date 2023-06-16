import React from "react";
import constructImg from "../../assets/construction.png";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  const styles = {
    width: "100%",
    height: "70vh",
    backgroundColor: "#f7fdff",
  };

  const image = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const buttonStyle = {
    border: "1px solid black",
    display: "block",
    margin: "auto",
    fontSize: "20px",
    padding: "3px 25px",
    borderRadius: "5px",
    marginBottom: "30px",
    boxShadow: "rgba(0, 0, 0, 0.735) 0px 5px 15px",
  };

  return (
    <>
      <div style={styles}>
        <img src={constructImg} alt="underconstruction" style={image} />
      </div>
      <button style={buttonStyle}>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Go to Home
        </Link>
      </button>
    </>
  );
};

export default UnderConstruction;
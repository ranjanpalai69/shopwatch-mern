import React from "react";

import SliderComponent from "./SliderComponent";
import CategoriesSection from "./CategoriesSection";
import DocumentTitle from "../components/Helmet/Helmet";
import ProductCarousel from "../components/products/ProductCarousel";
function Home() {
  return (
    <>
      <DocumentTitle pageTitle="| HOME" />
      <>
        <SliderComponent />
      </>

      <>
        <CategoriesSection />
      </>

      <div style={{ background: "lightgreen" }}>
        <hr />
        <ProductCarousel />
        <hr />
      </div>
    </>
  );
}

export default Home;

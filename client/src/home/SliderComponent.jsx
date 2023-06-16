import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/slider.css";

import slide1 from "../assets/slider-1.1.jpg";
import slide2 from "../assets/slider-1.2.jpg";
import slide3 from "../assets/slider-2.1.jpg";

const CarouselComponent = () => {
  const slide = [slide1, slide2, slide3];
  return (
    <>
      <div className="home_main_container_slider">
        <div className="home_slider_container">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            dynamicHeight={true}
            width="100%"
          >
            {slide.map((item, i) => (
              <img key={i} src={item} alt="img_slide" />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CarouselComponent;

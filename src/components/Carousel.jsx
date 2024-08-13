import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselOWN = () => {
  const slides = [
    "https://www.rosierfoods.com/cdn/shop/files/1.png?v=1714042773",
    "https://www.rosierfoods.com/cdn/shop/files/DIL_SE_DESI-16.png?v=1715452333",
  ];

  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      stopOnHover={false}
      className="m-0 p-0"
    >
      {slides.map((slide, index) => (
        <div key={index}>
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselOWN;

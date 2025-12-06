import React, { useState } from 'react';
import './Carousel.css';


interface CarouselProps {
images: string[];
}


const Carousel: React.FC<CarouselProps> = ({ images }) => {
const [current, setCurrent] = useState(0);


const prevSlide = () => {
setCurrent(current === 0 ? images.length - 1 : current - 1);
};


const nextSlide = () => {
setCurrent(current === images.length - 1 ? 0 : current + 1);
};


return (
<div className="carousel">
<button className="carousel__button carousel__button--prev" onClick={prevSlide}>&lt;</button>
<div className="carousel__inner">
{images.map((img, index) => (
<img
key={index}
src={img}
alt={`slide-${index}`}
className={`carousel__image ${index === current ? 'carousel__image--active' : ''}`}
/>
))}
</div>
<button className="carousel__button carousel__button--next" onClick={nextSlide}>&gt;</button>
</div>
);
};


export default Carousel;
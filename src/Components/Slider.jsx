import React from 'react'
import { Carousel } from 'react-bootstrap';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import '../Style/Slider.css'
export default function 
() {
  return (
    <div className="carousel-container">
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
        
          className="d-block w-100 rounded-carousel "
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h4>First slide label</h4>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-carousel"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h4>Second slide label</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-carousel"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h4>Third slide label</h4>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

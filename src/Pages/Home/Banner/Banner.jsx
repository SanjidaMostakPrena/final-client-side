import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerimg1 from "../../../assets/banner/banner1.jpg"
import bannerimg2 from "../../../assets/banner/banner2.webp"
import bannerimg3 from "../../../assets/banner/banner3.avif"
const Banner = () => {
    return (
        <div>
           <Carousel autoPlay={true} infiniteLoop={true}>
           
                <div>
                    <img src={bannerimg1} />
                   
                </div>
                <div>
                    <img src={bannerimg2} />
                </div>
                <div>
                    <img src={bannerimg3} />
                </div>
            </Carousel> 
        </div>
    );
};

export default Banner;
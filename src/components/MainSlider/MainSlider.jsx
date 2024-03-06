
import React from 'react'
import style from './MainSlider.module.css';
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import grocerybanner from '../../Assets/images/grocery-banner.png'
import grocerybanner2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick';



export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return <>
    <div className="row my-5">
        <div className="col-md-9">
            <Slider {...settings}>
                <img src={slide1} height={400} className='w-100 ' alt="" />
                <img src={slide2} height={400} className='w-100' alt="" />
                <img src={slide3} height={400} className='w-100' alt="" />
            </Slider>
        </div>
        <div className="col-md-3">
            <img src={grocerybanner} className='w-100' height={200} alt="" />
            <img src={grocerybanner2} className='w-100' height={200}  alt="" />
        </div>
    </div>

    </>
}

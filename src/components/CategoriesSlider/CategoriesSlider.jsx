
import React, { useEffect } from 'react'
import style from './CategoriesSlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';



export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1
    };

    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    } 
    let {data}= useQuery('Categories' , getCategories)
    


    return <>
        <div className="row mt-5">
            <Slider {...settings}>
                {data?.data.data.map(category => <div key={category._id} className='col-md-2'>
                    <img src={category.image}  className='w-100' height={200} alt={category.name}/>
                    <p className='fw-bold text-center mt-1 text-main'>{category.name}</p>
                </div>
                    )}
            </Slider>
        </div>
    </>
}

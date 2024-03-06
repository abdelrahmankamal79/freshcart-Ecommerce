
import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import Slider from 'react-slick';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import { Helmet } from 'react-helmet';




export default function ProductDetails() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [details , setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    let {addToCart ,setCount} = useContext(cartContext);
    let{handleWishList ,wishIcon} =useContext(WishContext);



    async function getProductDetails(id){
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setDetails(data.data)
        setLoading(false)
    }
    useEffect(() =>{
        getProductDetails(id)
    },[])

    async function postToCart(id){
        setLoading(true)
        let {data} =  await addToCart(id)
        if(data.status == 'success'){
            setCount(data.numOfCartItems)
            toast.success(data.message)
            setLoading(false)

        }
    }

    


    return <>
    {loading? 
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    :  <><Helmet>
            <meta charSet="utf-8" />
            <title>{details.title}</title>
        </Helmet>
        <div className='row align-items-center mt-5'>
                    <div className="col-md-4">
                    <Slider {...settings}>
                        {details.images.map(image=> <img src={image} className='w-100' alt={details.title} key={details.id}></img>)}
                    </Slider>
        </div>
        <div className='col-md-8'>
            <div className='details'>
                <h3 className='h5'>{details.title}</h3>
                <p className='py-3'>{details.description}</p>
                <span className='font-sm text-main'>{details.category.name}</span>
                <div className="d-flex py-3 justify-content-between align-items-center">
                    
                        <span className='font-sm'>{details.price} EGP</span>
                        <span className='font-sm'>
                            <i className='fas fa-star rating-color me-1 '></i>
                            {details.ratingsAverage}
                        </span>
                </div>
                <button onClick={() => handleWishList(details.id)} className='  border-0 bg-transparent fs-2 '><i className={`${wishIcon.map((id) => id.id).includes(details.id) ? "fa-solid" : "fa-regular"} fa-heart text-danger`}></i></button>

                <button onClick={()=> postToCart(id)} className='btn bg-main text-main-light w-100'> Add To Cart</button>
            </div>
        </div>
    </div>
        </>
        }
    </>
}


import React, { useContext, useEffect, useState } from 'react'
import style from './FeatureProducts.module.css';
import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';
import { Helmet } from 'react-helmet';
import { Fade } from 'react-awesome-reveal';




export default function FeatureProducts() {
        let {addToCart, setCount } = useContext(cartContext);
    let{wishIcon,handleWishList,showWhishlist } =useContext(WishContext);
    const [filterText, setfilterText] = useState('');

    function getProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let {data , isLoading} = useQuery(' featureProducts' ,getProducts , {
    });

    async function postToCart(id){
        let {data} =  await addToCart(id)
        if(data.status === 'success'){
            setCount(data.numOfCartItems)
            toast.success(data.message ,{position: "top-right" , duration:4000} )
        }
    }
    useEffect(() => {
        showWhishlist();
    }, []);


    return <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>feature products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        {isLoading? 
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
        </div>:
                <Fade duration='3000' >
                    <div className="row gy-4 mt-3">
                    <form action="" >
                        <div className="text-center w-50 mx-auto my-5 d-flex align-items-center">
                        <i className="fa-solid fa-magnifying-glass fs-4 mx-2"></i>
                        <input type="search" className="form-control w-75"
                            placeholder="search... "
                            value={filterText}
                            onChange={(e)=>setfilterText(e.target.value)}
                        />
                        </div>
                    </form>
                    {data?.data.data.map(product =>{
                        if (
                            product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1
                        ) {
                            return;
                        } 
                        return (
                            <div key={product.id} className="col-lg-2">
                        <div className="product p-2 rounded-3">
                            <Link to={`/ProductDetails/${product.id}`}>
                                    <img src={product.imageCover} alt={product.title} className='w-100'  />
                                    <span className='font-sm text-main'>{product.category.name}</span>
                                    <h3 className='h6'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
                                    <div className="d-flex py-3 justify-content-between align-items-center">
                                        <span className='font-sm'>{product.price} EGP</span>
                                        <span className='font-sm'>
                                            <i className='fas fa-star rating-color me-1 '></i>
                                            {product.ratingsAverage}
                                        </span>
                                    </div>
                            </Link>
                            <div className='d-flex justify-content-between'>
                                <button onClick={()=> postToCart(product.id) } className='btn bg-main text-main-light '> Add To Cart</button>
                                <button onClick={() => handleWishList(product.id)} className='  border-0 bg-transparent fs-2 '><i className={`${wishIcon.map((id) => id.id).includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-danger`}></i></button>
                            </div>
                            
                        </div>
                            </div> )
    })}
    </div>
                </Fade>
            }
        </>
}

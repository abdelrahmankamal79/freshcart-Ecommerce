
import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { Watch } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Cart() {
    let {getCartItems , deleteCartItems ,updateCartItems ,clearCartItems ,setCount} = useContext(cartContext);
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    let Navigate = useNavigate();


    async function getItems(){
        let {data}= await getCartItems();
        setCart(data)
        setLoading(false)
        console.log(data);
    }
    async function deleteItems(id){
        setLoading(true)
        let {data}= await deleteCartItems(id);
        setCount(data.numOfCartItems)
        setCart(data)
        setLoading(false)
        console.log(data);
    }
    async function clearItem(){
        setLoading(true)
        let {data}= await clearCartItems();
        setCart(data)
        Navigate('/products')
        setLoading(false)
    }
    async function updateItems(id , count){
        
        if(count <1){
            
            deleteItems(id)

        }else{
            setLoading(true)
            let {data}= await updateCartItems(id ,count);
            setCart(data)
            setLoading(false)
            console.log(data);
        }
    }

    useEffect(()=>{
        getItems();
    } , [])

    return <>    <Helmet>
                    <meta charSet="utf-8" />
                    <title> Cart</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>

    <div className='mt-5 bg-main-light p-2'>
                <h2 className='fw-bold'>Shop Cart :</h2>
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
            </div> : cart?<>
            <p className='text-main fw-bold'>num Of Cart Items : {cart.numOfCartItems}</p>
            <p className='text-main fw-bold'>total Cart Price : {cart.data.totalCartPrice} EGP</p>
            {cart.data.products.map((product ,index) => <div key={ index} className="row brdr gy-2 m-0 p-2 align-items-center">
                <div className='col-md-1'>
                    <div className="img">
                        <img src={product.product.imageCover}  className='w-100 rounded-circle' alt={product.product.title} />
                    </div>
                </div>
                <div className="col-md-9">
                        <div className="item">
                            <h3 className='h5'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
                            <p className='text-main fw-bold'>{product.price} EGP</p>
                            <button onClick={()=> deleteItems(product.product.id)} className='btn'> <i className='fas fa-trash-can text-danger'></i> Remove</button>
                        </div>
                </div>
                <div className="col-md-2">
                    <div className="count">
                        <button onClick={()=> updateItems(product.product.id , product.count +1)} className='btn brdr1 rounded-4'><i className="fa-solid fa-plus"></i></button>
                        <span className='mx-2'>{product.count}</span>
                        <button  onClick={()=> updateItems(product.product.id , product.count -1)} className='btn brdr1 rounded-4 '><i className="fa-solid fa-minus"></i></button>
                    </div>
                </div>
                
            </div>)}
            <button onClick={clearItem} className='btn btn-outline-danger mt-2'>Clear cart Items</button>
                <Link to={`/shippingaddress/${cart.data._id}`} className='btn btn-success  text-light form-control mt-2'>Checkout</Link>
            </>: <><h2 className='text-main '>card is empty</h2>
            <Link to={'/products'} className='btn btn-success form-control rounded-3'>Show product</Link>  
            </>
    }
    </div>
    </>
}

import axios from "axios";
import { createContext, useState } from "react";



export let cartContext = createContext();

export default function CartContextProvider(props){

    let [count , setCount] = useState(0);
    

    let headers = {
        token : localStorage.getItem('userToken')
    }
    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId
        } , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function checkOutSession(cartId , shippingAddress ){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://abdelrahmankamal79.github.io/freshcart-Ecommerce` , {
            shippingAddress
        } , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function chashOrders(cartId , shippingAddress ){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
            shippingAddress
        } , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function getCartItems(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers 
        })
        .then((response) => {
            setCount(response.data.numOfCartItems);
            return response;
        })
        .catch((err)=> err)
    }
    function deleteCartItems(productId){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function updateCartItems(productId ,count){

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
            count
        }, {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    
    function clearCartItems(){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
        {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    
    return <cartContext.Provider value={{addToCart , getCartItems ,deleteCartItems ,updateCartItems ,checkOutSession , clearCartItems ,chashOrders ,count ,setCount }}>
        {props.children}
    </cartContext.Provider>

}

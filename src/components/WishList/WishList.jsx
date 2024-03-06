
import { useContext, useEffect, useState } from "react"
import  Style  from "./../WishList/WishList.module.css"
import { WishContext } from "../../Context/WishContext" 
import { Watch } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";


export default function WishList(){

    let {addToCart , setCount} =useContext(cartContext);
    let {getWishListItem ,deleteWishListItems} =useContext(WishContext);
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(true);
    let Navigate = useNavigate();


    async function getItems(){
        setLoading(true)
        let {data} =await getWishListItem()
        console.log(data)
        setWishList(data)
        setLoading(false)
    }
    async function deleteItems(id){
        setLoading(true)
        let {data} =await deleteWishListItems(id)
        if(data?.status === "success"){
            toast.success(data.message,{position: "top-right"})
            setLoading(false)
            getItems()
        }else{
            toast.error(data.message,{position: "top-right"})
        }
    }
    async function postToCart(id){
        setLoading(true)
        let {data} =  await addToCart(id)
        if(data.status === 'success'){
            setCount(data.numOfCartItems)
            toast.success(data.message ,{position: "top-right"})
            deleteItems(id)
            setLoading(false)
        

        }
    }


    useEffect(() => {
        getItems()
    } ,[])

    return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>wishList</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='mt-5 bg-main-light p-2 mb-5'>
                <h2 className='fw-bold'>Wish List:</h2>
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
                </div> : wishList?<>
                <p className='text-main fw-bold'>num Of Wish List Items : {wishList.count}</p>
                {wishList.data.map((data ,index) => <div key={ index} className="row brdr gy-2 m-0 p-2 align-items-center">
                    <div className='col-md-1'>
                        <div className="img">
                            <img src={data.imageCover}  className='w-100 rounded-circle' alt="" />
                        </div>
                    </div>
                    <div className="col-md-9">
                            <div className="item">
                                <h3 className='h5'>{data.title}</h3>
                                <p className='text-main fw-bold'>{data.price} EGP</p>
                                <button onClick={()=> deleteItems(data.id)} className='btn'> <i className='fas fa-trash-can text-danger'></i> Remove</button>
                                <button onClick={()=> postToCart(data.id)} className='btn'> <i className="fa-regular fa-paper-plane"></i> Send To Cart</button>
                            </div>
                            
                    </div>
                </div>)}
                </>:'' 
                    }
            </div>
    </>
}
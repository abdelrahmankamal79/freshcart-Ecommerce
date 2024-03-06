import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";



export let WishContext = createContext();

export default function WishListProvider(props){
    let [wishNum , setWishNum] = useState(0);
    const [wishIcon, setWishIcon] = useState([]); 

    let headers = {
        token : localStorage.getItem('userToken')
    }
    
    function addToWshList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            productId
        } , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }
    function getWishListItem(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
            headers 
        })
        .then((response) => {
            setWishNum(response.data.count);
            return response;
            
        })
        .catch((err)=> err)
        
    }
    function deleteWishListItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers 
        })
        .then((response)=> response)
        .catch((err)=> err)
    }


    const handleWishList = async (id) => {
        const isInWishlist = wishIcon.some((item) => item.id === id);
    
        if (isInWishlist) {
            await removeToWhishlist(id);
            setWishIcon(wishIcon.filter((item) => item.id !== id));
            toast.success("Product removed successfully from your wishlist", {position: "top-right",
                duration: 4000,

        });
        } else {
            await postToWhishlist(id);
            setWishIcon([...wishIcon, { id }]);
            toast.success("Product added successfully to your wishlist", {position: "top-right",
                duration: 4000,
                
        });
        }
    };
    
    async function showWhishlist() {
        let { data } = await getWishListItem();
        if (data.status === "success") {
            setWishIcon(data.data);
        }
    }
    
    
    async function postToWhishlist(id) {
        let { data } = await addToWshList(id);
        if (data.status === "success") {
        showWhishlist();
        }
    }
    async function removeToWhishlist(id) {
        let { data } = await deleteWishListItems(id);
        if (data.status === "success") {
        showWhishlist();
        }
    }


    
    return <WishContext.Provider value={{addToWshList , getWishListItem ,deleteWishListItems ,wishNum,setWishNum ,wishIcon,handleWishList ,showWhishlist,}}>
        {props.children}
    </WishContext.Provider>

}
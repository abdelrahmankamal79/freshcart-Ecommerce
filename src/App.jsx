import React, { useContext, useEffect } from 'react';
import Home from './components/Home/Home.jsx';
import Cart from './components/Cart/Cart.jsx';
import Categories from './components/Categories/Categories.jsx';
import Products from './components/Products/Products.jsx';
import Brands from './components/Brands/Brands.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Layout from './components/Layout/Layout.jsx';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Notfound from './components/Notfound/Notfound.jsx';
import { UserContext } from './Context/UserContext.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import { Toaster } from 'react-hot-toast';
import ShippingAddress from './components/ShippingAddress/ShippingAddress.jsx';
import AllOrders from './components/AllOrders/AllOrders.jsx';
import WishList from './components/WishList/WishList.jsx';
import { Helmet } from 'react-helmet';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import ResetCode from './components/ResetCode/ResetCode.jsx';



export default function App() {
  let routers= createHashRouter([
    {path : '' , element:<Layout/> , children: [
      {index :true , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path :'cart' , element: <ProtectedRoute><Cart/> </ProtectedRoute>},
      {path :'wishlist' , element: <ProtectedRoute><WishList/> </ProtectedRoute>},
      {path :'products' , element: <ProtectedRoute><Products/></ProtectedRoute> },
      {path :'productdetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      {path :'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute> },
      {path :'allorders' , element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      {path :'forgetpassword' , element: <ForgetPassword/> },
      {path :'resetcode' , element: <ResetCode/> },
      {path :'shippingaddress/:cartId' , element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
      {path :'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute> },
      {path :'register' , element: <Register/> },
      {path :'login' , element: <Login/> },
      {path :'*' , element: <Notfound/> },
    ]}
  ])
  
  let {setUserToken} =useContext(UserContext);

    useEffect(()=>{
      if (localStorage.getItem('userToken') ) {
        setUserToken(localStorage.getItem('userToken') )
        
      }
    },[])


  return <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
      <RouterProvider  router={routers}></RouterProvider>
      <Toaster></Toaster>
  </>
}

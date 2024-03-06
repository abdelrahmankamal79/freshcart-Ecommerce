
import React, { useContext, useState } from 'react'
import style from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import * as yup from 'yup';
import toast from 'react-hot-toast';

export default function ShippingAddress() {
    let {checkOutSession ,chashOrders} =useContext(cartContext)
    let {cartId} = useParams()
    const [isOnline, setisOnline] = useState(true)
    

    async function checkOut(values){
        let {data} = await checkOutSession(cartId ,values) ;
        if(data.status === 'success'){
            window.location.href =data.session.url
        }
    }


    async function chashOrder(values){
        let {data} = await chashOrders(cartId ,values) ;
        if(data.status === "success"){
            toast.success('your order was successfuly maded ')
        }else{
            toast.error('sorry there is something wrong')
        }
    }



    const validationSchema = yup.object({
        city: yup.string().required("city is required"),
        phone: yup.string().matches(/^(002)?01[0-25][0-9]{8}$/, 'not vaild phone number').required("phone is required"),
    });

    let formik = useFormik({
        initialValues :{
            details:'',
            phone:'',
            city:''
        } ,validationSchema,
        onSubmit : isOnline? checkOut : chashOrder
    })



    return (
        <div className='pt-5'>
          <h1 className='w-75 mx-auto my-5'>fill your data :</h1>
          <form className='w-75 mx-auto my-5' action="" onSubmit={formik.handleSubmit}>
            <label htmlFor="details">details :</label>
            <input className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name="details" id="details" />
  
            <label htmlFor="phone">phone :</label>
            <input className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" />
            
            {formik.errors.phone && formik.touched.phone?
                <div className='alert alert-danger p-2'>{formik.errors.phone}</div> : null
            }
    
            <label htmlFor="city">city :</label>
            <input className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" name="city" id="city" />
    
            {formik.errors.city && formik.touched.city?
                <div className='alert alert-danger p-2 '>{formik.errors.city}</div> : null
              }
    
            <div className='m-3 text-center'>
              <button onClick={()=>checkOut} className='btn bg-main w-25 text-white mx-3' type="submit">online payment</button>
              <button onClick={function(){
                setisOnline(false)
    
              }} className='btn bg-main w-25 text-white' type="submit">cash payment</button>
            </div>
          </form>
        </div>
      )
}

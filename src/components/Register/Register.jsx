
import React, { useState } from 'react'
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



export default function Register(values) {
    let navigate = useNavigate()
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    async function registerSubmit(values){ 
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
        .catch((err)=>{
            setApiError(err.response.data.message)
            setLoading(false);
        })
        if (data.message == 'success') {
            setLoading(false)
            navigate('/login')
        }
        console.log(data)
    }
    
    let validationSchema = yup.object({
        name : yup.string().required('Name is required').min(3 , 'min lenght is 3 num.').max(10 , 'max lenght is 10 num.'),
        email:yup.string().required('email is required').email('invalid email'),
        password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'INVALID PASSWORD EX(Ahmed@123)'),
        rePassword:yup.string('rePassword is required').oneOf([yup.ref('password')], 'rePassword dont match'),
        phone:yup.string().required(' phone is required').matches(/^01[0125][0-9]{8}$/ , 'must enter egyption phone number')

    })

    let formik = useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },validationSchema
        ,onSubmit:registerSubmit
    })
    function clearMsg(){
        setApiError("")
    }
    


    return <>
    <div className='w-75 mx auto py-4'>
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
            {apiError?  <div className="alert alert-danger">{apiError}</div>:null}
            <label htmlFor="name"> Name: </label>
            <input onFocus={clearMsg} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name'  name='name' className='form-control mb-3'/>
            {formik.errors.name && formik.touched.name? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

            <label htmlFor="email"> Email: </label>
            <input onFocus={clearMsg} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email'  name='email' className='form-control mb-3'/>
            {formik.errors.email  && formik.touched.email? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

    
            <label htmlFor="password"> password: </label>
            <input onFocus={clearMsg} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password'  name='password' className='form-control mb-3'/>
            {formik.errors.password  && formik.touched.password? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}


            <label htmlFor="rePassword"> rePassword: </label>
            <input onFocus={clearMsg} onBlur={formik.handleBlur} onChange={formik.handleChange} type="Password" id='rePassword'  name='rePassword' className='form-control mb-3'/>
            {formik.errors.rePassword  && formik.touched.rePassword? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}


            <label htmlFor="phone"> phone: </label>
            <input onFocus={clearMsg} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone'  name='phone' className='form-control mb-3'/>
            {formik.errors.phone  && formik.touched.phone? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

            {loading?<button type='button' className='btn bg-main text-light'>
                <i className='fas fa-spinner fa-spin'></i>
            </button> :  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>}
            <Link className='ps-3' to={'/login'}>Login</Link>
        </form>
    </div>
    </>
}

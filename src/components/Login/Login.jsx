
import React, {useContext, useState} from 'react'
import style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';



export default function Login() {
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let  {setUserToken} = useContext(UserContext);
    



    async function loginSubmit(values){ 
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values)
        .catch((err)=>{
            setApiError(err.response.data.message)
            setLoading(false);
        })
        if (data.message == 'success') {
            setLoading(false)
            localStorage.setItem('userToken' , data.token)
            setUserToken(data.token)
            navigate('/')
        }
        console.log(data)
    }
    
    let validationSchema = yup.object({
        email:yup.string().required('email is required').email('invalid email'),
        password:yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'INVALID PASSWORD EX(Ahmed@123)'),
    })

    let formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },validationSchema
        ,onSubmit:loginSubmit
    })
    


    return <>
        <Helmet>
        <title>Login</title>
        </Helmet>
    <div className='w-75 m-4 pb-3'>
        <h2>login Now</h2>
        <form onSubmit={formik.handleSubmit}>
            {apiError?  <div className="alert alert-danger">{apiError}</div>:null}
            <label htmlFor="email"> Email: </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email'  name='email' className='form-control mb-3'/>
            {formik.errors.email  && formik.touched.email? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

    
            <label htmlFor="password"> password: </label>
            <input  onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password'  name='password' className='form-control mb-3'/>
            {formik.errors.password  && formik.touched.password? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

            {loading?<button type='button' className='btn bg-main text-light'>
                <i className='fas fa-spinner fa-spin'></i>
            </button> :  <><button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>
            <br />
            <Link className="btn text-main fs-6 " to={"/register"}>
            <strong>click here</strong> if you don't have an account . . .
            </Link>
            <br />
            <Link className="btn text-main fs-6 " to={"/forgetpassword"}>
            <strong>click here</strong> if you forgot your password . . .
            </Link>
            </>
            }
        </form>
    </div>
    </>
}

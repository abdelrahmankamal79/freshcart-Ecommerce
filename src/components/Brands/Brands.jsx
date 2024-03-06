
import style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Watch } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Slide } from 'react-awesome-reveal';

export default function Brands() {


    function getAllBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    } 
    let {data , isLoading}= useQuery('Categories' , getAllBrands )
    
    
    return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        {isLoading?<div className='d-flex justify-content-center align-items-center vh-100'>
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
            <Slide duration={2000}>
                <div className="row mb-3">
            <h2 className='text-main text-center fw-bold mt-3'>All Brands</h2>
        {data?.data.data.map(category => <div key={category._id} className='col-md-3 product gy-3 mt-5'>
                    <img src={category.image}  className='w-100'  alt={category.name}/>
                    <p className='fw-bold text-center mt-1 text-main'>{category.name}</p>
                </div>
                    )}
        </div>
            </Slide>
       }
    </>
}


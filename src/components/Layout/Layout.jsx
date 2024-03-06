
import React from 'react'
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';


export default function Layout() {
    return <>
    <Navbar/>
    <div className='container min-vh-100'>
        <Offline>   
            <div className="network">
            <i className="fas fa-wifi"></i>
            <span> oops you are offline</span> 
            </div>
        </Offline>
        <Outlet></Outlet>
    </div>
    <Footer/>
    </>
}

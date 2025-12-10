import React from 'react';
import Logo from '../Components/logo/logo';
import { Outlet } from 'react-router-dom';
import authimage from '../assets/authimage.png'
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authimage} alt="" srcset="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
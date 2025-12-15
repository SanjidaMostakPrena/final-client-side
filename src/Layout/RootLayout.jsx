import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from '../Pages/Home/Shared/Navbar/Navbar';
import Footer from '../Pages/Home/Shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;

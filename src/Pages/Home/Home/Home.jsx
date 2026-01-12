import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import BooksSwiper from '../../BooksSwiper/BooksSwiper';
import LatestBooks from './LatestBooks';
import HomePage from '../../HomePage/HomePage';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            
            <Brands></Brands>
             <HomePage></HomePage>
            <BooksSwiper></BooksSwiper>
           
        </div>
    );
};

export default Home;
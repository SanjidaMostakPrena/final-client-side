import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import BooksSwiper from '../../BooksSwiper/BooksSwiper';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Brands></Brands>
            <BooksSwiper></BooksSwiper>
        </div>
    );
};

export default Home;
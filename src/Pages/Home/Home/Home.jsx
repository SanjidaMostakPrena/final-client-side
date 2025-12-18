import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import BooksSwiper from '../../BooksSwiper/BooksSwiper';
import LatestBooks from './LatestBooks';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <Brands></Brands>
            <BooksSwiper></BooksSwiper>
        </div>
    );
};

export default Home;
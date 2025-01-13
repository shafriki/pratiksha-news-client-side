import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <Banner></Banner>
            home
        </div>
    );
};

export default Home;
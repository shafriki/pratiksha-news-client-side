import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Latest from '../Latest/Latest';
import TopNews from '../TopNews/TopNews';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <Banner></Banner>
            <Latest></Latest>
            <TopNews></TopNews>
        </div>
    );
};

export default Home;
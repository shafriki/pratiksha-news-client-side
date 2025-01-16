import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Latest from '../Latest/Latest';
import TopNews from '../TopNews/TopNews';
import Publishers from '../Publishers/Publishers';
import Trending from '../../Trending Articles/Trending';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <Banner></Banner>
            <Latest></Latest>
            <TopNews></TopNews>
            <Publishers></Publishers>
            <Trending></Trending>
        </div>
    );
};

export default Home;
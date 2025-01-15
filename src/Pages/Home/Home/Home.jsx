import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Latest from '../Latest/Latest';
import TopNews from '../TopNews/TopNews';
import Publishers from '../Publishers/Publishers';

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
        </div>
    );
};

export default Home;
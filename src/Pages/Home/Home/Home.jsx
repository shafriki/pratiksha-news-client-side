import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Latest from '../Latest/Latest';
import TopNews from '../TopNews/TopNews';
import Publishers from '../Publishers/Publishers';
import Trending from '../../Trending Articles/Trending';
import SubscriptionModal from '../../../Components/Subscription Modal/SubscriptionModal';
import Plans from '../../Plans/Plans';

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalVisible(true); 
        }, 8000); 

        return () => clearTimeout(timer); 
    }, []); 

    return (
        <div>
            <Helmet>
                <title>Home | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <Banner />
            <SubscriptionModal isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
            <Latest />
            <TopNews />
            <Publishers />
            <Trending />
            <Plans />
        </div>
    );
};

export default Home;

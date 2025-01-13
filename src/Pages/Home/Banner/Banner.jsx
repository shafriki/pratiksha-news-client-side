import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/img1.png';
import img2 from '../../../assets/img2.png';
import img3 from '../../../assets/img3.png';
import img4 from '../../../assets/img4.png';
import img5 from '../../../assets/img5.png';


const fadeAnimationHandler = (props, state) => {
    const transitionTime = props.transitionTime + 'ms';
    const transitionTimingFunction = 'ease-in-out';

    let slideStyle = {
        position: 'absolute',
        display: 'block',
        zIndex: -2,
        minHeight: '100%',
        opacity: 0,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        transitionTimingFunction: transitionTimingFunction,
        msTransitionTimingFunction: transitionTimingFunction,
        MozTransitionTimingFunction: transitionTimingFunction,
        WebkitTransitionTimingFunction: transitionTimingFunction,
        OTransitionTimingFunction: transitionTimingFunction,
    };

    if (!state.swiping) {
        slideStyle = {
            ...slideStyle,
            WebkitTransitionDuration: transitionTime,
            MozTransitionDuration: transitionTime,
            OTransitionDuration: transitionTime,
            transitionDuration: transitionTime,
            msTransitionDuration: transitionTime,
        };
    }

    return {
        slideStyle,
        selectedStyle: { ...slideStyle, opacity: 1, position: 'relative' },
        prevStyle: { ...slideStyle },
    };
};

const Banner = () => {
    return (
        <Carousel 
            autoPlay
            autoFocus
            emulateTouch
            animationHandler={fadeAnimationHandler}
            interval={2700}
            infiniteLoop 
            stopOnHover={false}
            showThumbs={true}
             >
            
            <div>
                <img src={img1} alt="Slide 1" />
            </div>
            <div>
                <img src={img2} alt="Slide 2" />
            </div>
            <div>
                <img src={img3} alt="Slide 3" />
            </div>
            <div>
                <img src={img4} alt="Slide 4" />
            </div>
            <div>
                <img src={img5} alt="Slide 5" />
            </div>
        </Carousel>
    );
};

export default Banner;
import Image from 'next/image'
import React from 'react' 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Slideshow = () =>{
    return (
        <>
         <Splide aria-label="My Favorite Images">
                <SplideSlide>
                <img src="img/freelancer.jpg" alt="Image 1"/>
                  </SplideSlide>
                  <SplideSlide>
                <img src="img/freelancer.jpg" alt="Image 2"/>
               </SplideSlide>
                 </Splide>
        </>
    )
}
export default Slideshow
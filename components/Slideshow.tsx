import Image from 'next/image'
import React from 'react' 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {styles, TitleText} from '../components/StyledComponents'


const Slideshow = () =>{
    return (
        <>
         <Splide aria-label="My Favorite Images">
                <SplideSlide style={{...styles.center}}>
                <img src=" /img/le-buzz-studio-KiEiI2b9GkU-unsplash.jpg" alt="Image 1"/>
                  </SplideSlide>
                  <SplideSlide>
                <img src="/img/jonas-leupe-7RI1YkIbCDI-unsplash.jpg" alt="Image 2"/>
               </SplideSlide>
                 </Splide>
        </>
    )
}
export default Slideshow
import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import FirstPage from './Pages/Homepage/First-page'
import SecondPage from './Pages/Homepage/Second-page';
import 'swiper/css'
import { Autoplay} from 'swiper';
import './styles.css'

function App() {
  return (
    
      <ChakraProvider>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <FirstPage />
          </SwiperSlide>
          <SwiperSlide>
            <SecondPage />
          </SwiperSlide>
        </Swiper>
      </ChakraProvider>
    
  );
}

export default App;

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import FirstPage from './First-page'
import SecondPage from './Second-page';
import 'swiper/css'
import { Autoplay } from 'swiper';

function index() {
  return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 20000,
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
  )
}

export default index
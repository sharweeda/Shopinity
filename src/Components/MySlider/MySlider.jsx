import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ClipLoader } from 'react-spinners'
import Slider1 from '../../assets/images/slider1.jpeg';

import Photo from '../../assets/images/photo.jpeg';

import MainSlider from '../../assets/images/grocery-banner-2.jpeg';

import Playstation from '../../assets/images/playstation.jpeg';
import Slider2 from '../../assets/images/slider2.jpeg';
export default function MainSliders() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
                  <ClipLoader size={50} color="#3B82F6" />

        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 px-6 py-4">
          {/* Main Slider */}
          <div className="lg:w-3/4 w-full">
            <Slider {...settings}>
              <img
                src={Photo}
                className="w-full h-[400px] object-cover rounded-xl"
                alt="Main"
              />
              <img
                src={Playstation}
                className="w-full h-[400px] object-cover rounded-xl"
                alt="PlayStation"
              />
              <img
                src={MainSlider}
                className="w-full h-[400px] object-cover rounded-xl"
                alt="MainSlider"
              />
            </Slider>
          </div>

          {/* Side Images */}
          <div className="lg:w-1/4 w-full flex lg:flex-col gap-4">
            <img
              src={Slider2}
              className="w-full h-[195px] object-cover rounded-xl"
              alt="Side 1"
            />
            <img
              src={Slider1}
              className="w-full h-[195px] object-cover rounded-xl"
              alt="Side 2"
            />
          </div>
        </div>
      )}
    </>
  )
}

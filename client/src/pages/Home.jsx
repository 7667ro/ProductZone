import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import Footer from '../components/Footer';
export default function Home() {
  
  return (
    <div className=''>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto mb-[130px]'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Discover Your <span className='text-slate-500'>perfect</span>
          <br />
          product with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        ProductZone is your ultimate destination for finding the perfect product. Explore a diverse range of options tailored to your needs, all in one place!"
          <br />
          We have a wide range of Products for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's Search Products
        </Link>
      </div>

    
      <Footer></Footer>
    </div>
  );
}

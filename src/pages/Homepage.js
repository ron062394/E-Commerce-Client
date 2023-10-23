// SellerDashboard.js
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MyCarousel from '../components/CarouselSection'
import ProductList from '../components/ProductList';


function Homepage() {
  return (
    <div>
        <HeroBanner/>
        <MyCarousel/>
        <ProductList/>
    </div>
  );
}

export default Homepage;

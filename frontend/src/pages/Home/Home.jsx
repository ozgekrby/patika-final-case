import React, { useState } from 'react';
import HeroSection from './HeroSection'
import BrandSection from './BrandSection'
import TrendProducts from './TrendProducts'

const Home = () => {

  return (
    <main>
      <HeroSection />
      <BrandSection />
      <TrendProducts />
    </main>
  );

};

export default Home;
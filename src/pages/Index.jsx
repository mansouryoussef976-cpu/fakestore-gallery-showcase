import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Products from './Products';

const Index = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={handleCartClick} />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <div className="mt-12">
          <Products />
        </div>
      </main>
    </div>
  );
};

export default Index;
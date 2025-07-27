import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Products } from './Products';

const Index = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleCartClick = () => {
    // TODO: Implement cart functionality
    console.log('Cart clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={handleCartClick} />
      <Products />
    </div>
  );
};

export default Index;

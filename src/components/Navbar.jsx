import React, { useState, useEffect } from 'react';
import { ShoppingCart, Moon, Sun, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ cartItemsCount, onCartClick }) => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleCartClick = () => {
    navigate('/cart');
    if (onCartClick) onCartClick();
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StoreGallery
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              السلة
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center animate-bounce-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
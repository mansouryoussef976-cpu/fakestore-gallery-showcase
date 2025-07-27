import { ShoppingCart, Moon, Sun, Store } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StoreGallery
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
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
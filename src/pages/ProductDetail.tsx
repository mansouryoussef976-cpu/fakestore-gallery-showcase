import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Navbar } from '../components/Navbar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useProduct } from '../hooks/useProducts';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id!);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleCartClick = () => {
    // TODO: Implement cart functionality
    console.log('Cart clicked');
  };

  if (loading) return <LoadingSpinner />;
  
  if (error || !product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error || 'Product not found'}</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={handleCartClick} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="mb-6 animate-fade-in"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-slide-up">
        <Card className="overflow-hidden shadow-elegant">
          <CardContent className="p-8">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
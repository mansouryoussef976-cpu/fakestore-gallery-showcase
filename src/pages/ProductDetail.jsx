import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import Button from '../components/Button';
import { Card, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProduct } from '../hooks/useProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  if (loading) return <LoadingSpinner />;
  
  if (error || !product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center animate-fade-in">
        <div className="text-center p-8 bg-card rounded-xl shadow-card border border-destructive/20">
          <h2 className="text-2xl font-bold text-destructive mb-4">خطأ في التحميل</h2>
          <p className="text-muted-foreground mb-4">{error || 'المنتج غير موجود'}</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للمنتجات
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
        className="mb-6 animate-fade-in hover:bg-accent transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        العودة للمنتجات
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-slide-up">
        <Card className="overflow-hidden shadow-elegant border border-border/50 hover:shadow-card transition-shadow duration-300">
          <CardContent className="p-8">
            <div className="aspect-square bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              {product.category === 'electronics' ? 'إلكترونيات' :
               product.category === "men's clothing" ? 'ملابس رجالية' :
               product.category === "women's clothing" ? 'ملابس نسائية' :
               product.category === 'jewelery' ? 'مجوهرات' :
               product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4 leading-relaxed">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
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
                <span className="text-sm font-medium text-foreground">
                  {product.rating.rate}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.rating.count} تقييم)
                </span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              {product.price.toFixed(2)} ج.م
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-foreground">الوصف</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              أضف للسلة
            </Button>
            <Button variant="outline" className="flex-1 hover:bg-accent transition-colors duration-300">
              اشتري الآن
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
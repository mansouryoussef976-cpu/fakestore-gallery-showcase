import { Star } from 'lucide-react';
import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
  onProductClick: (id: number) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="aspect-square overflow-hidden" onClick={() => onProductClick(product.id)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div onClick={() => onProductClick(product.id)}>
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <p className="text-lg font-bold text-primary mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
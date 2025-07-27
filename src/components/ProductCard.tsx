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
    <Card className="group cursor-pointer overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 animate-fade-in border border-border/50">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-background to-muted/20" onClick={() => onProductClick(product.id)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div onClick={() => onProductClick(product.id)}>
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-relaxed">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium text-foreground">
                {product.rating.rate}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count})
              </span>
            </div>
          </div>
          <p className="text-xl font-bold text-primary mt-3 bg-gradient-primary bg-clip-text text-transparent">
            {product.price.toFixed(2)} ج.م
          </p>
        </div>
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 font-medium hover:scale-[1.02] shadow-md hover:shadow-lg">
          أضف للسلة
        </Button>
      </CardContent>
    </Card>
  );
};
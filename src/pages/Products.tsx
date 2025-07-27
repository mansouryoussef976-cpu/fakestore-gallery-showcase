import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Button } from '../components/ui/button';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product';

export const Products = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return filtered;
    }
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center animate-fade-in">
        <div className="text-center p-8 bg-card rounded-xl shadow-card border border-destructive/20">
          <h2 className="text-2xl font-bold text-destructive mb-4">خطأ في التحميل</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in text-center">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          اكتشف منتجات رائعة
        </h1>
        <p className="text-lg text-muted-foreground">
          تصفح مجموعتنا المكونة من {products.length} منتج مميز
        </p>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="bg-card p-8 rounded-xl shadow-card border border-border/50 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
              لا توجد منتجات
            </h3>
            <p className="text-muted-foreground">
              جرب تعديل البحث أو الفلاتر للعثور على ما تبحث عنه
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProductCard
                product={product}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
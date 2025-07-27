import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
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
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Discover Amazing Products
        </h1>
        <p className="text-muted-foreground">
          Browse our collection of {products.length} premium products
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
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
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
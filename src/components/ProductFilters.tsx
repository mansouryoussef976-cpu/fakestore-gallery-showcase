import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export const ProductFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-card mb-8 animate-slide-up border border-border/50 hover:shadow-elegant transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-hover:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="ابحث عن المنتجات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 hover:border-primary/50 focus:border-primary transition-colors"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="hover:border-primary/50 transition-colors">
            <SelectValue placeholder="جميع الفئات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفئات</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'electronics' ? 'إلكترونيات' :
                 category === "men's clothing" ? 'ملابس رجالية' :
                 category === "women's clothing" ? 'ملابس نسائية' :
                 category === 'jewelery' ? 'مجوهرات' :
                 category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="hover:border-primary/50 transition-colors">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">الافتراضي</SelectItem>
            <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
            <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
            <SelectItem value="name">الاسم: أ - ي</SelectItem>
            <SelectItem value="rating">التقييم: من الأعلى للأقل</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
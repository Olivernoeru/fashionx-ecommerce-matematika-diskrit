import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, Product } from '@/data/products';
import { categories } from '@/data/categories';
import { SORT_OPTIONS, PRICE_RANGES } from '@/data/constants';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const filterType = searchParams.get('filter') || '';

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory || p.subCategory === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Filter by type (new, featured, sale)
    if (filterType === 'new') {
      result = result.filter(p => p.isNew);
    } else if (filterType === 'featured') {
      result = result.filter(p => p.isFeatured);
    } else if (filterType === 'sale') {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(rangeIndex => {
          const range = PRICE_RANGES[rangeIndex];
          return p.price >= range.min && p.price < range.max;
        });
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, filterType, selectedPriceRanges]);

  const handleSortChange = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      searchParams.set('category', categoryId);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {currentCategory ? currentCategory.name : searchQuery ? `Hasil: "${searchQuery}"` : 'Semua Produk'}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-4">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background">
                <SheetHeader>
                  <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Kategori</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCategoryChange('')}
                        className={`block text-sm ${!selectedCategory ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                      >
                        Semua
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`block text-sm ${selectedCategory === cat.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Harga</h4>
                    <div className="space-y-2">
                      {PRICE_RANGES.map((range, index) => (
                        <label key={index} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={selectedPriceRanges.includes(index)}
                            onCheckedChange={() => togglePriceRange(index)}
                          />
                          {range.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-background' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-background' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h4 className="font-medium mb-4">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block text-sm transition-colors ${!selectedCategory ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Semua Produk
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`block text-sm transition-colors ${selectedCategory === cat.id ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h4 className="font-medium mb-4">Harga</h4>
                <div className="space-y-3">
                  {PRICE_RANGES.map((range, index) => (
                    <label key={index} className="flex items-center gap-3 text-sm cursor-pointer group">
                      <Checkbox
                        checked={selectedPriceRanges.includes(index)}
                        onCheckedChange={() => togglePriceRange(index)}
                      />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">Tidak ada produk ditemukan</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchParams({});
                    setSelectedPriceRanges([]);
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products, Product } from '@/data/products';
import { formatCurrency } from '@/lib/utils/helpers';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    ).slice(0, 8);

    setResults(filtered);
  }, [query]);

  const handleSelect = (product: Product) => {
    navigate(`/product/${product.slug}`);
    onOpenChange(false);
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      onOpenChange(false);
      setQuery('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 bg-background border-border overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Search Products</DialogTitle>
        </VisuallyHidden>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex items-center border-b border-border p-4">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 hover:bg-secondary rounded transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </form>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-16 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </p>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm font-semibold mt-1">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Tidak ada hasil untuk "{query}"</p>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Pencarian Populer</p>
              <div className="flex flex-wrap gap-2">
                {['Dress', 'Hoodie', 'Sneakers', 'Jacket', 'T-Shirt'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full bg-secondary text-sm hover:bg-muted transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

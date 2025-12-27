import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { formatCurrency, calculateDiscount } from '@/lib/utils/helpers';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? calculateDiscount(product.originalPrice!, product.price) 
    : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn('group product-card block', className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="badge-new">NEW</span>
          )}
          {hasDiscount && (
            <span className="badge-sale">-{discountPercent}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Toggle wishlist logic
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="btn-primary text-center text-sm">
            Quick View
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="mt-3 flex items-center gap-1">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-yellow-500">★</span>
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
}

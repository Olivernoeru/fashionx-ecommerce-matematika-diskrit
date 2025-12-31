import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { formatCurrency, calculateDiscount } from '@/lib/utils/helpers';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? calculateDiscount(product.originalPrice!, product.price) 
    : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn(
        'group product-card block relative',
        'opacity-0 animate-fade-in-up',
        className
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl">
        {/* Skeleton loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            'product-image w-full h-full object-cover transition-all duration-700 ease-out',
            isImageLoaded ? 'opacity-100' : 'opacity-0',
            isHovered && 'scale-110'
          )}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent',
          'opacity-0 transition-opacity duration-500',
          isHovered && 'opacity-100'
        )} />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="badge-new animate-pulse-subtle">NEW</span>
          )}
          {hasDiscount && (
            <span className="badge-sale">-{discountPercent}%</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={cn(
          'absolute top-3 right-3 flex flex-col gap-2',
          'transition-all duration-300',
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Toggle wishlist logic
            }}
            className="p-2.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300 group/btn"
          >
            <Heart className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Quick add to cart
            }}
            className="p-2.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300 group/btn"
            style={{ transitionDelay: '50ms' }}
          >
            <ShoppingBag className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Quick View Button */}
        <div className={cn(
          'absolute bottom-4 left-4 right-4',
          'transition-all duration-500 ease-out',
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="btn-primary text-center text-sm py-3 flex items-center justify-center gap-2 backdrop-blur-md">
            <Eye className="h-4 w-4" />
            Quick View
          </div>
        </div>

        {/* Shine Effect */}
        <div className={cn(
          'absolute inset-0 opacity-0 pointer-events-none',
          'bg-gradient-to-r from-transparent via-white/10 to-transparent',
          '-translate-x-full transition-all duration-700',
          isHovered && 'opacity-100 translate-x-full'
        )} />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          {product.category}
        </p>

        {/* Name */}
        <h3 className={cn(
          'font-medium text-foreground line-clamp-1 transition-colors duration-300',
          isHovered && 'text-primary'
        )}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-lg">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((color, idx) => (
            <div
              key={idx}
              className={cn(
                'w-5 h-5 rounded-full border-2 border-background shadow-sm',
                'ring-1 ring-border/50 transition-transform duration-300',
                isHovered && 'scale-110'
              )}
              style={{ 
                backgroundColor: color.hex,
                transitionDelay: `${idx * 50}ms`
              }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground ml-1 font-medium">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={cn(
                  'text-xs transition-all duration-300',
                  i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-muted-foreground/30'
                )}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-muted-foreground text-xs">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </div>
    </Link>
  );
}

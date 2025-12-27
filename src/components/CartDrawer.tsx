import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils/helpers';
import { FREE_SHIPPING_THRESHOLD } from '@/data/constants';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCart();
  
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[420px] bg-background border-border flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5" />
            Shopping Bag ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Keranjang kamu kosong</p>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              asChild
            >
              <Link to="/products">
                Mulai Belanja
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="py-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Tambah {formatCurrency(amountToFreeShipping)} lagi untuk gratis ongkir!
                </p>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-blue transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4 p-3 rounded-lg bg-card/50"
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.product.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="w-20 h-24 rounded-md overflow-hidden bg-secondary flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={() => onOpenChange(false)}
                          className="font-medium text-sm line-clamp-2 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">
                        {item.size} / {item.color}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-1 bg-secondary rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-sm">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Ongkir dan pajak dihitung saat checkout
              </p>
              <Button
                asChild
                className="w-full btn-primary h-12 text-base"
                onClick={() => onOpenChange(false)}
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
                asChild
              >
                <Link to="/cart">
                  Lihat Keranjang
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

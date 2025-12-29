import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils/helpers';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, TAX_RATE } from '@/data/constants';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCart();

  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-4">Keranjang Kosong</h1>
            <p className="text-muted-foreground mb-8">
              Sepertinya kamu belum menambahkan apapun ke keranjang.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/products">Mulai Belanja</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">Keranjang Belanja</h1>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
            <Trash2 className="h-4 w-4 mr-2" />
            Kosongkan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden bg-secondary flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.product.category}
                      </p>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-medium hover:underline line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.size} / {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center gap-1 bg-secondary rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item.product.price)} / item
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className={shipping === 0 ? 'text-neon-success' : ''}>
                    {shipping === 0 ? 'GRATIS' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak (PPN 11%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                <div className="h-px bg-border" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-sm text-muted-foreground mt-4">
                  Tambah {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} lagi untuk gratis ongkir!
                </p>
              )}

              <Button asChild className="w-full btn-primary h-14 mt-6 text-lg">
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full mt-3">
                <Link to="/products">Lanjut Belanja</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

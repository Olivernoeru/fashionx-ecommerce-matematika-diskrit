import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { APP_NAME, APP_TAGLINE } from '@/data/constants';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const newProducts = getNewProducts().slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4 animate-fade-in">
            {APP_TAGLINE}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">{APP_NAME}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-2">
            Temukan koleksi fashion premium yang mengekspresikan gaya unik Anda. Kualitas terbaik, desain modern.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
            <Button asChild className="btn-primary h-14 px-10 text-lg">
              <Link to="/products">
                Mulai Belanja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-10 text-lg border-border hover:bg-secondary">
              <Link to="/products?filter=new">
                Koleksi Terbaru
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Kategori</h2>
          <p className="text-muted-foreground">Jelajahi koleksi berdasarkan kategori favorit Anda</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="category-card group aspect-square p-4 flex flex-col items-center justify-center text-center hover-lift"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-background/10 mb-3 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-medium text-sm">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Produk favorit pilihan pelanggan kami</p>
          </div>
          <Link to="/products?filter=featured" className="text-sm font-medium hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">Koleksi terbaru yang baru saja tiba</p>
          </div>
          <Link to="/products?filter=new" className="text-sm font-medium hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-blue mx-auto mb-4 flex items-center justify-center">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Gratis Ongkir</h3>
            <p className="text-sm text-muted-foreground">Untuk pembelian di atas Rp 500.000</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-blue mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Pembayaran Aman</h3>
            <p className="text-sm text-muted-foreground">Transaksi terenkripsi & terlindungi</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-blue mx-auto mb-4 flex items-center justify-center">
              <RefreshCw className="h-8 w-8" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">30 hari pengembalian gratis</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

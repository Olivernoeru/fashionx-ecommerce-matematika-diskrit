import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { APP_NAME, APP_TAGLINE } from '@/data/constants';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const newProducts = getNewProducts().slice(0, 8);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/10 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-success-neon animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">{APP_TAGLINE}</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">{APP_NAME}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            Temukan koleksi fashion premium yang mengekspresikan gaya unik Anda. 
            <span className="text-foreground font-medium"> Kualitas terbaik, desain modern.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button asChild className="btn-primary h-14 px-10 text-lg group">
              <Link to="/products">
                Mulai Belanja
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-10 text-lg border-border/50 hover:bg-secondary/50 backdrop-blur-sm">
              <Link to="/products?filter=new">
                Koleksi Terbaru
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Produk</div>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">7</div>
              <div className="text-sm text-muted-foreground mt-1">Kategori</div>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Original</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest mb-2 block">Kategori</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Jelajahi Koleksi</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Temukan berbagai kategori fashion yang sesuai dengan gaya dan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="category-card group aspect-square p-4 flex flex-col items-center justify-center text-center opacity-0 animate-scale-in"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm mb-3 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-500">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
              </div>
              <span className="font-medium text-sm group-hover:text-primary transition-colors">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Trending</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Produk favorit pilihan pelanggan kami</p>
          </div>
          <Link 
            to="/products?filter=featured" 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
          >
            Lihat Semua 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-blue p-8 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-success rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-background/20 text-sm font-medium mb-4">
              🔥 Limited Time Offer
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Diskon Hingga 50%
            </h3>
            <p className="text-lg text-foreground/80 mb-8">
              Dapatkan potongan harga spesial untuk koleksi terbaru kami. Penawaran terbatas!
            </p>
            <Button asChild className="btn-success h-12 px-8 text-base">
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-success-neon" />
              <span className="text-sm font-medium text-success-neon uppercase tracking-widest">Just In</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">Koleksi terbaru yang baru saja tiba</p>
          </div>
          <Link 
            to="/products?filter=new" 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
          >
            Lihat Semua 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: 'Gratis Ongkir', desc: 'Untuk pembelian di atas Rp 500.000', delay: 0 },
            { icon: Shield, title: 'Pembayaran Aman', desc: 'Transaksi terenkripsi & terlindungi', delay: 100 },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30 hari pengembalian gratis', delay: 200 },
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 text-center group hover-lift opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${feature.delay}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

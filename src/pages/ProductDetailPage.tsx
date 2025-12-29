import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Minus, Plus, Truck, Shield, RefreshCw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getProductsByCategory, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatCurrency, calculateDiscount } from '@/lib/utils/helpers';
import { encryptProductId } from '@/lib/crypto/hillCipher';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          <Button asChild>
            <Link to="/products">Kembali ke Shop</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.originalPrice!, product.price) : 0;
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const encryptedId = encryptProductId(product.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addItem(product.id, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-foreground capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-24 rounded-lg overflow-hidden bg-secondary ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && <span className="badge-new">NEW</span>}
              {hasDiscount && <span className="badge-sale">-{discountPercent}%</span>}
            </div>

            {/* Title & Price */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} ulasan)
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Product ID (encrypted) */}
            <p className="text-xs text-muted-foreground">
              SKU: {encryptedId}
            </p>

            {/* Color Selection */}
            <div>
              <p className="font-medium mb-3">
                Warna: <span className="text-muted-foreground">{selectedColor || 'Pilih warna'}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">
                  Ukuran: <span className="text-muted-foreground">{selectedSize || 'Pilih ukuran'}</span>
                </p>
                <button className="text-sm text-primary hover:underline">Panduan Ukuran</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-medium mb-3">Jumlah</p>
              <div className="flex items-center gap-1 bg-secondary rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted rounded-l-lg transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted rounded-r-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock */}
            <p className="text-sm text-muted-foreground">
              Stok tersedia: <span className="text-foreground font-medium">{product.stock}</span>
            </p>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                className="flex-1 btn-primary h-14 text-lg"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
              >
                Tambah ke Keranjang
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Gratis Ongkir</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Garansi Original</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">30 Hari Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">Produk Terkait</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

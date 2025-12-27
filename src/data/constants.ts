/**
 * Application Constants
 */

export const APP_NAME = 'FashionX';
export const APP_TAGLINE = 'Elevate Your Style';
export const APP_DESCRIPTION = 'Premium fashion e-commerce platform featuring curated collections of modern apparel.';

// Currency
export const CURRENCY = 'IDR';
export const CURRENCY_SYMBOL = 'Rp';

// Shipping
export const FREE_SHIPPING_THRESHOLD = 500000;
export const STANDARD_SHIPPING_COST = 25000;
export const EXPRESS_SHIPPING_COST = 50000;

// Tax
export const TAX_RATE = 0.11; // 11% PPN

// Sizes
export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const PANTS_SIZES = ['28', '30', '32', '34', '36', '38'];
export const SHOE_SIZES = ['39', '40', '41', '42', '43', '44', '45'];

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-low', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-high', label: 'Harga: Tinggi ke Rendah' },
  { value: 'popular', label: 'Paling Populer' },
  { value: 'rating', label: 'Rating Tertinggi' }
];

// Price ranges for filtering
export const PRICE_RANGES = [
  { min: 0, max: 300000, label: 'Di bawah Rp 300.000' },
  { min: 300000, max: 500000, label: 'Rp 300.000 - Rp 500.000' },
  { min: 500000, max: 1000000, label: 'Rp 500.000 - Rp 1.000.000' },
  { min: 1000000, max: 2000000, label: 'Rp 1.000.000 - Rp 2.000.000' },
  { min: 2000000, max: Infinity, label: 'Di atas Rp 2.000.000' }
];

// Order status
export const ORDER_STATUS = {
  pending: { label: 'Menunggu Pembayaran', color: 'warning' },
  confirmed: { label: 'Dikonfirmasi', color: 'info' },
  processing: { label: 'Diproses', color: 'info' },
  shipped: { label: 'Dikirim', color: 'primary' },
  delivered: { label: 'Diterima', color: 'success' },
  cancelled: { label: 'Dibatalkan', color: 'destructive' }
} as const;

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Transfer Bank', icon: 'building-2' },
  { id: 'e-wallet', name: 'E-Wallet', icon: 'wallet' },
  { id: 'credit-card', name: 'Kartu Kredit', icon: 'credit-card' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', icon: 'banknote' }
];

// Social links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/fashionx',
  twitter: 'https://twitter.com/fashionx',
  facebook: 'https://facebook.com/fashionx',
  tiktok: 'https://tiktok.com/@fashionx'
};

// Navigation links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=dress', label: 'Dress' },
  { href: '/products?category=t-shirt', label: 'T-Shirt' },
  { href: '/products?category=hoodie', label: 'Hoodie' },
  { href: '/products?category=jacket', label: 'Jacket' },
  { href: '/products?category=pants', label: 'Pants' },
  { href: '/products?category=shoes', label: 'Shoes' }
];

// Footer links
export const FOOTER_LINKS = {
  shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?filter=new', label: 'New Arrivals' },
    { href: '/products?filter=sale', label: 'Sale' },
    { href: '/products?filter=featured', label: 'Best Sellers' }
  ],
  help: [
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
    { href: '/contact', label: 'Contact Us' }
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ]
};

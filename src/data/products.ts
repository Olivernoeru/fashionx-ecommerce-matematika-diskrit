/**
 * Products Data
 * Array of all products with complete structure
 * Updated with local images
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export const products: Product[] = [
  // ==================== DRESS (D001-D005) ====================
  {
    id: 'prod-001',
    name: 'Elegant Evening Dress',
    slug: 'elegant-evening-dress',
    description: 'A stunning evening dress perfect for formal occasions. Features a flattering silhouette with premium fabric.',
    price: 1299000,
    originalPrice: 1599000,
    category: 'dress',
    subCategory: 'formal-dress',
    images: ['/images/products/D001.jpeg'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Navy', hex: '#1a1a4e' },
      { name: 'Burgundy', hex: '#480415' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4.8,
    reviews: 124,
    tags: ['formal', 'evening', 'elegant'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'prod-002',
    name: 'Casual Summer Dress',
    slug: 'casual-summer-dress',
    description: 'Light and breezy summer dress made from 100% cotton. Perfect for beach days and casual outings.',
    price: 549000,
    category: 'dress',
    subCategory: 'casual-dress',
    images: ['/images/products/D002.jpeg'],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Coral', hex: '#ff6b6b' },
      { name: 'Sky Blue', hex: '#87ceeb' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 78,
    rating: 4.5,
    reviews: 89,
    tags: ['casual', 'summer', 'cotton'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'prod-003',
    name: 'Mini Bodycon Dress',
    slug: 'mini-bodycon-dress',
    description: 'Sleek mini bodycon dress that hugs your curves. Perfect for night out.',
    price: 699000,
    category: 'dress',
    subCategory: 'mini-dress',
    images: ['/images/products/D003.jpeg'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Red', hex: '#dc2626' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 34,
    rating: 4.3,
    reviews: 56,
    tags: ['party', 'mini', 'bodycon'],
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'prod-004',
    name: 'Floral Maxi Dress',
    slug: 'floral-maxi-dress',
    description: 'Beautiful floral print maxi dress with flowing silhouette. Perfect for special occasions.',
    price: 899000,
    category: 'dress',
    subCategory: 'maxi-dress',
    images: ['/images/products/D004.jpeg'],
    colors: [
      { name: 'Floral Pink', hex: '#f8b4c4' },
      { name: 'Floral Blue', hex: '#a8d8ea' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    rating: 4.7,
    reviews: 92,
    tags: ['floral', 'maxi', 'elegant'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: 'prod-005',
    name: 'Classic A-Line Dress',
    slug: 'classic-aline-dress',
    description: 'Timeless A-line dress with modern cut. Versatile for any occasion.',
    price: 749000,
    category: 'dress',
    subCategory: 'a-line',
    images: ['/images/products/D005.jpeg'],
    colors: [
      { name: 'Beige', hex: '#d4c5b5' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 52,
    rating: 4.6,
    reviews: 78,
    tags: ['classic', 'a-line', 'versatile'],
    createdAt: Date.now() - 86400000 * 12
  },

  // ==================== HOODIE (HD001-HD005) ====================
  {
    id: 'prod-006',
    name: 'Premium Pullover Hoodie',
    slug: 'premium-pullover-hoodie',
    description: 'Heavyweight fleece pullover hoodie with kangaroo pocket. Perfect for layering.',
    price: 599000,
    originalPrice: 749000,
    category: 'hoodie',
    subCategory: 'pullover-hoodie',
    images: ['/images/products/HD001.jpeg'],
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Forest Green', hex: '#163832' },
      { name: 'Burgundy', hex: '#480415' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 56,
    rating: 4.8,
    reviews: 189,
    tags: ['hoodie', 'fleece', 'warm'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 14
  },
  {
    id: 'prod-007',
    name: 'Tech Zip-Up Hoodie',
    slug: 'tech-zip-up-hoodie',
    description: 'Modern zip-up hoodie with tech fabric. Water-resistant and breathable.',
    price: 799000,
    category: 'hoodie',
    subCategory: 'zip-hoodie',
    images: ['/images/products/HD002.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 34,
    rating: 4.7,
    reviews: 67,
    tags: ['tech', 'zip-up', 'athletic'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'prod-008',
    name: 'Oversized Street Hoodie',
    slug: 'oversized-street-hoodie',
    description: 'Trendy oversized hoodie with urban street style. Extra comfortable fit.',
    price: 649000,
    category: 'hoodie',
    subCategory: 'oversized-hoodie',
    images: ['/images/products/HD003.jfif'],
    colors: [
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 42,
    rating: 4.5,
    reviews: 98,
    tags: ['oversized', 'street', 'trendy'],
    createdAt: Date.now() - 86400000 * 6
  },
  {
    id: 'prod-009',
    name: 'Classic Cotton Hoodie',
    slug: 'classic-cotton-hoodie',
    description: 'Essential cotton blend hoodie. Soft, durable, and perfect for everyday wear.',
    price: 499000,
    category: 'hoodie',
    subCategory: 'basic-hoodie',
    images: ['/images/products/HD004.jfif'],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Grey Melange', hex: '#9ca3af' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 85,
    rating: 4.6,
    reviews: 156,
    tags: ['cotton', 'basic', 'essential'],
    createdAt: Date.now() - 86400000 * 20
  },
  {
    id: 'prod-010',
    name: 'Athletic Performance Hoodie',
    slug: 'athletic-performance-hoodie',
    description: 'High-performance hoodie for sports and workout. Moisture-wicking fabric.',
    price: 699000,
    category: 'hoodie',
    subCategory: 'athletic-hoodie',
    images: ['/images/products/HD005.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Steel Blue', hex: '#4682b4' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 38,
    rating: 4.7,
    reviews: 72,
    tags: ['athletic', 'performance', 'sports'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 3
  },

  // ==================== JACKET (J001-J010) ====================
  {
    id: 'prod-011',
    name: 'Classic Bomber Jacket',
    slug: 'classic-bomber-jacket',
    description: 'Iconic bomber jacket with ribbed cuffs and hem. Timeless military-inspired style.',
    price: 1199000,
    originalPrice: 1499000,
    category: 'jacket',
    subCategory: 'bomber-jacket',
    images: ['/images/products/J001.jpeg'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 23,
    rating: 4.8,
    reviews: 167,
    tags: ['bomber', 'military', 'classic'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 25
  },
  {
    id: 'prod-012',
    name: 'Vintage Denim Jacket',
    slug: 'vintage-denim-jacket',
    description: 'Washed denim jacket with vintage finish. A wardrobe essential.',
    price: 899000,
    category: 'jacket',
    subCategory: 'denim-jacket',
    images: ['/images/products/J002.jpeg'],
    colors: [
      { name: 'Light Wash', hex: '#b4c7dc' },
      { name: 'Dark Wash', hex: '#1a3c5c' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4.5,
    reviews: 92,
    tags: ['denim', 'vintage', 'casual'],
    createdAt: Date.now() - 86400000 * 18
  },
  {
    id: 'prod-013',
    name: 'Premium Leather Jacket',
    slug: 'premium-leather-jacket',
    description: 'Genuine leather biker jacket. Premium craftsmanship with bold attitude.',
    price: 2999000,
    category: 'jacket',
    subCategory: 'leather-jacket',
    images: ['/images/products/J003.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Brown', hex: '#5d4037' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    rating: 4.9,
    reviews: 89,
    tags: ['leather', 'biker', 'premium'],
    isNew: true,
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'prod-014',
    name: 'Windbreaker Jacket',
    slug: 'windbreaker-jacket',
    description: 'Lightweight windbreaker with water-resistant coating. Perfect for outdoor activities.',
    price: 749000,
    category: 'jacket',
    subCategory: 'windbreaker',
    images: ['/images/products/J004.jfif'],
    colors: [
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Orange', hex: '#f97316' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 67,
    rating: 4.4,
    reviews: 78,
    tags: ['windbreaker', 'outdoor', 'lightweight'],
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: 'prod-015',
    name: 'Quilted Puffer Jacket',
    slug: 'quilted-puffer-jacket',
    description: 'Warm quilted puffer jacket with down filling. Cozy winter essential.',
    price: 1499000,
    category: 'jacket',
    subCategory: 'puffer-jacket',
    images: ['/images/products/J005.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Cream', hex: '#fffdd0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    rating: 4.7,
    reviews: 134,
    tags: ['puffer', 'winter', 'warm'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 22
  },
  {
    id: 'prod-016',
    name: 'Varsity Letterman Jacket',
    slug: 'varsity-letterman-jacket',
    description: 'Classic varsity jacket with leather sleeves. American college style.',
    price: 1099000,
    category: 'jacket',
    subCategory: 'varsity-jacket',
    images: ['/images/products/J006.jfif'],
    colors: [
      { name: 'Black/White', hex: '#0f0f0f' },
      { name: 'Navy/Grey', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    rating: 4.6,
    reviews: 87,
    tags: ['varsity', 'letterman', 'college'],
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'prod-017',
    name: 'Suede Trucker Jacket',
    slug: 'suede-trucker-jacket',
    description: 'Premium suede trucker jacket with sherpa lining. Luxurious texture.',
    price: 1899000,
    category: 'jacket',
    subCategory: 'trucker-jacket',
    images: ['/images/products/J007.jfif'],
    colors: [
      { name: 'Tan', hex: '#d2b48c' },
      { name: 'Brown', hex: '#5d4037' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.8,
    reviews: 56,
    tags: ['suede', 'trucker', 'luxury'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'prod-018',
    name: 'Minimalist Coach Jacket',
    slug: 'minimalist-coach-jacket',
    description: 'Clean-cut coach jacket with snap buttons. Simple yet stylish.',
    price: 649000,
    category: 'jacket',
    subCategory: 'coach-jacket',
    images: ['/images/products/J008.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Khaki', hex: '#c3b091' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 54,
    rating: 4.4,
    reviews: 65,
    tags: ['coach', 'minimalist', 'casual'],
    createdAt: Date.now() - 86400000 * 16
  },
  {
    id: 'prod-019',
    name: 'Utility Field Jacket',
    slug: 'utility-field-jacket',
    description: 'Military-inspired field jacket with multiple pockets. Functional fashion.',
    price: 999000,
    category: 'jacket',
    subCategory: 'field-jacket',
    images: ['/images/products/J009.jfif'],
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 32,
    rating: 4.6,
    reviews: 98,
    tags: ['utility', 'field', 'military'],
    createdAt: Date.now() - 86400000 * 19
  },
  {
    id: 'prod-020',
    name: 'Cropped Moto Jacket',
    slug: 'cropped-moto-jacket',
    description: 'Edgy cropped motorcycle jacket with asymmetric zip. Bold statement piece.',
    price: 1299000,
    category: 'jacket',
    subCategory: 'moto-jacket',
    images: ['/images/products/J010.jpeg'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Red', hex: '#dc2626' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
    rating: 4.7,
    reviews: 73,
    tags: ['moto', 'cropped', 'edgy'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 5
  },

  // ==================== KEMEJA (KJ001-KJ005) ====================
  {
    id: 'prod-021',
    name: 'Classic Oxford Shirt',
    slug: 'classic-oxford-shirt',
    description: 'Timeless oxford shirt in premium cotton. Perfect for business casual.',
    price: 449000,
    category: 'kemeja',
    subCategory: 'oxford-shirt',
    images: ['/images/products/KJ001.jpeg'],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Light Blue', hex: '#87ceeb' },
      { name: 'Pink', hex: '#ffc0cb' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 92,
    rating: 4.7,
    reviews: 187,
    tags: ['oxford', 'business', 'classic'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'prod-022',
    name: 'Linen Summer Shirt',
    slug: 'linen-summer-shirt',
    description: 'Breathable linen shirt for hot summer days. Relaxed and comfortable.',
    price: 549000,
    category: 'kemeja',
    subCategory: 'linen-shirt',
    images: ['/images/products/KJ002.jpeg'],
    colors: [
      { name: 'Natural', hex: '#f5f5dc' },
      { name: 'Sage', hex: '#9caf88' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 48,
    rating: 4.5,
    reviews: 76,
    tags: ['linen', 'summer', 'breathable'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'prod-023',
    name: 'Flannel Check Shirt',
    slug: 'flannel-check-shirt',
    description: 'Cozy flannel shirt with classic check pattern. Perfect for layering.',
    price: 499000,
    category: 'kemeja',
    subCategory: 'flannel-shirt',
    images: ['/images/products/KJ003.jpeg'],
    colors: [
      { name: 'Red Check', hex: '#dc2626' },
      { name: 'Blue Check', hex: '#2563eb' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 65,
    rating: 4.6,
    reviews: 112,
    tags: ['flannel', 'check', 'warm'],
    createdAt: Date.now() - 86400000 * 14
  },
  {
    id: 'prod-024',
    name: 'Slim Fit Dress Shirt',
    slug: 'slim-fit-dress-shirt',
    description: 'Sleek slim fit dress shirt for formal occasions. Crisp and professional.',
    price: 599000,
    category: 'kemeja',
    subCategory: 'dress-shirt',
    images: ['/images/products/KJ004.jpeg'],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 78,
    rating: 4.8,
    reviews: 145,
    tags: ['dress', 'formal', 'slim'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 28
  },
  {
    id: 'prod-025',
    name: 'Denim Western Shirt',
    slug: 'denim-western-shirt',
    description: 'Rugged denim shirt with western details. Vintage Americana style.',
    price: 549000,
    category: 'kemeja',
    subCategory: 'denim-shirt',
    images: ['/images/products/KJ005.jpeg'],
    colors: [
      { name: 'Medium Wash', hex: '#6b8cae' },
      { name: 'Dark Wash', hex: '#1a3c5c' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42,
    rating: 4.5,
    reviews: 67,
    tags: ['denim', 'western', 'vintage'],
    createdAt: Date.now() - 86400000 * 21
  },

  // ==================== PANTS (P001-P007) ====================
  {
    id: 'prod-026',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Classic slim fit jeans with stretch comfort. Versatile everyday essential.',
    price: 649000,
    category: 'pants',
    subCategory: 'jeans',
    images: ['/images/products/P001.jfif'],
    colors: [
      { name: 'Indigo', hex: '#3f51b5' },
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Light Blue', hex: '#87ceeb' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 120,
    rating: 4.6,
    reviews: 234,
    tags: ['jeans', 'slim', 'denim'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 40
  },
  {
    id: 'prod-027',
    name: 'Tailored Chinos',
    slug: 'tailored-chinos',
    description: 'Smart casual chinos with tailored fit. Perfect for office or weekend.',
    price: 549000,
    category: 'pants',
    subCategory: 'chinos',
    images: ['/images/products/P002.jfif'],
    colors: [
      { name: 'Khaki', hex: '#c3b091' },
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Olive', hex: '#556b2f' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 87,
    rating: 4.5,
    reviews: 156,
    tags: ['chinos', 'smart-casual', 'tailored'],
    createdAt: Date.now() - 86400000 * 22
  },
  {
    id: 'prod-028',
    name: 'Urban Joggers',
    slug: 'urban-joggers',
    description: 'Comfortable joggers with tapered fit. Athleisure meets street style.',
    price: 449000,
    category: 'pants',
    subCategory: 'joggers',
    images: ['/images/products/P003.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Olive', hex: '#556b2f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 98,
    rating: 4.7,
    reviews: 189,
    tags: ['joggers', 'athleisure', 'comfort'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'prod-029',
    name: 'Wide Leg Trousers',
    slug: 'wide-leg-trousers',
    description: 'Trendy wide leg trousers with high waist. Modern silhouette.',
    price: 699000,
    category: 'pants',
    subCategory: 'trousers',
    images: ['/images/products/P004.jfif'],
    colors: [
      { name: 'Beige', hex: '#d4c5b5' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 54,
    rating: 4.4,
    reviews: 87,
    tags: ['wide-leg', 'trendy', 'high-waist'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'prod-030',
    name: 'Cargo Pants',
    slug: 'cargo-pants',
    description: 'Functional cargo pants with multiple pockets. Streetwear essential.',
    price: 599000,
    category: 'pants',
    subCategory: 'cargo',
    images: ['/images/products/P005.jfif'],
    colors: [
      { name: 'Khaki', hex: '#c3b091' },
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Olive', hex: '#556b2f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 72,
    rating: 4.5,
    reviews: 134,
    tags: ['cargo', 'streetwear', 'functional'],
    createdAt: Date.now() - 86400000 * 17
  },
  {
    id: 'prod-031',
    name: 'Pleated Dress Pants',
    slug: 'pleated-dress-pants',
    description: 'Elegant pleated dress pants for formal occasions. Classic sophistication.',
    price: 749000,
    category: 'pants',
    subCategory: 'dress-pants',
    images: ['/images/products/P006.jfif'],
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 45,
    rating: 4.7,
    reviews: 98,
    tags: ['pleated', 'formal', 'elegant'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 35
  },
  {
    id: 'prod-032',
    name: 'Relaxed Fit Shorts',
    slug: 'relaxed-fit-shorts',
    description: 'Comfortable relaxed fit shorts for summer. Casual and cool.',
    price: 349000,
    category: 'pants',
    subCategory: 'shorts',
    images: ['/images/products/P007.jfif'],
    colors: [
      { name: 'Beige', hex: '#d4c5b5' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 89,
    rating: 4.3,
    reviews: 67,
    tags: ['shorts', 'summer', 'relaxed'],
    createdAt: Date.now() - 86400000 * 10
  },

  // ==================== SWEATER (S001-S009) ====================
  {
    id: 'prod-033',
    name: 'Merino Wool Crewneck',
    slug: 'merino-wool-crewneck',
    description: 'Luxurious merino wool sweater. Soft, warm, and naturally temperature regulating.',
    price: 899000,
    category: 'sweater',
    images: ['/images/products/S001.jpeg'],
    colors: [
      { name: 'Camel', hex: '#c19a6b' },
      { name: 'Oatmeal', hex: '#d4c4a8' },
      { name: 'Charcoal', hex: '#36454f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    rating: 4.9,
    reviews: 145,
    tags: ['wool', 'luxury', 'classic'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 20
  },
  {
    id: 'prod-034',
    name: 'Cable Knit Sweater',
    slug: 'cable-knit-sweater',
    description: 'Classic cable knit pattern sweater. Timeless design with modern fit.',
    price: 749000,
    category: 'sweater',
    images: ['/images/products/S002.jfif'],
    colors: [
      { name: 'Cream', hex: '#fffdd0' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42,
    rating: 4.6,
    reviews: 78,
    tags: ['cable-knit', 'classic', 'warm'],
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: 'prod-035',
    name: 'Cashmere V-Neck',
    slug: 'cashmere-vneck',
    description: 'Pure cashmere V-neck sweater. Ultimate luxury and softness.',
    price: 1499000,
    category: 'sweater',
    images: ['/images/products/S003.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Burgundy', hex: '#480415' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.9,
    reviews: 92,
    tags: ['cashmere', 'luxury', 'v-neck'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 25
  },
  {
    id: 'prod-036',
    name: 'Chunky Turtleneck',
    slug: 'chunky-turtleneck',
    description: 'Cozy chunky turtleneck sweater. Perfect for cold winter days.',
    price: 799000,
    category: 'sweater',
    images: ['/images/products/S004.jfif'],
    colors: [
      { name: 'Cream', hex: '#fffdd0' },
      { name: 'Brown', hex: '#5d4037' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    rating: 4.7,
    reviews: 118,
    tags: ['chunky', 'turtleneck', 'winter'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'prod-037',
    name: 'Striped Pullover',
    slug: 'striped-pullover',
    description: 'Classic striped pullover sweater. Nautical-inspired style.',
    price: 599000,
    category: 'sweater',
    images: ['/images/products/S005.jfif'],
    colors: [
      { name: 'Navy/White', hex: '#1e3a5f' },
      { name: 'Black/Grey', hex: '#0f0f0f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 58,
    rating: 4.5,
    reviews: 87,
    tags: ['striped', 'nautical', 'casual'],
    createdAt: Date.now() - 86400000 * 18
  },
  {
    id: 'prod-038',
    name: 'Oversized Knit Sweater',
    slug: 'oversized-knit-sweater',
    description: 'Trendy oversized knit sweater. Relaxed fit for ultimate comfort.',
    price: 699000,
    category: 'sweater',
    images: ['/images/products/S006.jfif'],
    colors: [
      { name: 'Sage', hex: '#9caf88' },
      { name: 'Lavender', hex: '#e6e6fa' }
    ],
    sizes: ['S/M', 'M/L', 'L/XL'],
    stock: 44,
    rating: 4.6,
    reviews: 96,
    tags: ['oversized', 'trendy', 'cozy'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'prod-039',
    name: 'Cardigan Sweater',
    slug: 'cardigan-sweater',
    description: 'Versatile button-up cardigan. Perfect for layering in any season.',
    price: 649000,
    category: 'sweater',
    images: ['/images/products/S007.jfif'],
    colors: [
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Burgundy', hex: '#480415' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 62,
    rating: 4.5,
    reviews: 78,
    tags: ['cardigan', 'versatile', 'layering'],
    createdAt: Date.now() - 86400000 * 22
  },
  {
    id: 'prod-040',
    name: 'Mock Neck Sweater',
    slug: 'mock-neck-sweater',
    description: 'Sleek mock neck sweater with ribbed texture. Modern minimalist design.',
    price: 549000,
    category: 'sweater',
    images: ['/images/products/S008.jfif'],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Beige', hex: '#d4c5b5' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 48,
    rating: 4.4,
    reviews: 65,
    tags: ['mock-neck', 'minimalist', 'modern'],
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'prod-041',
    name: 'Colorblock Sweater',
    slug: 'colorblock-sweater',
    description: 'Bold colorblock design sweater. Make a statement with color.',
    price: 599000,
    category: 'sweater',
    images: ['/images/products/S009.jfif'],
    colors: [
      { name: 'Blue/Green', hex: '#2563eb' },
      { name: 'Red/Orange', hex: '#dc2626' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 38,
    rating: 4.3,
    reviews: 54,
    tags: ['colorblock', 'bold', 'statement'],
    createdAt: Date.now() - 86400000 * 8
  },

  // ==================== SHOES (SH001-SH005) ====================
  {
    id: 'prod-042',
    name: 'Air Jordan Low',
    slug: 'air-jordan-low',
    description: 'Classic Air Jordan low-top sneakers. Iconic basketball heritage with street style.',
    price: 1799000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: ['/images/products/SH001.jpeg'],
    colors: [
      { name: 'White/Grey', hex: '#9ca3af' },
      { name: 'Black/White', hex: '#0f0f0f' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    stock: 34,
    rating: 4.9,
    reviews: 287,
    tags: ['jordan', 'sneakers', 'basketball'],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'prod-043',
    name: 'Air Jordan 4 Retro',
    slug: 'air-jordan-4-retro',
    description: 'Premium Air Jordan 4 Retro edition. Legendary design meets modern comfort.',
    price: 2499000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: ['/images/products/SH002.jpeg'],
    colors: [
      { name: 'Bordeaux/White', hex: '#722f37' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    stock: 22,
    rating: 4.9,
    reviews: 198,
    tags: ['jordan', 'retro', 'premium'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    id: 'prod-044',
    name: 'Nike Dunk Low',
    slug: 'nike-dunk-low',
    description: 'Iconic Nike Dunk Low sneakers. Timeless basketball style for everyday wear.',
    price: 1599000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: ['/images/products/SH003.jpeg'],
    colors: [
      { name: 'Grey/White', hex: '#9ca3af' },
      { name: 'Black/White', hex: '#0f0f0f' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 45,
    rating: 4.8,
    reviews: 234,
    tags: ['nike', 'dunk', 'classic'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'prod-045',
    name: 'Nike SB Dunk',
    slug: 'nike-sb-dunk',
    description: 'Nike SB Dunk for skateboarding. Enhanced cushioning and grip.',
    price: 1699000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: ['/images/products/SH004.jpeg'],
    colors: [
      { name: 'Grey/Cream', hex: '#9ca3af' },
      { name: 'Blue/White', hex: '#3b82f6' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    stock: 28,
    rating: 4.7,
    reviews: 156,
    tags: ['nike', 'sb', 'skateboard'],
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'prod-046',
    name: 'Air Jordan 4 Moss',
    slug: 'air-jordan-4-moss',
    description: 'Limited edition Air Jordan 4 in Moss colorway. Premium materials and unique design.',
    price: 2799000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: ['/images/products/SH005.jpeg'],
    colors: [
      { name: 'Moss/Cream', hex: '#8a9a5b' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    stock: 15,
    rating: 4.9,
    reviews: 89,
    tags: ['jordan', 'limited', 'premium'],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 86400000 * 2
  }
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

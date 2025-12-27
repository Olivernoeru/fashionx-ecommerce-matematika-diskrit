/**
 * Products Data
 * Array of all products with complete structure
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
  // DRESS
  {
    id: 'prod-001',
    name: 'Elegant Evening Dress',
    slug: 'elegant-evening-dress',
    description: 'A stunning evening dress perfect for formal occasions. Features a flattering silhouette with premium fabric.',
    price: 1299000,
    originalPrice: 1599000,
    category: 'dress',
    subCategory: 'formal-dress',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800'
    ],
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

  // T-SHIRT
  {
    id: 'prod-004',
    name: 'Essential Cotton Tee',
    slug: 'essential-cotton-tee',
    description: 'Premium 100% organic cotton t-shirt. Soft, breathable, and perfect for everyday wear.',
    price: 199000,
    category: 't-shirt',
    subCategory: 'basic-tee',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
    ],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 200,
    rating: 4.9,
    reviews: 342,
    tags: ['basic', 'essential', 'cotton'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'prod-005',
    name: 'Urban Graphic Tee',
    slug: 'urban-graphic-tee',
    description: 'Bold graphic print t-shirt with urban street art design. Make a statement.',
    price: 299000,
    category: 't-shirt',
    subCategory: 'graphic-tee',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800'
    ],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'White', hex: '#faf8f6' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 67,
    rating: 4.4,
    reviews: 78,
    tags: ['graphic', 'urban', 'streetwear'],
    isNew: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'prod-006',
    name: 'Oversized Drop Shoulder Tee',
    slug: 'oversized-drop-shoulder-tee',
    description: 'Relaxed oversized fit with dropped shoulders. Ultimate comfort meets style.',
    price: 349000,
    category: 't-shirt',
    subCategory: 'oversized-tee',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800'
    ],
    colors: [
      { name: 'Cream', hex: '#f5f5dc' },
      { name: 'Sage', hex: '#9caf88' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 89,
    rating: 4.6,
    reviews: 112,
    tags: ['oversized', 'relaxed', 'comfort'],
    createdAt: Date.now() - 86400000 * 7
  },

  // HOODIE
  {
    id: 'prod-007',
    name: 'Premium Pullover Hoodie',
    slug: 'premium-pullover-hoodie',
    description: 'Heavyweight fleece pullover hoodie with kangaroo pocket. Perfect for layering.',
    price: 599000,
    originalPrice: 749000,
    category: 'hoodie',
    subCategory: 'pullover-hoodie',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800'
    ],
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
    id: 'prod-008',
    name: 'Tech Zip-Up Hoodie',
    slug: 'tech-zip-up-hoodie',
    description: 'Modern zip-up hoodie with tech fabric. Water-resistant and breathable.',
    price: 799000,
    category: 'hoodie',
    subCategory: 'zip-hoodie',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800'
    ],
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

  // SWEATER
  {
    id: 'prod-009',
    name: 'Merino Wool Crewneck',
    slug: 'merino-wool-crewneck',
    description: 'Luxurious merino wool sweater. Soft, warm, and naturally temperature regulating.',
    price: 899000,
    category: 'sweater',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
    ],
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
    id: 'prod-010',
    name: 'Cable Knit Sweater',
    slug: 'cable-knit-sweater',
    description: 'Classic cable knit pattern sweater. Timeless design with modern fit.',
    price: 749000,
    category: 'sweater',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'
    ],
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

  // JACKET
  {
    id: 'prod-011',
    name: 'Classic Bomber Jacket',
    slug: 'classic-bomber-jacket',
    description: 'Iconic bomber jacket with ribbed cuffs and hem. Timeless military-inspired style.',
    price: 1199000,
    originalPrice: 1499000,
    category: 'jacket',
    subCategory: 'bomber-jacket',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'
    ],
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
    createdAt: Date.now() - 86400000 * 2
  },

  // PANTS
  {
    id: 'prod-014',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Classic slim fit jeans with stretch comfort. Versatile everyday essential.',
    price: 649000,
    category: 'pants',
    subCategory: 'jeans',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'
    ],
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
    id: 'prod-015',
    name: 'Tailored Chinos',
    slug: 'tailored-chinos',
    description: 'Smart casual chinos with tailored fit. Perfect for office or weekend.',
    price: 549000,
    category: 'pants',
    subCategory: 'chinos',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800'
    ],
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
    id: 'prod-016',
    name: 'Urban Joggers',
    slug: 'urban-joggers',
    description: 'Comfortable joggers with tapered fit. Athleisure meets street style.',
    price: 449000,
    category: 'pants',
    subCategory: 'joggers',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800'
    ],
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

  // SHOES
  {
    id: 'prod-017',
    name: 'Classic White Sneakers',
    slug: 'classic-white-sneakers',
    description: 'Minimalist white leather sneakers. Clean design that goes with everything.',
    price: 999000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800'
    ],
    colors: [
      { name: 'White', hex: '#faf8f6' },
      { name: 'Black', hex: '#0f0f0f' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    stock: 67,
    rating: 4.8,
    reviews: 278,
    tags: ['sneakers', 'minimal', 'leather'],
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 35
  },
  {
    id: 'prod-018',
    name: 'Chelsea Boots',
    slug: 'chelsea-boots',
    description: 'Timeless Chelsea boots in premium leather. Elastic side panels for easy wear.',
    price: 1499000,
    category: 'shoes',
    subCategory: 'boots',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800'
    ],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Brown', hex: '#5d4037' },
      { name: 'Tan', hex: '#d2b48c' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 34,
    rating: 4.7,
    reviews: 123,
    tags: ['boots', 'chelsea', 'leather'],
    createdAt: Date.now() - 86400000 * 28
  },
  {
    id: 'prod-019',
    name: 'Comfort Slide Sandals',
    slug: 'comfort-slide-sandals',
    description: 'Ergonomic slide sandals with cushioned footbed. Perfect for home and casual wear.',
    price: 299000,
    category: 'shoes',
    subCategory: 'sandals',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800'
    ],
    colors: [
      { name: 'Black', hex: '#0f0f0f' },
      { name: 'Beige', hex: '#f5f5dc' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 156,
    rating: 4.4,
    reviews: 89,
    tags: ['sandals', 'slides', 'comfort'],
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'prod-020',
    name: 'Running Performance Sneakers',
    slug: 'running-performance-sneakers',
    description: 'High-performance running shoes with responsive cushioning and breathable mesh.',
    price: 1299000,
    category: 'shoes',
    subCategory: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    colors: [
      { name: 'Black/Red', hex: '#dc2626' },
      { name: 'White/Blue', hex: '#3b82f6' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    stock: 45,
    rating: 4.9,
    reviews: 312,
    tags: ['running', 'performance', 'athletic'],
    isNew: true,
    isFeatured: true,
    createdAt: Date.now() - 86400000 * 1
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

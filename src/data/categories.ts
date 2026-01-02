/**
 * Categories Data
 * Category hierarchy using Graph Theory concepts
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  order: number;
}

export const categories: Category[] = [
  {
    id: 'dress',
    name: 'Dress',
    slug: 'dress',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    order: 1
  },
  {
    id: 'kemeja',
    name: 'Kemeja',
    slug: 'kemeja',
    description: 'Stylish shirts for any occasion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    order: 2
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    slug: 'hoodie',
    description: 'Cozy hoodies for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    order: 3
  },
  {
    id: 'sweater',
    name: 'Sweater',
    slug: 'sweater',
    description: 'Warm sweaters for cold days',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
    order: 4
  },
  {
    id: 'jacket',
    name: 'Jacket',
    slug: 'jacket',
    description: 'Stylish jackets for any weather',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    order: 5
  },
  {
    id: 'pants',
    name: 'Pants',
    slug: 'pants',
    description: 'Perfect fit pants and bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
    order: 6
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Footwear for every step',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    order: 7
  }
];

// Sub-categories
export const subCategories: Category[] = [
  // Dress
  { id: 'casual-dress', name: 'Casual Dress', slug: 'casual-dress', description: '', image: '', parentId: 'dress', order: 1 },
  { id: 'formal-dress', name: 'Formal Dress', slug: 'formal-dress', description: '', image: '', parentId: 'dress', order: 2 },
  { id: 'mini-dress', name: 'Mini Dress', slug: 'mini-dress', description: '', image: '', parentId: 'dress', order: 3 },
  
  // Kemeja
  { id: 'oxford-shirt', name: 'Oxford Shirt', slug: 'oxford-shirt', description: '', image: '', parentId: 'kemeja', order: 1 },
  { id: 'linen-shirt', name: 'Linen Shirt', slug: 'linen-shirt', description: '', image: '', parentId: 'kemeja', order: 2 },
  { id: 'flannel-shirt', name: 'Flannel Shirt', slug: 'flannel-shirt', description: '', image: '', parentId: 'kemeja', order: 3 },
  { id: 'dress-shirt', name: 'Dress Shirt', slug: 'dress-shirt', description: '', image: '', parentId: 'kemeja', order: 4 },
  
  // Hoodie
  { id: 'pullover-hoodie', name: 'Pullover', slug: 'pullover-hoodie', description: '', image: '', parentId: 'hoodie', order: 1 },
  { id: 'zip-hoodie', name: 'Zip-Up', slug: 'zip-hoodie', description: '', image: '', parentId: 'hoodie', order: 2 },
  
  // Jacket
  { id: 'bomber-jacket', name: 'Bomber', slug: 'bomber-jacket', description: '', image: '', parentId: 'jacket', order: 1 },
  { id: 'denim-jacket', name: 'Denim', slug: 'denim-jacket', description: '', image: '', parentId: 'jacket', order: 2 },
  { id: 'leather-jacket', name: 'Leather', slug: 'leather-jacket', description: '', image: '', parentId: 'jacket', order: 3 },
  
  // Pants
  { id: 'jeans', name: 'Jeans', slug: 'jeans', description: '', image: '', parentId: 'pants', order: 1 },
  { id: 'chinos', name: 'Chinos', slug: 'chinos', description: '', image: '', parentId: 'pants', order: 2 },
  { id: 'joggers', name: 'Joggers', slug: 'joggers', description: '', image: '', parentId: 'pants', order: 3 },
  
  // Shoes
  { id: 'sneakers', name: 'Sneakers', slug: 'sneakers', description: '', image: '', parentId: 'shoes', order: 1 },
  { id: 'boots', name: 'Boots', slug: 'boots', description: '', image: '', parentId: 'shoes', order: 2 },
  { id: 'sandals', name: 'Sandals', slug: 'sandals', description: '', image: '', parentId: 'shoes', order: 3 }
];

// Helper functions
export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id) || subCategories.find(c => c.id === id);
}

export function getSubCategories(parentId: string): Category[] {
  return subCategories.filter(c => c.parentId === parentId);
}

export function getCategoryPath(categoryId: string): Category[] {
  const path: Category[] = [];
  let current = getCategoryById(categoryId);
  
  while (current) {
    path.unshift(current);
    current = current.parentId ? getCategoryById(current.parentId) : undefined;
  }
  
  return path;
}

export function getAllCategories(): Category[] {
  return [...categories, ...subCategories];
}

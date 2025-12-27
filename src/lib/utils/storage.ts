/**
 * LocalStorage Management
 * Simulasi database untuk demo purposes
 */

const STORAGE_PREFIX = 'fashionx_';

export interface StorageSchema {
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  wishlist: string[];
  recentlyViewed: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  addedAt: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
  role: string;
  createdAt: number;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: number;
  updatedAt: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Get item from localStorage
 */
export function getStorageItem<K extends keyof StorageSchema>(key: K): StorageSchema[K] | null {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return null;
  }
}

/**
 * Set item to localStorage
 */
export function setStorageItem<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to storage:`, error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: keyof StorageSchema): void {
  localStorage.removeItem(STORAGE_PREFIX + key);
}

/**
 * Clear all FashionX data from localStorage
 */
export function clearAllStorage(): void {
  Object.keys(localStorage)
    .filter(key => key.startsWith(STORAGE_PREFIX))
    .forEach(key => localStorage.removeItem(key));
}

// Cart specific helpers
export function getCart(): CartItem[] {
  return getStorageItem('cart') || [];
}

export function saveCart(cart: CartItem[]): void {
  setStorageItem('cart', cart);
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    i => i.productId === item.productId && i.size === item.size && i.color === item.color
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push({ ...item, addedAt: Date.now() });
  }
  
  saveCart(cart);
}

export function removeFromCart(productId: string, size: string, color: string): void {
  const cart = getCart();
  const filteredCart = cart.filter(
    i => !(i.productId === productId && i.size === size && i.color === color)
  );
  saveCart(filteredCart);
}

export function updateCartQuantity(productId: string, size: string, color: string, quantity: number): void {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    i => i.productId === productId && i.size === size && i.color === color
  );
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
}

export function clearCart(): void {
  setStorageItem('cart', []);
}

// Orders helpers
export function getOrders(): Order[] {
  return getStorageItem('orders') || [];
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  setStorageItem('orders', orders);
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = Date.now();
    setStorageItem('orders', orders);
  }
}

// User helpers
export function getUser(): User | null {
  return getStorageItem('user');
}

export function saveUser(user: User): void {
  setStorageItem('user', user);
}

export function logoutUser(): void {
  removeStorageItem('user');
}

// Recently viewed
export function addToRecentlyViewed(productId: string, maxItems: number = 10): void {
  let recentlyViewed = getStorageItem('recentlyViewed') || [];
  
  // Remove if already exists
  recentlyViewed = recentlyViewed.filter(id => id !== productId);
  
  // Add to front
  recentlyViewed.unshift(productId);
  
  // Keep only maxItems
  recentlyViewed = recentlyViewed.slice(0, maxItems);
  
  setStorageItem('recentlyViewed', recentlyViewed);
}

export function getRecentlyViewed(): string[] {
  return getStorageItem('recentlyViewed') || [];
}

// Wishlist
export function getWishlist(): string[] {
  return getStorageItem('wishlist') || [];
}

export function toggleWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index >= 0) {
    wishlist.splice(index, 1);
    setStorageItem('wishlist', wishlist);
    return false; // Removed
  } else {
    wishlist.push(productId);
    setStorageItem('wishlist', wishlist);
    return true; // Added
  }
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().includes(productId);
}

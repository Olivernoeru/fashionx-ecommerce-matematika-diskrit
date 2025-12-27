import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, getProductById } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  isInCart: (productId: string, size: string, color: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fashionx_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Rehydrate products
        const rehydrated = parsed
          .map((item: { productId: string; quantity: number; size: string; color: string }) => {
            const product = getProductById(item.productId);
            if (product) {
              return { ...item, product };
            }
            return null;
          })
          .filter(Boolean);
        setItems(rehydrated);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const toSave = items.map(({ productId, quantity, size, color }) => ({
      productId,
      quantity,
      size,
      color
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toSave));
  }, [items]);

  const addItem = useCallback((productId: string, size: string, color: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) {
      toast({
        title: 'Error',
        description: 'Product not found',
        variant: 'destructive'
      });
      return;
    }

    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toast({
          title: 'Keranjang Diperbarui',
          description: `${product.name} quantity updated`
        });
        return updated;
      }

      toast({
        title: 'Ditambahkan ke Keranjang',
        description: `${product.name} - ${size} - ${color}`
      });

      return [...prev, { productId, product, quantity, size, color }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems(prev => {
      const item = prev.find(
        i => i.productId === productId && i.size === size && i.color === color
      );
      if (item) {
        toast({
          title: 'Dihapus dari Keranjang',
          description: item.product.name
        });
      }
      return prev.filter(
        i => !(i.productId === productId && i.size === size && i.color === color)
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    toast({
      title: 'Keranjang Dikosongkan',
      description: 'Semua item telah dihapus'
    });
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [items]);

  const isInCart = useCallback((productId: string, size: string, color: string) => {
    return items.some(
      item => item.productId === productId && item.size === size && item.color === color
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

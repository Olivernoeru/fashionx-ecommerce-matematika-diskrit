/**
 * Helper utilities
 */

/**
 * Format currency to IDR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);
}

/**
 * Format datetime
 */
export function formatDateTime(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Slugify string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Get random items from array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indonesian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

/**
 * Format phone number to +62 format
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\s|-/g, '');
  if (cleaned.startsWith('0')) {
    return '+62' + cleaned.substring(1);
  }
  if (cleaned.startsWith('62')) {
    return '+' + cleaned;
  }
  return cleaned;
}

/**
 * Calculate shipping cost based on weight and destination
 */
export function calculateShipping(weightGrams: number, destination: string): number {
  const baseRate = 15000; // Base rate
  const perKgRate = 5000; // Per kg rate
  
  const weightKg = Math.ceil(weightGrams / 1000);
  
  // Simplified zone-based pricing
  const zoneMultiplier = destination.toLowerCase().includes('jakarta') ? 1 : 1.5;
  
  return Math.round((baseRate + (weightKg * perKgRate)) * zoneMultiplier);
}

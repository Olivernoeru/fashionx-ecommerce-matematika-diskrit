/**
 * Hash Implementation
 * Simple hash functions for password hashing and data integrity
 * 
 * Catatan: Ini adalah implementasi sederhana untuk demo.
 * Untuk production, gunakan bcrypt atau argon2.
 */

/**
 * Simple hash function menggunakan djb2 algorithm
 * @param str - String yang akan di-hash
 * @returns Hash value sebagai hex string
 */
export function simpleHash(str: string): string {
  let hash = 5381;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; // hash * 33 + char
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to positive hex string
  const positiveHash = hash >>> 0;
  return positiveHash.toString(16).padStart(8, '0');
}

/**
 * Hash password dengan salt
 * @param password - Password yang akan di-hash
 * @param salt - Salt untuk keamanan tambahan (optional)
 * @returns Hashed password
 */
export function hashPassword(password: string, salt: string = 'FashionX2024'): string {
  const salted = salt + password + salt;
  
  // Multiple rounds of hashing untuk keamanan
  let hash = salted;
  for (let i = 0; i < 3; i++) {
    hash = simpleHash(hash);
  }
  
  return hash;
}

/**
 * Verify password against hash
 * @param password - Password input
 * @param hashedPassword - Stored hash
 * @param salt - Salt yang digunakan
 * @returns Boolean apakah password valid
 */
export function verifyPassword(
  password: string, 
  hashedPassword: string, 
  salt: string = 'FashionX2024'
): boolean {
  const computedHash = hashPassword(password, salt);
  return computedHash === hashedPassword;
}

/**
 * Generate checksum untuk data integrity
 * Berguna untuk memverifikasi data tidak diubah
 */
export function generateChecksum(data: string): string {
  let checksum = 0;
  
  for (let i = 0; i < data.length; i++) {
    checksum = (checksum + data.charCodeAt(i) * (i + 1)) % 65536;
  }
  
  return checksum.toString(16).padStart(4, '0').toUpperCase();
}

/**
 * Verify data integrity using checksum
 */
export function verifyChecksum(data: string, expectedChecksum: string): boolean {
  const computedChecksum = generateChecksum(data);
  return computedChecksum === expectedChecksum;
}

/**
 * Hash object untuk storage
 * Berguna untuk membuat unique key dari object
 */
export function hashObject(obj: Record<string, unknown>): string {
  const jsonString = JSON.stringify(obj, Object.keys(obj).sort());
  return simpleHash(jsonString);
}

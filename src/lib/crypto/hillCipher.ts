/**
 * Hill Cipher Implementation
 * Used for encrypting product IDs and invoice numbers
 * 
 * Teori: Hill Cipher menggunakan aljabar linear (matriks) untuk enkripsi
 * Rumus: C = K × P (mod 26)
 * K = Key matrix, P = Plaintext matrix
 */

// Key matrix 2x2 untuk enkripsi
const KEY_MATRIX: number[][] = [
  [3, 3],
  [2, 5]
];

// Determinant = (3*5) - (3*2) = 15 - 6 = 9
// Modular multiplicative inverse of 9 mod 26 = 3 (karena 9*3 = 27 ≡ 1 mod 26)
const INVERSE_KEY_MATRIX: number[][] = [
  [15, 17],
  [20, 9]
];

/**
 * Mengalikan dua matriks
 */
function multiplyMatrix(a: number[][], b: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

/**
 * Modulo operation yang handle negatif
 */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Konversi karakter ke angka (A=0, B=1, ..., Z=25)
 */
function charToNum(char: string): number {
  return char.toUpperCase().charCodeAt(0) - 65;
}

/**
 * Konversi angka ke karakter
 */
function numToChar(num: number): string {
  return String.fromCharCode(mod(num, 26) + 65);
}

/**
 * Enkripsi teks menggunakan Hill Cipher
 * @param plaintext - Teks yang akan dienkripsi (hanya huruf)
 * @returns Ciphertext
 */
export function hillEncrypt(plaintext: string): string {
  // Bersihkan input - hanya ambil huruf
  const cleaned = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  
  // Padding jika panjang ganjil
  const padded = cleaned.length % 2 === 0 ? cleaned : cleaned + 'X';
  
  let ciphertext = '';
  
  // Proses per 2 karakter
  for (let i = 0; i < padded.length; i += 2) {
    const p1 = charToNum(padded[i]);
    const p2 = charToNum(padded[i + 1]);
    
    // Matrix multiplication: K × P
    const c1 = mod(KEY_MATRIX[0][0] * p1 + KEY_MATRIX[0][1] * p2, 26);
    const c2 = mod(KEY_MATRIX[1][0] * p1 + KEY_MATRIX[1][1] * p2, 26);
    
    ciphertext += numToChar(c1) + numToChar(c2);
  }
  
  return ciphertext;
}

/**
 * Dekripsi teks menggunakan Hill Cipher
 * @param ciphertext - Teks terenkripsi
 * @returns Plaintext
 */
export function hillDecrypt(ciphertext: string): string {
  const cleaned = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  
  let plaintext = '';
  
  for (let i = 0; i < cleaned.length; i += 2) {
    const c1 = charToNum(cleaned[i]);
    const c2 = charToNum(cleaned[i + 1]);
    
    // Matrix multiplication: K^-1 × C
    const p1 = mod(INVERSE_KEY_MATRIX[0][0] * c1 + INVERSE_KEY_MATRIX[0][1] * c2, 26);
    const p2 = mod(INVERSE_KEY_MATRIX[1][0] * c1 + INVERSE_KEY_MATRIX[1][1] * c2, 26);
    
    plaintext += numToChar(p1) + numToChar(p2);
  }
  
  return plaintext;
}

/**
 * Enkripsi Product ID dengan format khusus
 * Contoh: "PROD123" -> "FX-ENCRYPTED"
 */
export function encryptProductId(productId: string): string {
  const prefix = 'FX';
  const encrypted = hillEncrypt(productId);
  return `${prefix}-${encrypted}`;
}

/**
 * Generate encrypted invoice number
 * Format: INV-[encrypted timestamp]-[random]
 */
export function generateEncryptedInvoice(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const combined = timestamp + random;
  
  // Enkripsi dengan Hill Cipher
  const encrypted = hillEncrypt(combined);
  
  return `INV-${encrypted.substring(0, 8)}-${encrypted.substring(8, 12) || 'XXXX'}`;
}

/**
 * Verify encrypted invoice
 */
export function verifyInvoice(invoiceNumber: string): boolean {
  // Check format
  const pattern = /^INV-[A-Z]{8}-[A-Z]{4}$/;
  return pattern.test(invoiceNumber);
}

// Export matrix utilities untuk dokumentasi
export const matrixUtils = {
  multiply: multiplyMatrix,
  mod,
  keyMatrix: KEY_MATRIX,
  inverseKeyMatrix: INVERSE_KEY_MATRIX
};

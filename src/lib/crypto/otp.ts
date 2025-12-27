/**
 * OTP (One-Time Password) Implementation
 * Untuk verifikasi checkout dan transaksi
 * 
 * Teori: OTP menggunakan kombinasi timestamp dan random untuk keunikan
 */

interface OTPData {
  code: string;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
}

// Store OTPs in memory (dalam production, gunakan Redis atau database)
const otpStore: Map<string, OTPData> = new Map();

// OTP Configuration
const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 3;

/**
 * Generate random OTP code
 * @param length - Panjang OTP (default 6)
 * @returns OTP code string
 */
function generateRandomCode(length: number = OTP_LENGTH): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

/**
 * Generate OTP untuk user/session tertentu
 * @param identifier - Unique identifier (email, phone, session ID)
 * @returns Generated OTP code
 */
export function generateOTP(identifier: string): string {
  const code = generateRandomCode();
  const expiresAt = Date.now() + (OTP_EXPIRY_MINUTES * 60 * 1000);
  
  otpStore.set(identifier, {
    code,
    expiresAt,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS
  });
  
  console.log(`[OTP] Generated for ${identifier}: ${code} (expires in ${OTP_EXPIRY_MINUTES} minutes)`);
  
  return code;
}

/**
 * Verify OTP
 * @param identifier - Unique identifier
 * @param inputCode - OTP code yang diinput user
 * @returns Object dengan status dan message
 */
export function verifyOTP(identifier: string, inputCode: string): {
  valid: boolean;
  message: string;
  remainingAttempts?: number;
} {
  const otpData = otpStore.get(identifier);
  
  // Check if OTP exists
  if (!otpData) {
    return {
      valid: false,
      message: 'OTP tidak ditemukan. Silakan minta OTP baru.'
    };
  }
  
  // Check if expired
  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(identifier);
    return {
      valid: false,
      message: 'OTP sudah kadaluarsa. Silakan minta OTP baru.'
    };
  }
  
  // Check attempts
  if (otpData.attempts >= otpData.maxAttempts) {
    otpStore.delete(identifier);
    return {
      valid: false,
      message: 'Terlalu banyak percobaan. Silakan minta OTP baru.'
    };
  }
  
  // Verify code
  if (otpData.code === inputCode) {
    otpStore.delete(identifier);
    return {
      valid: true,
      message: 'OTP valid!'
    };
  }
  
  // Invalid code - increment attempts
  otpData.attempts++;
  otpStore.set(identifier, otpData);
  
  const remainingAttempts = otpData.maxAttempts - otpData.attempts;
  
  return {
    valid: false,
    message: `OTP salah. Sisa percobaan: ${remainingAttempts}`,
    remainingAttempts
  };
}

/**
 * Check if OTP exists and is still valid (not expired)
 */
export function hasValidOTP(identifier: string): boolean {
  const otpData = otpStore.get(identifier);
  if (!otpData) return false;
  return Date.now() < otpData.expiresAt;
}

/**
 * Get remaining time for OTP in seconds
 */
export function getOTPRemainingTime(identifier: string): number {
  const otpData = otpStore.get(identifier);
  if (!otpData) return 0;
  
  const remaining = Math.max(0, otpData.expiresAt - Date.now());
  return Math.floor(remaining / 1000);
}

/**
 * Clear OTP for identifier
 */
export function clearOTP(identifier: string): void {
  otpStore.delete(identifier);
}

/**
 * Format OTP display dengan spasi di tengah
 * Contoh: "123456" -> "123 456"
 */
export function formatOTPDisplay(code: string): string {
  if (code.length !== 6) return code;
  return `${code.slice(0, 3)} ${code.slice(3)}`;
}

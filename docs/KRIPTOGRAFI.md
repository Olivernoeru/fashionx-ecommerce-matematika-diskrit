# Dokumentasi Kriptografi - FashionX E-Commerce

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Hill Cipher](#hill-cipher)
3. [One-Time Password (OTP)](#one-time-password-otp)
4. [Hash Function](#hash-function)
5. [Implementasi dalam Proyek](#implementasi-dalam-proyek)
6. [Keamanan dan Best Practices](#keamanan-dan-best-practices)

---

## Pendahuluan

Dokumen ini menjelaskan penerapan teknik **Kriptografi** dalam aplikasi e-commerce FashionX. Kriptografi digunakan untuk:

1. **Enkripsi Data** - Mengamankan informasi sensitif (Hill Cipher)
2. **Verifikasi Identitas** - Memastikan keaslian pengguna (OTP)
3. **Integritas Data** - Memastikan data tidak dimanipulasi (Hash)

### Arsitektur Keamanan FashionX

```
┌─────────────────────────────────────────────────────────────┐
│                    FashionX Security Layer                   │
├─────────────────┬───────────────────┬───────────────────────┤
│   HILL CIPHER   │       OTP         │      HASH FUNCTION    │
│   (Encryption)  │   (Verification)  │     (Integrity)       │
├─────────────────┼───────────────────┼───────────────────────┤
│ - Invoice ID    │ - Checkout OTP    │ - Password Storage    │
│ - SKU Encoding  │ - Phone Verify    │ - Data Verification   │
│ - Order Number  │ - 2FA Login       │ - Session Token       │
└─────────────────┴───────────────────┴───────────────────────┘
```

---

## Hill Cipher

### Teori Dasar

**Hill Cipher** adalah cipher substitusi poligrafik yang ditemukan oleh Lester S. Hill pada tahun 1929. Cipher ini menggunakan aljabar linear (perkalian matriks) untuk enkripsi.

### Prinsip Kerja

1. **Plaintext** dikonversi menjadi vektor numerik
2. Vektor dikalikan dengan **matriks kunci**
3. Hasil dimodulo 26 (atau ukuran alfabet)
4. Hasilnya adalah **ciphertext**

### Rumus Matematis

**Enkripsi:**
```
C = K × P (mod 26)

Dimana:
C = Vektor ciphertext
K = Matriks kunci (n × n)
P = Vektor plaintext
```

**Dekripsi:**
```
P = K⁻¹ × C (mod 26)

Dimana:
K⁻¹ = Invers matriks kunci (mod 26)
```

### Contoh Perhitungan

**Kunci (Matriks 2×2):**
```
K = | 3  3 |
    | 2  5 |
```

**Plaintext:** "HI" → H=7, I=8 → Vektor [7, 8]

**Enkripsi:**
```
| 3  3 |   | 7 |   | 3×7 + 3×8 |   | 45 |   | 19 |
|      | × |   | = |           | = |    | = |    | (mod 26)
| 2  5 |   | 8 |   | 2×7 + 5×8 |   | 54 |   |  2 |
```

**Ciphertext:** [19, 2] → T, C → "TC"

### Implementasi dalam FashionX

```typescript
// src/lib/crypto/hillCipher.ts

// Matriks kunci default 3×3
const DEFAULT_KEY_MATRIX = [
  [6, 24, 1],
  [13, 16, 10],
  [20, 17, 15]
];

// Alfabet yang digunakan (36 karakter)
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MOD = ALPHABET.length; // 36

/**
 * Enkripsi teks menggunakan Hill Cipher
 */
export function hillEncrypt(plaintext: string, keyMatrix?: number[][]): string {
  const key = keyMatrix || DEFAULT_KEY_MATRIX;
  const n = key.length;
  
  // Preprocessing: uppercase dan padding
  let text = plaintext.toUpperCase().replace(/[^A-Z0-9]/g, '');
  while (text.length % n !== 0) {
    text += 'X'; // Padding
  }
  
  // Konversi ke angka
  const numbers = text.split('').map(c => ALPHABET.indexOf(c));
  
  // Enkripsi per blok
  let result = '';
  for (let i = 0; i < numbers.length; i += n) {
    const block = numbers.slice(i, i + n);
    const encrypted = multiplyMatrix(key, block, MOD);
    result += encrypted.map(num => ALPHABET[num]).join('');
  }
  
  return result;
}

/**
 * Dekripsi teks menggunakan Hill Cipher
 */
export function hillDecrypt(ciphertext: string, keyMatrix?: number[][]): string {
  const key = keyMatrix || DEFAULT_KEY_MATRIX;
  const inverseKey = matrixModInverse(key, MOD);
  
  if (!inverseKey) {
    throw new Error('Matriks tidak memiliki invers');
  }
  
  const n = key.length;
  const text = ciphertext.toUpperCase();
  const numbers = text.split('').map(c => ALPHABET.indexOf(c));
  
  let result = '';
  for (let i = 0; i < numbers.length; i += n) {
    const block = numbers.slice(i, i + n);
    const decrypted = multiplyMatrix(inverseKey, block, MOD);
    result += decrypted.map(num => ALPHABET[num]).join('');
  }
  
  return result.replace(/X+$/, ''); // Hapus padding
}
```

### Fungsi Helper Matriks

```typescript
/**
 * Perkalian matriks dengan vektor
 */
function multiplyMatrix(matrix: number[][], vector: number[], mod: number): number[] {
  const n = matrix.length;
  const result: number[] = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i] += matrix[i][j] * vector[j];
    }
    result[i] = ((result[i] % mod) + mod) % mod;
  }
  
  return result;
}

/**
 * Menghitung determinan matriks
 */
function determinant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  let det = 0;
  for (let j = 0; j < n; j++) {
    det += Math.pow(-1, j) * matrix[0][j] * determinant(minor(matrix, 0, j));
  }
  return det;
}

/**
 * Menghitung invers modular
 */
function modInverse(a: number, mod: number): number | null {
  a = ((a % mod) + mod) % mod;
  for (let x = 1; x < mod; x++) {
    if ((a * x) % mod === 1) return x;
  }
  return null;
}

/**
 * Menghitung invers matriks dalam modular arithmetic
 */
function matrixModInverse(matrix: number[][], mod: number): number[][] | null {
  const n = matrix.length;
  const det = determinant(matrix);
  const detMod = ((det % mod) + mod) % mod;
  const detInverse = modInverse(detMod, mod);
  
  if (detInverse === null) return null;
  
  // Hitung adjugate matrix
  const adj = adjugate(matrix);
  
  // Kalikan dengan invers determinan
  const inverse: number[][] = [];
  for (let i = 0; i < n; i++) {
    inverse[i] = [];
    for (let j = 0; j < n; j++) {
      inverse[i][j] = ((adj[i][j] * detInverse) % mod + mod) % mod;
    }
  }
  
  return inverse;
}
```

### Penggunaan dalam Invoice

```typescript
/**
 * Generate Invoice ID terenkripsi
 */
export function generateEncryptedInvoice(orderId: string, timestamp: number): string {
  const data = `${orderId}-${timestamp}`;
  const encrypted = hillEncrypt(data);
  return `INV-${encrypted.slice(0, 12)}`;
}

/**
 * Verifikasi Invoice ID
 */
export function verifyInvoice(invoiceId: string, orderId: string): boolean {
  const encrypted = invoiceId.replace('INV-', '');
  const decrypted = hillDecrypt(encrypted);
  return decrypted.startsWith(orderId);
}
```

---

## One-Time Password (OTP)

### Teori Dasar

**OTP (One-Time Password)** adalah password yang hanya valid untuk satu sesi atau transaksi. Karakteristik OTP:

1. **Randomness** - Dibuat secara acak
2. **Time-bound** - Memiliki batas waktu berlaku
3. **Single-use** - Hanya bisa digunakan sekali

### Tipe OTP

| Tipe | Deskripsi | Contoh |
|------|-----------|--------|
| **TOTP** | Time-based OTP | Google Authenticator |
| **HOTP** | HMAC-based OTP | Counter-based tokens |
| **Random** | Pure random generation | SMS OTP |

### Implementasi dalam FashionX

```typescript
// src/lib/crypto/otp.ts

interface OTPData {
  code: string;
  expiresAt: number;
  attempts: number;
}

// Penyimpanan OTP (sementara di memory, production: database)
const otpStore = new Map<string, OTPData>();

/**
 * Generate OTP 6 digit
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  
  // Crypto-secure random generation
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    otp += digits[array[i] % 10];
  }
  
  return otp;
}

/**
 * Kirim OTP ke pengguna
 */
export function sendOTP(identifier: string, type: 'email' | 'phone'): {
  success: boolean;
  message: string;
  expiresIn: number;
} {
  const code = generateOTP(6);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 menit
  
  // Simpan OTP
  otpStore.set(identifier, {
    code,
    expiresAt,
    attempts: 0
  });
  
  // Simulasi pengiriman (production: integrasi SMS/Email gateway)
  console.log(`[OTP] Sending ${code} to ${identifier} via ${type}`);
  
  return {
    success: true,
    message: `OTP dikirim ke ${maskIdentifier(identifier, type)}`,
    expiresIn: 300 // 5 menit dalam detik
  };
}

/**
 * Verifikasi OTP
 */
export function verifyOTP(identifier: string, inputCode: string): {
  valid: boolean;
  message: string;
} {
  const data = otpStore.get(identifier);
  
  if (!data) {
    return { valid: false, message: 'OTP tidak ditemukan. Silakan minta OTP baru.' };
  }
  
  // Cek expired
  if (Date.now() > data.expiresAt) {
    otpStore.delete(identifier);
    return { valid: false, message: 'OTP sudah kadaluarsa. Silakan minta OTP baru.' };
  }
  
  // Cek max attempts (3x)
  if (data.attempts >= 3) {
    otpStore.delete(identifier);
    return { valid: false, message: 'Terlalu banyak percobaan. Silakan minta OTP baru.' };
  }
  
  // Verifikasi
  if (data.code !== inputCode) {
    data.attempts++;
    return { 
      valid: false, 
      message: `OTP salah. Sisa percobaan: ${3 - data.attempts}` 
    };
  }
  
  // Success - hapus OTP
  otpStore.delete(identifier);
  return { valid: true, message: 'OTP terverifikasi!' };
}

/**
 * Mask identifier untuk tampilan
 */
function maskIdentifier(identifier: string, type: 'email' | 'phone'): string {
  if (type === 'email') {
    const [user, domain] = identifier.split('@');
    return `${user[0]}***@${domain}`;
  } else {
    return identifier.slice(0, 4) + '****' + identifier.slice(-2);
  }
}
```

### Flow OTP Checkout

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Customer   │────>│   Server     │────>│  SMS/Email   │
│  Input Phone │     │ Generate OTP │     │   Gateway    │
└──────────────┘     └──────────────┘     └──────────────┘
                            │                     │
                            │  Store OTP          │ Send OTP
                            ▼                     ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Database   │     │   Customer   │
                     │  (5 min TTL) │     │ Receives OTP │
                     └──────────────┘     └──────────────┘
                            ▲                     │
                            │                     │ Input OTP
                            │  Verify             ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Compare    │<────│   Customer   │
                     │  OTP Codes   │     │  Submit OTP  │
                     └──────────────┘     └──────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼                           ▼
       ┌──────────────┐           ┌──────────────┐
       │   SUCCESS    │           │    FAILED    │
       │ Proceed Order│           │ Retry/Resend │
       └──────────────┘           └──────────────┘
```

---

## Hash Function

### Teori Dasar

**Hash Function** adalah fungsi matematika yang mengkonversi input menjadi output dengan panjang tetap (hash/digest). Karakteristik:

1. **Deterministic** - Input sama menghasilkan output sama
2. **Quick Computation** - Cepat dihitung
3. **Preimage Resistance** - Sulit mencari input dari output
4. **Collision Resistance** - Sulit mencari dua input berbeda dengan output sama
5. **Avalanche Effect** - Perubahan kecil di input menghasilkan perubahan besar di output

### Implementasi dalam FashionX

```typescript
// src/lib/crypto/hash.ts

/**
 * Simple hash function untuk password
 * CATATAN: Untuk production, gunakan bcrypt atau Argon2
 */
export function hashPassword(password: string): string {
  // Tambahkan salt
  const salt = 'FashionX_Salt_2024';
  const combined = password + salt;
  
  // Simple hash algorithm (untuk demo)
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert ke hex dan tambahkan prefix
  const hashHex = Math.abs(hash).toString(16).padStart(8, '0');
  return `$fxh$${hashHex}${generateRandomSuffix()}`;
}

/**
 * Verifikasi password
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  // Extract hash portion
  const hashPart = storedHash.slice(5, 13); // Setelah "$fxh$"
  
  const salt = 'FashionX_Salt_2024';
  const combined = password + salt;
  
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const computedHash = Math.abs(hash).toString(16).padStart(8, '0');
  return computedHash === hashPart;
}

/**
 * Generate random suffix untuk variasi
 */
function generateRandomSuffix(): string {
  const chars = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
```

### Perbandingan Hash Algorithms

| Algorithm | Output Size | Security | Speed | Use Case |
|-----------|-------------|----------|-------|----------|
| MD5 | 128 bit | ❌ Broken | Fast | Checksum only |
| SHA-1 | 160 bit | ❌ Broken | Fast | Legacy systems |
| SHA-256 | 256 bit | ✅ Secure | Medium | General purpose |
| bcrypt | 184 bit | ✅ Secure | Slow | Password hashing |
| Argon2 | Variable | ✅✅ Secure | Tunable | Password hashing |

---

## Implementasi dalam Proyek

### 1. Checkout dengan OTP Verification

```typescript
// src/pages/CheckoutPage.tsx

function CheckoutPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleSendOTP = async () => {
    const result = sendOTP(phone, 'phone');
    if (result.success) {
      setOtpSent(true);
      toast({ title: 'OTP Terkirim', description: result.message });
    }
  };

  const handleVerifyAndOrder = async () => {
    const result = verifyOTP(phone, otpCode);
    if (result.valid) {
      // Generate encrypted invoice
      const invoiceId = generateEncryptedInvoice(orderId, Date.now());
      // Proceed with order...
    }
  };

  return (
    <div>
      {!otpSent ? (
        <Button onClick={handleSendOTP}>Kirim OTP</Button>
      ) : (
        <div>
          <InputOTP value={otpCode} onChange={setOtpCode} />
          <Button onClick={handleVerifyAndOrder}>Verifikasi & Pesan</Button>
        </div>
      )}
    </div>
  );
}
```

### 2. Invoice dengan Hill Cipher

```typescript
// src/pages/InvoicePage.tsx

function InvoicePage() {
  const { invoiceId } = useParams();
  
  // Decode invoice untuk verifikasi
  const isValid = verifyInvoice(invoiceId, orderId);
  
  // Tampilkan encrypted SKU
  const encryptedSKU = hillEncrypt(product.id);
  
  return (
    <div>
      <h1>Invoice #{invoiceId}</h1>
      <p>SKU (Encrypted): {encryptedSKU}</p>
      <p>Status: {isValid ? '✅ Valid' : '❌ Invalid'}</p>
    </div>
  );
}
```

### 3. User Authentication dengan Hash

```typescript
// src/context/UserContext.tsx

const register = async (name: string, email: string, password: string) => {
  // Hash password sebelum disimpan
  const passwordHash = hashPassword(password);
  
  const newUser = {
    id: generateId(),
    email,
    name,
    passwordHash // Simpan hash, bukan plain password
  };
  
  // Simpan ke database
  saveUser(newUser);
};

const login = async (email: string, password: string) => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return { success: false, message: 'User tidak ditemukan' };
  }
  
  // Verifikasi password
  if (!verifyPassword(password, user.passwordHash)) {
    return { success: false, message: 'Password salah' };
  }
  
  return { success: true, user };
};
```

---

## Keamanan dan Best Practices

### ⚠️ Catatan Penting

Implementasi dalam proyek ini adalah untuk **tujuan edukasi**. Untuk **production**, gunakan:

| Fitur | Demo | Production |
|-------|------|------------|
| Password Hashing | Simple hash | bcrypt / Argon2 |
| OTP Storage | In-memory | Redis dengan TTL |
| Hill Cipher | Local encryption | AES-256-GCM |
| Key Management | Hardcoded | HSM / KMS |

### Rekomendasi Keamanan

1. **Jangan simpan password plain text** - Selalu hash
2. **Gunakan HTTPS** - Enkripsi data in transit
3. **Rate limiting** - Batasi percobaan OTP
4. **Secure random** - Gunakan `crypto.getRandomValues()`
5. **Key rotation** - Ganti kunci enkripsi secara berkala

---

## Referensi

1. Stallings, W. (2017). *Cryptography and Network Security* (7th ed.). Pearson.
2. Schneier, B. (2015). *Applied Cryptography* (20th Anniversary ed.). Wiley.
3. Ferguson, N., Schneier, B., & Kohno, T. (2010). *Cryptography Engineering*. Wiley.
4. OWASP. (2023). *Password Storage Cheat Sheet*. https://cheatsheetseries.owasp.org/

---

*Dokumentasi ini dibuat sebagai bagian dari proyek FashionX E-Commerce Platform.*

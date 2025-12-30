# FashionX E-Commerce Platform

![FashionX Banner](../public/placeholder.svg)

## 📋 Deskripsi Proyek

**FashionX** adalah platform e-commerce fashion modern yang dibangun dengan React, TypeScript, dan Tailwind CSS. Proyek ini mengimplementasikan konsep-konsep **Teori Diskrit** dan **Kriptografi** dalam pengembangan aplikasi web.

### 🎯 Tujuan Proyek

1. Membangun aplikasi e-commerce yang fungsional dan modern
2. Mendemonstrasikan penerapan Teori Diskrit dalam pengembangan software
3. Mengimplementasikan teknik Kriptografi untuk keamanan data
4. Memberikan contoh best practices dalam pengembangan React

---

## 🚀 Fitur Utama

### E-Commerce Features
- ✅ Katalog produk dengan 20+ produk
- ✅ 7 kategori produk (Dress, T-Shirt, Hoodie, Sweater, Jacket, Pants, Shoes)
- ✅ Filter dan pencarian produk
- ✅ Keranjang belanja (Cart)
- ✅ Proses checkout dengan verifikasi OTP
- ✅ Invoice dengan encoding Hill Cipher
- ✅ Profil pengguna dengan autentikasi

### Teori Diskrit Implementation
- ✅ **Set Theory** - Operasi Union, Intersection, Difference untuk filter produk
- ✅ **Graph Theory** - Navigasi kategori dan breadcrumb
- ✅ **Combinatorics** - Variasi produk (ukuran, warna)

### Kriptografi Implementation
- ✅ **Hill Cipher** - Enkripsi invoice dan SKU produk
- ✅ **OTP** - Verifikasi checkout
- ✅ **Hash Function** - Penyimpanan password

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Routing** | React Router v6 |
| **State Management** | React Context |
| **Build Tool** | Vite |
| **Icons** | Lucide React |

---

## 📁 Struktur Proyek

```
FashionX/
├── docs/                          # Dokumentasi
│   ├── README.md                  # Dokumentasi utama
│   ├── TEORI_DISKRIT.md          # Dokumentasi Teori Diskrit
│   └── KRIPTOGRAFI.md            # Dokumentasi Kriptografi
│
├── public/                        # Static assets
│   └── images/                    # Gambar produk
│
├── src/
│   ├── components/               # React Components
│   │   ├── ui/                   # shadcn UI components
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Footer.tsx            # Footer
│   │   ├── ProductCard.tsx       # Kartu produk
│   │   ├── CartDrawer.tsx        # Drawer keranjang
│   │   └── SearchModal.tsx       # Modal pencarian
│   │
│   ├── context/                  # React Context
│   │   ├── CartContext.tsx       # State keranjang
│   │   └── UserContext.tsx       # State pengguna
│   │
│   ├── data/                     # Static data
│   │   ├── products.ts           # Data produk
│   │   ├── categories.ts         # Data kategori
│   │   └── constants.ts          # Konstanta aplikasi
│   │
│   ├── lib/                      # Utilities
│   │   ├── crypto/               # Kriptografi
│   │   │   ├── hillCipher.ts     # Hill Cipher
│   │   │   ├── otp.ts            # OTP generator
│   │   │   └── hash.ts           # Hash function
│   │   │
│   │   └── utils/                # Utilitas umum
│   │       ├── setTheory.ts      # Operasi himpunan
│   │       ├── graphNav.ts       # Navigasi graf
│   │       ├── helpers.ts        # Helper functions
│   │       └── storage.ts        # Local storage
│   │
│   ├── pages/                    # Halaman
│   │   ├── HomePage.tsx          # Halaman utama
│   │   ├── ProductsPage.tsx      # Daftar produk
│   │   ├── ProductDetailPage.tsx # Detail produk
│   │   ├── CartPage.tsx          # Halaman keranjang
│   │   ├── CheckoutPage.tsx      # Halaman checkout
│   │   ├── InvoicePage.tsx       # Halaman invoice
│   │   └── ProfilePage.tsx       # Halaman profil
│   │
│   ├── App.tsx                   # Main App
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
│
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd fashionx

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Buat file `.env` di root project:

```env
VITE_APP_NAME=FashionX
VITE_API_URL=http://localhost:3000
```

---

## 📖 Dokumentasi Lengkap

### Teori Diskrit
Lihat [TEORI_DISKRIT.md](./TEORI_DISKRIT.md) untuk dokumentasi lengkap tentang:
- Implementasi Teori Himpunan
- Implementasi Teori Graf
- Contoh penggunaan dalam kode

### Kriptografi
Lihat [KRIPTOGRAFI.md](./KRIPTOGRAFI.md) untuk dokumentasi lengkap tentang:
- Hill Cipher (enkripsi/dekripsi)
- OTP (One-Time Password)
- Hash Function

---

## 📸 Screenshots

### Home Page
![Home Page](../public/placeholder.svg)

### Products Page
![Products Page](../public/placeholder.svg)

### Checkout with OTP
![Checkout](../public/placeholder.svg)

### Encrypted Invoice
![Invoice](../public/placeholder.svg)

---

## 🔒 Keamanan

### Implementasi Keamanan

| Fitur | Metode | Keterangan |
|-------|--------|------------|
| Password | Hash + Salt | Tidak disimpan plain text |
| Invoice | Hill Cipher | Encoded untuk verifikasi |
| Checkout | OTP | Verifikasi via SMS/Email |
| Session | JWT-like | Token dengan expiry |

### ⚠️ Disclaimer

Implementasi kriptografi dalam proyek ini adalah untuk **tujuan edukasi**. Untuk aplikasi production, gunakan library yang sudah teruji seperti:
- `bcrypt` untuk password hashing
- `crypto-js` atau `Web Crypto API` untuk enkripsi
- Service seperti Twilio untuk OTP

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Check coverage
npm run test:coverage
```

---

## 📝 API Reference

### Cart Context

```typescript
interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, size: string, color: string, qty?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}
```

### Crypto Functions

```typescript
// Hill Cipher
hillEncrypt(plaintext: string, keyMatrix?: number[][]): string
hillDecrypt(ciphertext: string, keyMatrix?: number[][]): string
generateEncryptedInvoice(orderId: string, timestamp: number): string

// OTP
generateOTP(length?: number): string
sendOTP(identifier: string, type: 'email' | 'phone'): OTPResult
verifyOTP(identifier: string, code: string): VerifyResult

// Hash
hashPassword(password: string): string
verifyPassword(password: string, hash: string): boolean
```

---

## 👥 Tim Pengembang

| Nama | Peran | Kontribusi |
|------|-------|------------|
| Developer | Full Stack | Semua fitur |

---

## 📄 Lisensi

MIT License - Lihat [LICENSE](../LICENSE) untuk detail.

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Unsplash](https://unsplash.com/) - Gambar produk placeholder

---

*Built with ❤️ using React and TypeScript*

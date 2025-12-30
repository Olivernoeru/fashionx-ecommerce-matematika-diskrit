# Dokumentasi Teori Diskrit - FashionX E-Commerce

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Teori Himpunan (Set Theory)](#teori-himpunan)
3. [Teori Graf (Graph Theory)](#teori-graf)
4. [Implementasi dalam Proyek](#implementasi-dalam-proyek)

---

## Pendahuluan

Dokumen ini menjelaskan penerapan konsep **Teori Diskrit** dalam pengembangan aplikasi e-commerce FashionX. Teori Diskrit merupakan cabang matematika yang mempelajari objek-objek diskrit (terpisah/terhitung) seperti himpunan, graf, dan struktur kombinatorial.

### Mengapa Teori Diskrit Penting dalam E-Commerce?

1. **Pengelolaan Data Kategori** - Menggunakan teori himpunan untuk filter dan pencarian produk
2. **Navigasi dan Routing** - Menggunakan teori graf untuk breadcrumb dan relasi kategori
3. **Optimasi Pencarian** - Menggunakan operasi himpunan untuk filter kompleks

---

## Teori Himpunan

### Definisi

**Himpunan** adalah kumpulan objek-objek yang terdefinisi dengan jelas dan berbeda. Dalam konteks e-commerce:
- Himpunan produk
- Himpunan kategori
- Himpunan wishlist pengguna
- Himpunan keranjang belanja

### Operasi Himpunan yang Diimplementasi

#### 1. Union (Gabungan) - A ∪ B
Menggabungkan dua himpunan tanpa duplikasi.

```typescript
// src/lib/utils/setTheory.ts
export function union<T>(setA: T[], setB: T[]): T[] {
  return [...new Set([...setA, ...setB])];
}
```

**Contoh Penggunaan:**
```typescript
// Menggabungkan produk dari dua kategori
const dressProducts = getProductsByCategory('dress');
const tshirtProducts = getProductsByCategory('t-shirt');
const combined = union(dressProducts, tshirtProducts);
```

#### 2. Intersection (Irisan) - A ∩ B
Mencari elemen yang ada di kedua himpunan.

```typescript
export function intersection<T>(setA: T[], setB: T[]): T[] {
  const setB_set = new Set(setB);
  return setA.filter(x => setB_set.has(x));
}
```

**Contoh Penggunaan:**
```typescript
// Mencari produk yang ada di wishlist DAN sedang diskon
const wishlist = getUserWishlist();
const saleProducts = getSaleProducts();
const wishlistOnSale = intersection(wishlist, saleProducts);
```

#### 3. Difference (Selisih) - A \ B
Mencari elemen yang ada di A tapi tidak ada di B.

```typescript
export function difference<T>(setA: T[], setB: T[]): T[] {
  const setB_set = new Set(setB);
  return setA.filter(x => !setB_set.has(x));
}
```

**Contoh Penggunaan:**
```typescript
// Mencari produk yang belum ada di keranjang
const allProducts = getAllProducts();
const cartProducts = getCartProducts();
const notInCart = difference(allProducts, cartProducts);
```

#### 4. Symmetric Difference - A △ B
Mencari elemen yang ada di salah satu himpunan, tapi tidak keduanya.

```typescript
export function symmetricDifference<T>(setA: T[], setB: T[]): T[] {
  return difference(union(setA, setB), intersection(setA, setB));
}
```

#### 5. Subset Check - A ⊆ B
Memeriksa apakah semua elemen A ada di B.

```typescript
export function isSubset<T>(setA: T[], setB: T[]): boolean {
  const setB_set = new Set(setB);
  return setA.every(x => setB_set.has(x));
}
```

**Contoh Penggunaan:**
```typescript
// Memeriksa apakah semua item keranjang masih tersedia
const cartItems = getCartProductIds();
const availableProducts = getAvailableProductIds();
const allAvailable = isSubset(cartItems, availableProducts);
```

### Diagram Venn

```
        Himpunan A              Himpunan B
     ┌─────────────┐         ┌─────────────┐
     │             │         │             │
     │    A \ B    │─────────│    B \ A    │
     │             │  A ∩ B  │             │
     │             │         │             │
     └─────────────┘         └─────────────┘
     
     A ∪ B = (A \ B) ∪ (A ∩ B) ∪ (B \ A)
```

---

## Teori Graf

### Definisi

**Graf** adalah struktur matematika yang terdiri dari:
- **Vertex (Simpul)**: Titik-titik dalam graf
- **Edge (Sisi)**: Garis yang menghubungkan dua simpul

### Representasi Graf Kategori

Dalam FashionX, kategori produk direpresentasikan sebagai **Directed Acyclic Graph (DAG)**:

```
                    [ROOT]
                      │
       ┌──────┬───────┼───────┬──────┬──────┬──────┐
       │      │       │       │      │      │      │
    [Dress] [T-Shirt] [Hoodie] [Sweater] [Jacket] [Pants] [Shoes]
       │      │       │         │      │      │
    ┌──┼──┐ ┌─┼─┐   ┌─┼─┐    ┌──┼──┐ ┌─┼─┐  ┌─┼─┐
    │  │  │ │ │ │   │ │ │    │  │  │ │ │ │  │ │ │
  Casual Formal Mini Basic Graphic Oversized Bomber Denim Leather
  Dress  Dress Dress Tee   Tee     Tee      Jacket Jacket Jacket
```

### Implementasi Graph Navigation

```typescript
// src/lib/utils/graphNav.ts

// Struktur node kategori
interface CategoryNode {
  id: string;
  name: string;
  parentId?: string;
  children: string[];
}

// Membangun graf dari data kategori
export function buildCategoryGraph(categories: Category[]): Map<string, CategoryNode> {
  const graph = new Map<string, CategoryNode>();
  
  // Inisialisasi semua node
  categories.forEach(cat => {
    graph.set(cat.id, {
      id: cat.id,
      name: cat.name,
      parentId: cat.parentId,
      children: []
    });
  });
  
  // Membangun relasi parent-child
  categories.forEach(cat => {
    if (cat.parentId && graph.has(cat.parentId)) {
      graph.get(cat.parentId)!.children.push(cat.id);
    }
  });
  
  return graph;
}
```

### Algoritma Pencarian

#### 1. Breadth-First Search (BFS)
Digunakan untuk mencari semua sub-kategori dari suatu kategori.

```typescript
export function findAllSubcategories(graph: Map<string, CategoryNode>, startId: string): string[] {
  const result: string[] = [];
  const queue: string[] = [startId];
  const visited = new Set<string>();
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    
    const node = graph.get(current);
    if (node) {
      result.push(current);
      queue.push(...node.children);
    }
  }
  
  return result;
}
```

#### 2. Path Finding (Untuk Breadcrumb)
Mencari jalur dari root ke kategori tertentu.

```typescript
export function findPath(graph: Map<string, CategoryNode>, targetId: string): string[] {
  const path: string[] = [];
  let current = targetId;
  
  while (current) {
    path.unshift(current);
    const node = graph.get(current);
    current = node?.parentId || '';
  }
  
  return path;
}
```

**Contoh Penggunaan untuk Breadcrumb:**
```typescript
// Untuk kategori "casual-dress"
const path = findPath(categoryGraph, 'casual-dress');
// Hasil: ['dress', 'casual-dress']

// Render breadcrumb:
// Home > Dress > Casual Dress
```

### Kompleksitas Waktu

| Operasi | Kompleksitas | Keterangan |
|---------|--------------|------------|
| Build Graph | O(n) | n = jumlah kategori |
| BFS | O(V + E) | V = vertices, E = edges |
| Find Path | O(h) | h = tinggi tree |
| Find Subcategories | O(n) | n = total nodes |

---

## Implementasi dalam Proyek

### 1. Filter Produk dengan Operasi Himpunan

```typescript
// Menggabungkan beberapa filter
function applyFilters(products: Product[], filters: Filters): Product[] {
  let result = products;
  
  // Filter by categories (union of selected categories)
  if (filters.categories.length > 0) {
    const categoryProducts = filters.categories.map(cat => 
      products.filter(p => p.category === cat)
    );
    result = categoryProducts.reduce((acc, curr) => union(acc, curr), []);
  }
  
  // Filter by price range (intersection with price constraint)
  if (filters.priceRange) {
    const priceFiltered = products.filter(p => 
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
    result = intersection(result, priceFiltered);
  }
  
  return result;
}
```

### 2. Navigasi Kategori dengan Graf

```typescript
// Komponen Breadcrumb menggunakan graph navigation
function CategoryBreadcrumb({ categoryId }: { categoryId: string }) {
  const path = getCategoryPath(categoryId);
  
  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      {path.map((cat, index) => (
        <Fragment key={cat.id}>
          <span>/</span>
          <Link to={`/products?category=${cat.id}`}>
            {cat.name}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
```

### 3. Rekomendasi Produk dengan Teori Graf

```typescript
// Menemukan produk related berdasarkan kesamaan kategori
function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  // Produk dalam kategori yang sama
  const sameCategory = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  );
  
  // Produk dengan tag yang sama (menggunakan intersection)
  const sameTags = allProducts.filter(p => {
    const commonTags = intersection(p.tags, product.tags);
    return commonTags.length >= 2 && p.id !== product.id;
  });
  
  // Gabungkan dan urutkan berdasarkan relevansi
  const related = union(sameCategory, sameTags);
  return related.slice(0, 4);
}
```

---

## Referensi

1. Rosen, K. H. (2019). *Discrete Mathematics and Its Applications* (8th ed.). McGraw-Hill.
2. Cormen, T. H., et al. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
3. Lipschutz, S., & Lipson, M. (2007). *Discrete Mathematics* (3rd ed.). Schaum's Outlines.

---

*Dokumentasi ini dibuat sebagai bagian dari proyek FashionX E-Commerce Platform.*

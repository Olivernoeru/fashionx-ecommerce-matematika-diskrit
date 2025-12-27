/**
 * Set Theory Implementation
 * Untuk filtering logic, user groups, dan category operations
 * 
 * Teori Himpunan digunakan untuk:
 * - Filtering produk berdasarkan kategori, harga, dll
 * - Operasi AND, OR, NOT pada filter
 * - User groups dan permissions
 */

export type SetElement = string | number;

/**
 * Set operations class
 */
export class SetOperations<T extends SetElement> {
  /**
   * Union (A ∪ B) - Gabungan dua himpunan
   */
  static union<T extends SetElement>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA, ...setB]);
  }

  /**
   * Intersection (A ∩ B) - Irisan dua himpunan
   */
  static intersection<T extends SetElement>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA].filter(x => setB.has(x)));
  }

  /**
   * Difference (A - B) - Selisih himpunan A terhadap B
   */
  static difference<T extends SetElement>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA].filter(x => !setB.has(x)));
  }

  /**
   * Symmetric Difference (A △ B) - Elemen yang ada di salah satu tapi tidak keduanya
   */
  static symmetricDifference<T extends SetElement>(setA: Set<T>, setB: Set<T>): Set<T> {
    const diff1 = this.difference(setA, setB);
    const diff2 = this.difference(setB, setA);
    return this.union(diff1, diff2);
  }

  /**
   * Check if A is subset of B (A ⊆ B)
   */
  static isSubset<T extends SetElement>(setA: Set<T>, setB: Set<T>): boolean {
    return [...setA].every(x => setB.has(x));
  }

  /**
   * Check if A is superset of B (A ⊇ B)
   */
  static isSuperset<T extends SetElement>(setA: Set<T>, setB: Set<T>): boolean {
    return [...setB].every(x => setA.has(x));
  }

  /**
   * Cartesian Product (A × B)
   */
  static cartesianProduct<T extends SetElement>(setA: Set<T>, setB: Set<T>): Set<string> {
    const result = new Set<string>();
    for (const a of setA) {
      for (const b of setB) {
        result.add(`(${a},${b})`);
      }
    }
    return result;
  }
}

/**
 * Product Filter menggunakan Set Theory
 */
export interface ProductFilterCriteria {
  categories?: string[];
  priceRange?: { min: number; max: number };
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

/**
 * Filter products using set operations
 */
export function filterProducts<T extends { id: string }>(
  products: T[],
  criteriaResults: Set<string>[]
): T[] {
  if (criteriaResults.length === 0) return products;
  
  // Intersection of all criteria (AND operation)
  let resultSet = criteriaResults[0];
  
  for (let i = 1; i < criteriaResults.length; i++) {
    resultSet = SetOperations.intersection(resultSet, criteriaResults[i]);
  }
  
  return products.filter(p => resultSet.has(p.id));
}

/**
 * User Groups using Set Theory
 */
export enum UserRole {
  GUEST = 'guest',
  CUSTOMER = 'customer',
  VIP = 'vip',
  ADMIN = 'admin'
}

export const userPermissions: Record<UserRole, Set<string>> = {
  [UserRole.GUEST]: new Set(['view_products', 'add_to_cart']),
  [UserRole.CUSTOMER]: new Set(['view_products', 'add_to_cart', 'checkout', 'view_orders']),
  [UserRole.VIP]: new Set(['view_products', 'add_to_cart', 'checkout', 'view_orders', 'vip_discounts', 'early_access']),
  [UserRole.ADMIN]: new Set(['view_products', 'add_to_cart', 'checkout', 'view_orders', 'manage_products', 'manage_users', 'view_analytics'])
};

/**
 * Check if user has permission
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  return userPermissions[role].has(permission);
}

/**
 * Get all permissions for role (including inherited)
 */
export function getAllPermissions(role: UserRole): Set<string> {
  const roleHierarchy: UserRole[] = [UserRole.GUEST, UserRole.CUSTOMER, UserRole.VIP, UserRole.ADMIN];
  const roleIndex = roleHierarchy.indexOf(role);
  
  let allPermissions = new Set<string>();
  
  for (let i = 0; i <= roleIndex; i++) {
    allPermissions = SetOperations.union(allPermissions, userPermissions[roleHierarchy[i]]);
  }
  
  return allPermissions;
}

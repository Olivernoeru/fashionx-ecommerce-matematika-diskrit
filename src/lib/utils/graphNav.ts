/**
 * Graph Navigation Implementation
 * Untuk struktur navigasi dan kategori relationships
 * 
 * Teori Graph digunakan untuk:
 * - Struktur menu navigasi
 * - Kategori dan sub-kategori
 * - Breadcrumb navigation
 * - Related products
 */

export interface GraphNode {
  id: string;
  label: string;
  data?: Record<string, unknown>;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  label?: string;
}

/**
 * Graph class untuk navigasi
 */
export class NavigationGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private adjacencyList: Map<string, Set<string>> = new Map();
  private reverseAdjacencyList: Map<string, Set<string>> = new Map();

  /**
   * Add node ke graph
   */
  addNode(node: GraphNode): void {
    this.nodes.set(node.id, node);
    if (!this.adjacencyList.has(node.id)) {
      this.adjacencyList.set(node.id, new Set());
    }
    if (!this.reverseAdjacencyList.has(node.id)) {
      this.reverseAdjacencyList.set(node.id, new Set());
    }
  }

  /**
   * Add edge (directed) antara dua node
   */
  addEdge(from: string, to: string): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, new Set());
    }
    if (!this.reverseAdjacencyList.has(to)) {
      this.reverseAdjacencyList.set(to, new Set());
    }
    
    this.adjacencyList.get(from)!.add(to);
    this.reverseAdjacencyList.get(to)!.add(from);
  }

  /**
   * Get node by ID
   */
  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Get children of a node
   */
  getChildren(nodeId: string): GraphNode[] {
    const childIds = this.adjacencyList.get(nodeId) || new Set();
    return [...childIds].map(id => this.nodes.get(id)!).filter(Boolean);
  }

  /**
   * Get parent of a node
   */
  getParent(nodeId: string): GraphNode | undefined {
    const parentIds = this.reverseAdjacencyList.get(nodeId) || new Set();
    const parentId = [...parentIds][0];
    return parentId ? this.nodes.get(parentId) : undefined;
  }

  /**
   * Get path from root to node (for breadcrumb)
   */
  getPath(nodeId: string): GraphNode[] {
    const path: GraphNode[] = [];
    let currentId: string | undefined = nodeId;
    
    while (currentId) {
      const node = this.nodes.get(currentId);
      if (node) {
        path.unshift(node);
      }
      const parentIds = this.reverseAdjacencyList.get(currentId);
      currentId = parentIds ? [...parentIds][0] : undefined;
    }
    
    return path;
  }

  /**
   * BFS traversal untuk mencari semua descendants
   */
  getAllDescendants(nodeId: string): GraphNode[] {
    const descendants: GraphNode[] = [];
    const visited = new Set<string>();
    const queue = [nodeId];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      
      if (visited.has(currentId)) continue;
      visited.add(currentId);
      
      if (currentId !== nodeId) {
        const node = this.nodes.get(currentId);
        if (node) descendants.push(node);
      }
      
      const children = this.adjacencyList.get(currentId) || new Set();
      queue.push(...children);
    }
    
    return descendants;
  }

  /**
   * Get all leaf nodes (nodes without children)
   */
  getLeafNodes(): GraphNode[] {
    return [...this.nodes.values()].filter(node => {
      const children = this.adjacencyList.get(node.id);
      return !children || children.size === 0;
    });
  }

  /**
   * Get root nodes (nodes without parents)
   */
  getRootNodes(): GraphNode[] {
    return [...this.nodes.values()].filter(node => {
      const parents = this.reverseAdjacencyList.get(node.id);
      return !parents || parents.size === 0;
    });
  }
}

/**
 * Create category navigation graph
 */
export function createCategoryGraph(): NavigationGraph {
  const graph = new NavigationGraph();
  
  // Root node
  graph.addNode({ id: 'root', label: 'All Categories' });
  
  // Main categories
  const categories = [
    { id: 'dress', label: 'Dress' },
    { id: 't-shirt', label: 'T-Shirt' },
    { id: 'hoodie', label: 'Hoodie' },
    { id: 'sweater', label: 'Sweater' },
    { id: 'jacket', label: 'Jacket' },
    { id: 'pants', label: 'Pants' },
    { id: 'shoes', label: 'Shoes' }
  ];
  
  categories.forEach(cat => {
    graph.addNode(cat);
    graph.addEdge('root', cat.id);
  });
  
  // Sub-categories
  const subCategories = [
    // Dress
    { id: 'casual-dress', label: 'Casual Dress', parent: 'dress' },
    { id: 'formal-dress', label: 'Formal Dress', parent: 'dress' },
    { id: 'mini-dress', label: 'Mini Dress', parent: 'dress' },
    
    // T-Shirt
    { id: 'basic-tee', label: 'Basic Tee', parent: 't-shirt' },
    { id: 'graphic-tee', label: 'Graphic Tee', parent: 't-shirt' },
    { id: 'oversized-tee', label: 'Oversized Tee', parent: 't-shirt' },
    
    // Hoodie
    { id: 'pullover-hoodie', label: 'Pullover', parent: 'hoodie' },
    { id: 'zip-hoodie', label: 'Zip-Up', parent: 'hoodie' },
    
    // Jacket
    { id: 'bomber-jacket', label: 'Bomber', parent: 'jacket' },
    { id: 'denim-jacket', label: 'Denim', parent: 'jacket' },
    { id: 'leather-jacket', label: 'Leather', parent: 'jacket' },
    
    // Pants
    { id: 'jeans', label: 'Jeans', parent: 'pants' },
    { id: 'chinos', label: 'Chinos', parent: 'pants' },
    { id: 'joggers', label: 'Joggers', parent: 'pants' },
    
    // Shoes
    { id: 'sneakers', label: 'Sneakers', parent: 'shoes' },
    { id: 'boots', label: 'Boots', parent: 'shoes' },
    { id: 'sandals', label: 'Sandals', parent: 'shoes' }
  ];
  
  subCategories.forEach(sub => {
    graph.addNode({ id: sub.id, label: sub.label });
    graph.addEdge(sub.parent, sub.id);
  });
  
  return graph;
}

// Export singleton instance
export const categoryGraph = createCategoryGraph();

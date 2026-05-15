import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  featured?: boolean;
  description?: string;
  desc?: string; // mapping for old code
  oldPrice?: number;
  rating?: number;
  reviews?: number;
}

// Simple in-memory cache
let productsCache: Product[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function getProducts(forceRefresh = false): Promise<Product[]> {
  const now = Date.now();
  if (!forceRefresh && productsCache && (now - lastFetchTime < CACHE_DURATION)) {
    return productsCache;
  }

  const path = 'products';
  try {
    const q = query(collection(db, path), orderBy('name', 'asc'));
    const snap = await getDocs(q);
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    productsCache = data;
    lastFetchTime = now;
    return data;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter(p => p.featured).slice(0, 4);
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find(p => p.id === id) || null;
}

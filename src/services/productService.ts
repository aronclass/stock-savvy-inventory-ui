
import { ProductType } from '@/components/product/ProductCard';
import { Alert } from '@/components/alerts/AlertsList';

// Mock data
const MOCK_PRODUCTS: ProductType[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    sku: 'APPL-IP14-128',
    category: 'Electronics',
    quantity: 25,
    threshold: 10,
    price: 999.99,
    imageUrl: 'https://source.unsplash.com/photo-1488590528505-98d2b5aba04b'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    sku: 'SMSG-S23-256',
    category: 'Electronics',
    quantity: 18,
    threshold: 15,
    price: 899.99,
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    sku: 'APPL-MBA-M2',
    category: 'Electronics',
    quantity: 12,
    threshold: 8,
    price: 1299.99,
    imageUrl: 'https://source.unsplash.com/photo-1531297484001-80022131f5a1'
  },
  {
    id: '4',
    name: 'Organic Apples',
    sku: 'FOOD-APL-ORG',
    category: 'Food',
    quantity: 45,
    threshold: 20,
    expiryDate: '2025-05-10',
    price: 2.99,
  },
  {
    id: '5',
    name: 'Whole Milk',
    sku: 'FOOD-MLK-GAL',
    category: 'Food',
    quantity: 8,
    threshold: 10,
    expiryDate: '2025-05-08',
    price: 3.49,
  },
  {
    id: '6',
    name: 'Office Chair',
    sku: 'FURN-CHR-EXC',
    category: 'Furniture',
    quantity: 5,
    threshold: 3,
    price: 199.99,
  },
  {
    id: '7',
    name: 'Wireless Mouse',
    sku: 'TECH-MOU-WRL',
    category: 'Office Supplies',
    quantity: 3,
    threshold: 5,
    price: 29.99,
    imageUrl: 'https://source.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    id: '8',
    name: 'Coffee Pods',
    sku: 'GRCR-COF-POD',
    category: 'Beverages',
    quantity: 15,
    threshold: 10,
    expiryDate: '2025-08-15',
    price: 14.99,
  }
];

class ProductService {
  products: ProductType[] = [...MOCK_PRODUCTS];
  
  async getProducts(): Promise<ProductType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.products), 300);
    });
  }
  
  async getProductById(id: string): Promise<ProductType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.products.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  }
  
  async addProduct(product: Omit<ProductType, 'id'>): Promise<ProductType> {
    return new Promise((resolve) => {
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...product
      };
      
      this.products.push(newProduct);
      
      setTimeout(() => resolve(newProduct), 300);
    });
  }
  
  async updateProduct(id: string, product: Omit<ProductType, 'id'>): Promise<ProductType | undefined> {
    return new Promise((resolve) => {
      const index = this.products.findIndex(p => p.id === id);
      
      if (index !== -1) {
        const updatedProduct = {
          id,
          ...product
        };
        
        this.products[index] = updatedProduct;
        resolve(updatedProduct);
      } else {
        resolve(undefined);
      }
    });
  }
  
  async deleteProduct(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const initialLength = this.products.length;
      this.products = this.products.filter(p => p.id !== id);
      
      setTimeout(() => {
        resolve(this.products.length < initialLength);
      }, 300);
    });
  }
  
  async getLowStockProducts(): Promise<ProductType[]> {
    return new Promise((resolve) => {
      const lowStock = this.products.filter(p => p.quantity <= p.threshold);
      
      setTimeout(() => resolve(lowStock), 300);
    });
  }
  
  async getExpiringSoonProducts(): Promise<ProductType[]> {
    return new Promise((resolve) => {
      const now = new Date();
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(now.getDate() + 30);
      
      const expiringSoon = this.products.filter(p => {
        if (!p.expiryDate) return false;
        
        const expiryDate = new Date(p.expiryDate);
        return expiryDate > now && expiryDate <= thirtyDaysLater;
      });
      
      setTimeout(() => resolve(expiringSoon), 300);
    });
  }
  
  async getAlerts(): Promise<Alert[]> {
    return new Promise((resolve) => {
      const lowStockProducts = this.products.filter(p => p.quantity <= p.threshold);
      const expiringSoonProducts = this.products.filter(p => {
        if (!p.expiryDate) return false;
        
        const now = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(now.getDate() + 30);
        
        const expiryDate = new Date(p.expiryDate);
        return expiryDate > now && expiryDate <= thirtyDaysLater;
      });
      
      const alerts: Alert[] = [
        ...lowStockProducts.map(p => ({
          id: `low-${p.id}`,
          type: 'low-stock' as const,
          productId: p.id,
          productName: p.name,
          message: `Low stock alert: Only ${p.quantity} units remaining (threshold: ${p.threshold})`,
          date: new Date(),
          isRead: false
        })),
        ...expiringSoonProducts.map(p => ({
          id: `exp-${p.id}`,
          type: 'expiring-soon' as const,
          productId: p.id,
          productName: p.name,
          message: `Expiring soon: Product will expire on ${new Date(p.expiryDate!).toLocaleDateString()}`,
          date: new Date(),
          isRead: false
        }))
      ];
      
      setTimeout(() => resolve(alerts), 300);
    });
  }
}

export const productService = new ProductService();

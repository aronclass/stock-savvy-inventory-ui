
import { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Package, AlertTriangle, CalendarClock, ShoppingCart } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { productService } from '@/services/productService';
import { ProductType } from '@/components/product/ProductCard';
import AlertsList from '@/components/alerts/AlertsList';
import { Alert } from '@/components/alerts/AlertsList';

const Dashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<ProductType[]>([]);
  const [expiringProducts, setExpiringProducts] = useState<ProductType[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await productService.getProducts();
        const lowStockData = await productService.getLowStockProducts();
        const expiringData = await productService.getExpiringSoonProducts();
        const alertsData = await productService.getAlerts();

        setProducts(productsData);
        setLowStockProducts(lowStockData);
        setExpiringProducts(expiringData);
        setAlerts(alertsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAsRead = (id: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  // Group products by category for chart data
  const categoryData = products.reduce((acc: any[], product) => {
    const existingCategory = acc.find(item => item.name === product.category);
    
    if (existingCategory) {
      existingCategory.count += 1;
      existingCategory.value += product.quantity;
    } else {
      acc.push({
        name: product.category,
        count: 1,
        value: product.quantity
      });
    }
    
    return acc;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-s9">
      <div>
        <h1 className="text-t7 font-bold mb-s6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s6">
          <StatsCard
            title="Total Products"
            value={products.length}
            icon={<Package className="h-6 w-6 text-primary-500" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          
          <StatsCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={<AlertTriangle className="h-6 w-6 text-warning-500" />}
            trend={{ value: 3.2, isPositive: false }}
          />
          
          <StatsCard
            title="Expiring Soon"
            value={expiringProducts.length}
            icon={<CalendarClock className="h-6 w-6 text-danger-500" />}
            trend={{ value: 0, isPositive: true }}
          />
          
          <StatsCard
            title="Total Value"
            value={`$${products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}`}
            icon={<ShoppingCart className="h-6 w-6 text-success-500" />}
            trend={{ value: 8.1, isPositive: true }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-s6">
        <div className="lg:col-span-2 bg-white p-s5 rounded-l shadow-s">
          <h2 className="text-t5 font-medium mb-s5">Inventory by Category</h2>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#636AE8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-l shadow-s">
          <div className="p-s5 border-b border-gray-100">
            <h2 className="text-t5 font-medium">Recent Alerts</h2>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <AlertsList 
              alerts={alerts.slice(0, 5)} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-s6">
        <div className="bg-white p-s5 rounded-l shadow-s">
          <h2 className="text-t5 font-medium mb-s4">Low Stock Products</h2>
          
          {lowStockProducts.length > 0 ? (
            <table className="w-full">
              <thead className="text-left bg-gray-50 border-b">
                <tr>
                  <th className="p-s3 text-t3 text-gray-500">Product</th>
                  <th className="p-s3 text-t3 text-gray-500">Quantity</th>
                  <th className="p-s3 text-t3 text-gray-500">Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lowStockProducts.map(product => (
                  <tr key={product.id}>
                    <td className="p-s3">{product.name}</td>
                    <td className="p-s3 text-danger">{product.quantity}</td>
                    <td className="p-s3">{product.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-s6">
              <p className="text-gray-500">No low stock products</p>
            </div>
          )}
        </div>
        
        <div className="bg-white p-s5 rounded-l shadow-s">
          <h2 className="text-t5 font-medium mb-s4">Expiring Soon</h2>
          
          {expiringProducts.length > 0 ? (
            <table className="w-full">
              <thead className="text-left bg-gray-50 border-b">
                <tr>
                  <th className="p-s3 text-t3 text-gray-500">Product</th>
                  <th className="p-s3 text-t3 text-gray-500">Expiry Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expiringProducts.map(product => (
                  <tr key={product.id}>
                    <td className="p-s3">{product.name}</td>
                    <td className="p-s3 text-warning">
                      {new Date(product.expiryDate!).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-s6">
              <p className="text-gray-500">No products expiring soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

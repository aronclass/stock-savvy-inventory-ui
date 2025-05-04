
import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import AlertsList, { Alert } from '@/components/alerts/AlertsList';
import { AlertTriangle } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'expiring-soon'>('all');

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Error loading alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlerts();
  }, []);

  const handleMarkAsRead = (id: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-t7 font-bold mb-s6">Alerts</h1>

      <div className="bg-white rounded-l shadow-s">
        <div className="p-s5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-t5 font-medium">All Alerts</h2>
          
          <div className="flex">
            <button
              onClick={() => setFilter('all')}
              className={`px-s3 py-s2 text-sm rounded-l-m ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('low-stock')}
              className={`px-s3 py-s2 text-sm ${
                filter === 'low-stock' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setFilter('expiring-soon')}
              className={`px-s3 py-s2 text-sm rounded-r-m ${
                filter === 'expiring-soon' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expiring Soon
            </button>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="p-s10 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-s4" />
            <h3 className="text-t5 text-gray-500 mb-s2">No alerts found</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? 'All products are well stocked and fresh!'
                : filter === 'low-stock'
                  ? 'No products with low stock'
                  : 'No products expiring soon'}
            </p>
          </div>
        ) : (
          <AlertsList 
            alerts={filteredAlerts} 
            onMarkAsRead={handleMarkAsRead} 
          />
        )}
      </div>
    </div>
  );
};

export default Alerts;

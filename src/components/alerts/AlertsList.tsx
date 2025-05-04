
import { AlertTriangle, CalendarClock, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Alert {
  id: string;
  type: 'low-stock' | 'expiring-soon';
  productId: string;
  productName: string;
  message: string;
  date: Date;
  isRead: boolean;
}

interface AlertsListProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
}

const AlertsList = ({ alerts, onMarkAsRead }: AlertsListProps) => {
  const renderIcon = (type: Alert['type']) => {
    switch (type) {
      case 'low-stock':
        return <AlertTriangle className="h-5 w-5 text-warning-500" />;
      case 'expiring-soon':
        return <CalendarClock className="h-5 w-5 text-danger-500" />;
      default:
        return <Package className="h-5 w-5 text-primary-500" />;
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'low-stock':
        return 'border-l-warning-500';
      case 'expiring-soon':
        return 'border-l-danger-500';
      default:
        return 'border-l-primary-500';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-s10">
        <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-s4" />
        <h3 className="text-t5 text-gray-500 mb-s2">No alerts found</h3>
        <p className="text-gray-400">All products are well stocked and fresh!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {alerts.map((alert) => (
        <li 
          key={alert.id} 
          className={cn(
            "p-s4 border-l-4 flex items-start",
            getAlertStyles(alert.type),
            alert.isRead ? 'bg-white' : 'bg-gray-50'
          )}
        >
          <div className="mr-s4">
            {renderIcon(alert.type)}
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-t4">{alert.productName}</h4>
            <p className="text-gray-600 mt-s1">{alert.message}</p>
            <div className="flex items-center justify-between mt-s3">
              <span className="text-t2 text-gray-500">
                {alert.date.toLocaleDateString()}
              </span>
              
              {!alert.isRead && (
                <button
                  onClick={() => onMarkAsRead(alert.id)}
                  className="text-t2 text-primary-500 hover:text-primary-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AlertsList;

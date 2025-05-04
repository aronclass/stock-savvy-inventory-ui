
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package, 
  Box, 
  AlertTriangle, 
  CalendarClock, 
  BarChart2,
  Settings, 
  Users,
  ShoppingCart
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart2 },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Inventory', path: '/inventory', icon: Box },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
    { name: 'Expiry Tracking', path: '/expiry', icon: CalendarClock },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  if (isMobile && collapsed) return null;
  
  return (
    <aside className={cn(
      "bg-white border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className={cn("p-s5 flex items-center", collapsed && "justify-center")}>
        {!collapsed && (
          <h1 className="text-t6 font-bold text-primary">
            <Link to="/">Stock Savvy</Link>
          </h1>
        )}
        {collapsed && (
          <div className="h-10 w-10 bg-primary rounded-m flex items-center justify-center text-white font-bold">
            SS
          </div>
        )}
        {!isMobile && (
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="ml-auto text-gray-500 hover:text-primary"
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
      </div>
      
      <nav className="flex-1 py-s5">
        <ul className="space-y-s2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-s5 py-s3 mx-s2 rounded-m transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary-100 text-primary-600" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-s4">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={cn(
        "p-s5 border-t border-border",
        collapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-100-percent bg-primary-100 flex items-center justify-center font-medium text-primary">
            AM
          </div>
          {!collapsed && (
            <div className="ml-s3">
              <p className="text-sm font-medium">Admin Manager</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

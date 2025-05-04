
import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const TopBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-border h-16 flex items-center px-s5 sticky top-0 z-10">
      {isMobile && (
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="mr-s4 text-gray-500"
        >
          <Menu size={24} />
        </button>
      )}
      
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search products, orders..."
          className="pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-m w-full focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div className="ml-auto flex items-center gap-s4">
        <button className="relative p-s2 rounded-100-percent hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-100-percent"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;

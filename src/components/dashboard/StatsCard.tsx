
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  return (
    <div className={cn("stats-card", className)}>
      <div>
        <p className="text-t3 text-gray-500 mb-s1">{title}</p>
        <h3 className="text-t7 font-medium">{value}</h3>
        
        {trend && (
          <div className="flex items-center mt-s2">
            <span 
              className={cn(
                "text-t2 font-medium",
                trend.isPositive ? "text-success-600" : "text-danger-600"
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-t2 text-gray-500 ml-s1">vs. last month</span>
          </div>
        )}
      </div>
      
      <div className="p-s3 rounded-m bg-primary-100">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;

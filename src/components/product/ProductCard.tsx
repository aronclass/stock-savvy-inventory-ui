
import { cn } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProductType {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  threshold: number;
  expiryDate?: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: ProductType;
  onEdit: (product: ProductType) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const isLowStock = product.quantity <= product.threshold;
  const isExpiringSoon = product.expiryDate && 
    new Date(product.expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000; // 30 days

  return (
    <div className="bg-white rounded-l shadow-s card-hover">
      <div className="p-s4">
        <div className="aspect-square w-full bg-gray-100 rounded-m mb-s4 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        
        <h3 className="font-medium text-t4 line-clamp-1 mb-s1">
          <Link to={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-500 text-t3 mb-s2">{product.sku}</p>
        
        <div className="flex items-center justify-between mb-s3">
          <span className="bg-gray-100 text-gray-700 px-s3 py-s1 rounded-m text-t2">
            {product.category}
          </span>
          <span className="font-medium text-t4">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-s1">
          <span className="text-t3 text-gray-700">Quantity:</span>
          <span className={cn("font-medium", isLowStock ? "text-danger" : "text-gray-900")}>
            {product.quantity}
          </span>
        </div>
        
        {product.expiryDate && (
          <div className="flex justify-between items-center mb-s3">
            <span className="text-t3 text-gray-700">Expires:</span>
            <span className={cn(
              "font-medium", 
              isExpiringSoon ? "text-warning" : "text-gray-900"
            )}>
              {new Date(product.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="flex justify-between pt-s3 border-t border-gray-100">
          <button 
            onClick={() => onEdit(product)} 
            className="p-s2 text-gray-500 hover:text-primary"
          >
            <Edit size={18} />
          </button>
          
          <button 
            onClick={() => onDelete(product.id)} 
            className="p-s2 text-gray-500 hover:text-danger"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

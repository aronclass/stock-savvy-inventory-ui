
import { useState } from 'react';
import { ProductType } from './ProductCard';

interface ProductFormProps {
  initialData?: ProductType;
  onSubmit: (data: Omit<ProductType, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<ProductType, 'id'>>({
    name: initialData?.name || '',
    sku: initialData?.sku || '',
    category: initialData?.category || '',
    quantity: initialData?.quantity || 0,
    threshold: initialData?.threshold || 5,
    expiryDate: initialData?.expiryDate || '',
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-s5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-s5">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium mb-s2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="sku" 
            className="block text-sm font-medium mb-s2"
          >
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="category" 
            className="block text-sm font-medium mb-s2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Furniture">Furniture</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="price" 
            className="block text-sm font-medium mb-s2"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="quantity" 
            className="block text-sm font-medium mb-s2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="threshold" 
            className="block text-sm font-medium mb-s2"
          >
            Low Stock Threshold
          </label>
          <input
            type="number"
            id="threshold"
            name="threshold"
            value={formData.threshold}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="expiryDate" 
            className="block text-sm font-medium mb-s2"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div>
          <label 
            htmlFor="imageUrl" 
            className="block text-sm font-medium mb-s2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-m px-s3 py-s2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-s3">
        <button
          type="button"
          onClick={onCancel}
          className="px-s5 py-s3 border border-gray-300 rounded-m text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-s5 py-s3 bg-primary text-white rounded-m hover:bg-primary-600"
        >
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

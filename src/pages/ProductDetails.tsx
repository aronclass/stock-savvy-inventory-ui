
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Package, Tag, Calendar, AlertTriangle, Box } from 'lucide-react';
import { productService } from '@/services/productService';
import { ProductType } from '@/components/product/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await productService.getProductById(id);
        
        if (data) {
          setProduct(data);
        } else {
          toast({
            title: "Error",
            description: "Product not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-s16">
        <Package size={64} className="text-gray-300 mb-s6" />
        <h2 className="text-t6 font-medium mb-s2">Product not found</h2>
        <p className="text-gray-500 mb-s6">
          The product you're looking for doesn't exist or has been removed
        </p>
        <Link
          to="/products"
          className="flex items-center px-s4 py-s3 bg-primary text-white rounded-m hover:bg-primary-600"
        >
          <ArrowLeft size={18} className="mr-s2" />
          Back to Products
        </Link>
      </div>
    );
  }

  const isLowStock = product.quantity <= product.threshold;
  const isExpiringSoon = product.expiryDate && 
    new Date(product.expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000; // 30 days

  return (
    <div>
      <div className="flex items-center mb-s6">
        <Link to="/products" className="mr-s4 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-t7 font-bold">Product Details</h1>
        <Link 
          to={`/products/edit/${product.id}`} 
          className="ml-auto flex items-center px-s4 py-s2 bg-primary text-white rounded-m hover:bg-primary-600"
        >
          <Edit size={16} className="mr-s2" />
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-s6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-l shadow-s p-s6">
            <div className="flex flex-col md:flex-row gap-s6">
              <div className="w-full md:w-1/3">
                <div className="aspect-square w-full bg-gray-100 rounded-m overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package size={64} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-s2">
                  <span className="bg-gray-100 text-gray-700 px-s3 py-s1 rounded-m text-t3">
                    {product.category}
                  </span>
                  <span className="ml-s3 text-gray-500 text-t3">{product.sku}</span>
                </div>

                <h2 className="text-t6 font-medium mb-s4">{product.name}</h2>

                <div className="mb-s6">
                  <p className="text-t7 font-semibold text-primary-700">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-s5">
                  <div className="flex items-center">
                    <div className="p-s2 rounded-m bg-primary-100 mr-s3">
                      <Box className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-t2 text-gray-500">Inventory</p>
                      <p className={cn(
                        "text-t4 font-medium",
                        isLowStock ? "text-danger" : "text-gray-900"
                      )}>
                        {product.quantity} in stock
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-s2 rounded-m bg-primary-100 mr-s3">
                      <AlertTriangle className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-t2 text-gray-500">Low Stock Threshold</p>
                      <p className="text-t4 font-medium">{product.threshold} units</p>
                    </div>
                  </div>

                  {product.expiryDate && (
                    <div className="flex items-center">
                      <div className="p-s2 rounded-m bg-primary-100 mr-s3">
                        <Calendar className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-t2 text-gray-500">Expiry Date</p>
                        <p className={cn(
                          "text-t4 font-medium",
                          isExpiringSoon ? "text-warning" : "text-gray-900"
                        )}>
                          {new Date(product.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-l shadow-s p-s5">
            <h3 className="text-t5 font-medium mb-s4">Product Status</h3>

            <div className="space-y-s4">
              <div className="flex items-center justify-between p-s3 bg-gray-50 rounded-m">
                <span className="text-gray-700">Stock Level</span>
                <span className={cn(
                  "font-medium",
                  isLowStock ? "text-danger" : "text-success"
                )}>
                  {isLowStock ? 'Low Stock' : 'In Stock'}
                </span>
              </div>

              {product.expiryDate && (
                <div className="flex items-center justify-between p-s3 bg-gray-50 rounded-m">
                  <span className="text-gray-700">Expiry Status</span>
                  <span className={cn(
                    "font-medium",
                    isExpiringSoon ? "text-warning" : "text-success"
                  )}>
                    {isExpiringSoon ? 'Expiring Soon' : 'Good'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between p-s3 bg-gray-50 rounded-m">
                <span className="text-gray-700">Total Value</span>
                <span className="font-medium">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-s6">
              <h4 className="text-t4 font-medium mb-s3">Quick Actions</h4>

              <div className="space-y-s3">
                <button className="w-full py-s3 px-s4 bg-primary text-white rounded-m hover:bg-primary-600 flex items-center justify-center">
                  <Box className="h-4 w-4 mr-s2" />
                  Update Quantity
                </button>
                
                <button className="w-full py-s3 px-s4 border border-gray-300 text-gray-700 rounded-m hover:bg-gray-50 flex items-center justify-center">
                  <Tag className="h-4 w-4 mr-s2" />
                  Print Barcode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


import { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
import { productService } from '@/services/productService';
import ProductCard, { ProductType } from '@/components/product/ProductCard';
import ProductForm from '@/components/product/ProductForm';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: ProductType) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const handleFormSubmit = async (formData: Omit<ProductType, 'id'>) => {
    try {
      if (currentProduct) {
        await productService.updateProduct(currentProduct.id, formData);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await productService.addProduct(formData);
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }
      
      setIsModalOpen(false);
      setCurrentProduct(undefined);
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-s6">
        <h1 className="text-t7 font-bold">Products</h1>
        <button
          onClick={() => {
            setCurrentProduct(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center px-s4 py-s3 bg-primary text-white rounded-m hover:bg-primary-600"
        >
          <Plus size={18} className="mr-s2" />
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-s16 text-center">
          <Package size={64} className="text-gray-300 mb-s6" />
          <h2 className="text-t6 font-medium mb-s2">No products found</h2>
          <p className="text-gray-500 mb-s6">
            Get started by adding your first product to the inventory
          </p>
          <button
            onClick={() => {
              setCurrentProduct(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center px-s4 py-s3 bg-primary text-white rounded-m hover:bg-primary-600"
          >
            <Plus size={18} className="mr-s2" />
            Add First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-s6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-s4">
          <div className="bg-white rounded-l shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-s5 border-b border-gray-200">
              <h2 className="text-t5 font-medium">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <div className="p-s5">
              <ProductForm
                initialData={currentProduct}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setCurrentProduct(undefined);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

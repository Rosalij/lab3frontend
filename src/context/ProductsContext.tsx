import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

//shape of category
interface Category {
    name: string;
}

//shape of product
export interface Product {
    _id: string;
    name: string;
    price: number;
    category?: Category;
}
//shape of context
interface ProductsContextType {
    products: Product[];
    loading: boolean;
    fetchProducts: () => Promise<void>;
    updateProductById: (id: string, updated: Product) => Promise<void>;
    deleteProductById: (id: string) => Promise<void>;
}

// create contenxt
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

//provider component
interface ProductsProviderProps {
    children: ReactNode;
}

//provider component for global state manegement of products
export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "https://snowshopbackend.onrender.com";

    // get all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/products`);
            if (!res.ok) throw new Error("Failed to fetch products");
            const data: Product[] = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    //update product by id
    const updateProductById = async (id: string, updated: Product) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(updated)
            });
            if (!res.ok) throw new Error("Failed to update product");
            const updatedProduct = await res.json();
            setProducts((prev) => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        } catch (err) {
            console.error("Error updating product:", err);
        }

        fetchProducts(); // Refresh products after update
    };

    //delete product by id
    const deleteProductById = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!res.ok) throw new Error("Failed to delete product");
  

            setProducts((prev) => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    //refresh products
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{ products, loading, fetchProducts, updateProductById, deleteProductById }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

//custom hook for using products context
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProducts must be used within ProductsProvider");
    return context;
};

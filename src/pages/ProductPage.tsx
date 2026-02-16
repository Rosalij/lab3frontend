import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../context/ProductsContext";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
// get all products
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://snowshopbackend.onrender.com/products/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to fetch product");
            const data: Product = await res.json();
            setProduct(data);
            console.log("Fetched product:", data);
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Loading product...</p>;
  if (!product) return <p className="text-center text-muted">Product not found</p>;

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p>Price: €{product.price}</p>
      <p>Description: {product.description || "No description available."}</p>
    </div>
  );
}

export default ProductPage;

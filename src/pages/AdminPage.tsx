import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AdminProductsTable from "../components/AdminProductTable";
import { useProducts, type Product } from "../context/ProductsContext";

// shape of category
interface Category {
  _id: string;
  name: string;
}


function AdminPage() {
  const { user } = useAuth();
  const { products, loading, updateProductById, deleteProductById, addProduct } = useProducts();

  // Form state for adding new product
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://snowshopbackend.onrender.com/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Could not fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle edit action
  const handleEdit = async (updated: Product) => {
    await updateProductById(updated._id, updated);
  };

  // Handle delete action
  const handleDelete = (id: string) => {
    deleteProductById(id);
  };

  // Handle add product form submission
const handleAdd = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || price <= 0 || !categoryId) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  try {
    await addProduct({
      name,
      price,
      description: "",   // backend requires description, but we can leave it empty for now
      stock: 10,        // required by backend
      category: categoryId  // just the ID
    });
    setName("");
    setPrice("" as any);
    setCategoryId("");
  } catch (err) {
    console.error("Could not add product:", err);
  }
};

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Admin Page, welcome {user?.username}!</h1>
      <p>You can add, edit, and delete products here.</p>

      {/* Add Product Form */}
      <form onSubmit={handleAdd} className="mb-4">
        <div className="mb-2">
            <label htmlFor="name" className="form-label">Product Name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
            <label htmlFor="price" className="form-label">Price (€):</label>
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            required
          />
        </div>


        <div className="mb-2">
            <label htmlFor="category" className="form-label">Category:</label>
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-success" type="submit">Add Product</button>
      </form>

      {/* Products Table */}
      <AdminProductsTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminPage;

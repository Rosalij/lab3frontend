import React from "react";
import { useAuth } from "../context/authContext";
import AdminProductsTable from "../components/AdminProductTable";
import { useProducts } from "../context/ProductsContext";

function AdminPage() {
    //get user and products from context
  const { user } = useAuth();
  const { products, loading, updateProductById, deleteProductById } = useProducts();

  //handle edit and delete actions
  const handleEdit = async (updated: any) => {
    await updateProductById(updated._id, updated);
  };

  const handleDelete = (id: string) => {

    deleteProductById(id);
  };

  
  return (
    <div className="container mt-5">
      <h1 className="mb-3">Admin Page, welcome {user?.username}!</h1>
      <p>You can edit products here.</p>

      <AdminProductsTable //pass props to table component
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminPage;

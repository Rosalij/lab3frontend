import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { products, loading } = useProducts();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Products List</h2>
      {loading && <p className="text-center">Loading products...</p>}
      {!loading && products.length > 0 && (
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price (€)</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/product/${p._id}`} className="text-decoration-none">
                    {p.name}
                  </Link>
                </td>
                <td>{p.price}</td>
                <td>{p.category?.name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center text-muted">No products found.</p>
      )}
    </div>
  );
}

export default HomePage;

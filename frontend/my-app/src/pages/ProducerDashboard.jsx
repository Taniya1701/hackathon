import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function ProducerDashboard({ setPage }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => {
        console.error("Could not load products:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <p className="small-title">PRODUCER PORTAL</p>
          <h1>Producer Dashboard 👩‍🌾</h1>
          <p>
            Manage your products and make your supply available
            to buyers.
          </p>
        </div>

        <button onClick={() => setPage("addSupply")}>
          + Add Supply
        </button>
      </div>

      <h2>My Products</h2>

      {products.length === 0 ? (
        <div className="empty">
          <h3>No products yet</h3>
          <p>Add your first product to get started.</p>

          <button onClick={() => setPage("addSupply")}>
            Add Supply
          </button>
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProducerDashboard;
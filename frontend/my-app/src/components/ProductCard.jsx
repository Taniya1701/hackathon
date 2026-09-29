function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>🌱 {product.name}</h3>

      <p>
        <strong>Producer:</strong> {product.producer_name}
      </p>

      <p>
        <strong>Available:</strong>{" "}
        {product.available_quantity} {product.unit}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}/{product.unit}
      </p>

      <p>
        <strong>Location:</strong> 📍 {product.location}
      </p>
    </div>
  );
}

export default ProductCard;
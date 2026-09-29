function MatchCard({ match }) {
  return (
    <div className="card match-card">
      <h3>🤝 {match.producer_name}</h3>

      <p>
        <strong>Product:</strong> {match.product_name}
      </p>

      <p>
        <strong>Quantity:</strong> {match.allocated_quantity}{" "}
        {match.unit}
      </p>

      <p>
        <strong>Price:</strong> ₹{match.price}/{match.unit}
      </p>

      <p>
        <strong>Location:</strong> {match.location}
      </p>

      <div className="score">
        Match Score: {match.match_score}%
      </div>
    </div>
  );
}

export default MatchCard;

import MatchCard from "../components/MatchCard";

function MatchingResults({ data, setPage }) {
  if (!data) {
    return (
      <div className="container">
        <h1>No requirement found.</h1>

        <button onClick={() => setPage("buyer")}>
          Back to Buyer Dashboard
        </button>
      </div>
    );
  }

  const matches = data.suppliers || [];

  return (
    <div className="container">
      <p className="small-title">SMART MATCHING</p>

      <h1>Matching Results 🤝</h1>

      <div className="requirement-summary">
        <div>
          <span>Product</span>
          <strong>{data.product_name}</strong>
        </div>

        <div>
          <span>Required</span>
          <strong>
            {data.required_quantity} {data.unit}
          </strong>
        </div>

        <div>
          <span>Matched</span>
          <strong>
            {data.matched_quantity ?? 0} {data.unit}
          </strong>
        </div>

        <div>
          <span>Fulfillment</span>
          <strong>
            {data.fulfillment_percentage ?? 0}%
          </strong>
        </div>
      </div>

      {matches.length > 0 ? (
        <>
          <h2>Matched Producers</h2>

          <div className="grid">
            {matches.map((match, index) => (
              <MatchCard
                key={index}
                match={match}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty">
          <h2>🔍 Matching engine is working...</h2>

          <p>
            Producers matching this requirement will appear
            here.
          </p>
        </div>
      )}

      {data.fully_fulfilled && (
        <div className="success-box">
          <h2>🎉 Requirement Fully Fulfilled!</h2>

          <p>
            Multiple producers can collectively supply the
            complete requirement.
          </p>

          <button>
            Create Collective Proposal
          </button>
        </div>
      )}

      <button
        className="back-button"
        onClick={() => setPage("buyer")}
      >
        ← Back to Buyer Dashboard
      </button>
    </div>
  );
}

export default MatchingResults;


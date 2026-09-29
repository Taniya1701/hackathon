function BuyerDashboard({ setPage }) {
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <p className="small-title">BUYER PORTAL</p>

          <h1>Buyer Dashboard 🛒</h1>

          <p>
            Tell us what you need and we'll find producers
            who can collectively fulfill your requirement.
          </p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="icon">📋</div>

        <div>
          <h2>Post a Requirement</h2>

          <p>
            Need 100 kg of mushrooms? Post your requirement
            and SheSupply will find matching producers.
          </p>

          <button onClick={() => setPage("postRequirement")}>
            Post Requirement →
          </button>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <span>🔍</span>
          <h3>Smart Matching</h3>
          <p>
            Find producers based on product, quantity,
            price and location.
          </p>
        </div>

        <div className="info-card">
          <span>🤝</span>
          <h3>Collective Supply</h3>
          <p>
            Multiple small producers can fulfill one large
            requirement together.
          </p>
        </div>

        <div className="info-card">
          <span>📦</span>
          <h3>Simple Ordering</h3>
          <p>
            Get one clear proposal showing the complete
            supply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
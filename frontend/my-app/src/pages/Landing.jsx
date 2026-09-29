function Landing({ setPage }) {
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="badge">
          🌱 Empowering Women Producers
        </div>

        <h1>
          Grow Together.
          <br />
          <span>Sell Together.</span>
        </h1>

        <p>
          SheSupply connects women producers with buyers
          through collective supply and smart matching.
        </p>

        <div className="landing-buttons">
          <button onClick={() => setPage("producer")}>
            👩‍🌾 I'm a Producer
          </button>

          <button
            className="secondary"
            onClick={() => setPage("buyer")}
          >
            🛒 I'm a Buyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
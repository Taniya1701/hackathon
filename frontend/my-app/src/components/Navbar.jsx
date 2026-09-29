function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage("landing")}>
        🌱 SheSupply
      </div>

      <div className="nav-links">
        <button onClick={() => setPage("landing")}>Home</button>
        <button onClick={() => setPage("producer")}>Producer</button>
        <button onClick={() => setPage("buyer")}>Buyer</button>
      </div>
    </nav>
  );
}

export default Navbar;
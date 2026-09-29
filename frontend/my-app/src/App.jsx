import { useState } from "react";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import ProducerDashboard from "./pages/ProducerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AddSupply from "./pages/AddSupply";
import PostRequirement from "./pages/PostRequirement";
import MatchingResults from "./pages/MatchingResults";

function App() {
  const [page, setPage] = useState("landing");
  const [matchingData, setMatchingData] = useState(null);

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "landing" && <Landing setPage={setPage} />}
      {page === "producer" && <ProducerDashboard setPage={setPage} />}
      {page === "buyer" && <BuyerDashboard setPage={setPage} />}
      {page === "addSupply" && <AddSupply setPage={setPage} />}
      {page === "postRequirement" && (
        <PostRequirement setPage={setPage} setMatchingData={setMatchingData} />
      )}
      {page === "matching" && (
        <MatchingResults data={matchingData} setPage={setPage} />
      )}
    </>
  );
}

export default App;
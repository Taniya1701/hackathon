import { useState } from "react";
import { addRequirement } from "../services/api";

function PostRequirement({ setPage, setMatchingData }) {
  const [form, setForm] = useState({
    buyer_name: "",
    product_name: "",
    required_quantity: "",
    unit: "kg",
    budget: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await addRequirement({
        ...form,
        required_quantity: Number(form.required_quantity),
        budget: Number(form.budget),
      });

      setMatchingData(data);
      setPage("matching");
    } catch (error) {
      console.error(error);
      alert("Could not post requirement. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-container">
      <p className="small-title">BUYER</p>

      <h1>Post a Requirement 📋</h1>

      <p>
        Tell us what you need. We'll find producers who can
        supply it together.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Buyer Name</label>
        <input
          name="buyer_name"
          placeholder="e.g. Goa Restaurant"
          value={form.buyer_name}
          onChange={handleChange}
          required
        />

        <label>Product Needed</label>
        <input
          name="product_name"
          placeholder="e.g. Oyster Mushroom"
          value={form.product_name}
          onChange={handleChange}
          required
        />

        <label>Required Quantity</label>
        <div className="input-row">
          <input
            name="required_quantity"
            type="number"
            min="0"
            placeholder="100"
            value={form.required_quantity}
            onChange={handleChange}
            required
          />

          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="pieces">pieces</option>
          </select>
        </div>

        <label>Maximum Budget per Unit</label>
        <input
          name="budget"
          type="number"
          min="0"
          placeholder="220"
          value={form.budget}
          onChange={handleChange}
          required
        />

        <label>Delivery Location</label>
        <input
          name="location"
          placeholder="e.g. Goa"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Finding Producers..." : "Find Matching Producers 🔍"}
        </button>

        <button
          type="button"
          className="cancel"
          onClick={() => setPage("buyer")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PostRequirement;
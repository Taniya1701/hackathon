import { useState } from "react";
import { addProduct } from "../services/api";

function AddSupply({ setPage }) {
  const [form, setForm] = useState({
    producer_name: "",
    name: "",
    available_quantity: "",
    unit: "kg",
    price: "",
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
      await addProduct({
        ...form,
        available_quantity: Number(form.available_quantity),
        price: Number(form.price),
      });

      alert("Supply added successfully! 🌱");
      setPage("producer");
    } catch (error) {
      console.error(error);
      alert("Could not add supply. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-container">
      <p className="small-title">PRODUCER</p>

      <h1>Add Your Supply 🌱</h1>

      <p>Tell buyers what you currently have available.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Producer Name</label>
        <input
          name="producer_name"
          placeholder="e.g. Anita"
          value={form.producer_name}
          onChange={handleChange}
          required
        />

        <label>Product Name</label>
        <input
          name="name"
          placeholder="e.g. Oyster Mushroom"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Available Quantity</label>
        <div className="input-row">
          <input
            name="available_quantity"
            type="number"
            min="0"
            placeholder="25"
            value={form.available_quantity}
            onChange={handleChange}
            required
          />

          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="pieces">pieces</option>
          </select>
        </div>

        <label>Price per Unit</label>
        <input
          name="price"
          type="number"
          min="0"
          placeholder="200"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          name="location"
          placeholder="e.g. Sawantwadi"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Supply 🌱"}
        </button>

        <button
          type="button"
          className="cancel"
          onClick={() => setPage("producer")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddSupply;
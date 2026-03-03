import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8087/api/categories";

  // Fetch Categories
  const fetchCategories = () => {
    axios.get(API_URL)
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, { name, description })
        .then(() => {
          setEditingId(null);
          setName("");
          setDescription("");
          fetchCategories();
        });
    } else {
      axios.post(API_URL, { name, description })
        .then(() => {
          setName("");
          setDescription("");
          fetchCategories();
        });
    }
  };

  // Delete
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchCategories());
  };

  // Edit
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Category Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <b>{cat.name}</b> - {cat.description}
            <button onClick={() => handleEdit(cat)}> Edit </button>
            <button onClick={() => handleDelete(cat.id)}> Delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
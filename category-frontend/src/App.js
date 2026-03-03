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
  <div className="container mt-5">
    <h2 className="text-center mb-4">Category Manager</h2>

    <div className="card shadow p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="submit">
              {editingId ? "Update Category" : "Add Category"}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div className="card shadow p-3">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default App;
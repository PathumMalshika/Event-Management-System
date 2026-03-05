import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/venues";

function App() {
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({ 
    name: "", 
    location: "", 
    capacity: "",
    date: "", 
    isAvailable: true 
  });
  const [editingId, setEditingId] = useState(null);

 
  const loadVenues = () => {
    axios.get(BASE_URL)
      .then(res => setVenues(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadVenues();
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${BASE_URL}/${editingId}`, formData)
        .then(() => {
          alert("Venue Updated! ✅");
          resetForm();
          loadVenues();
        })
        .catch(err => console.error(err));
    } else {
      axios.post(BASE_URL, formData)
        .then(() => {
          alert("Venue Added! 🏢");
          resetForm();
          loadVenues();
        })
        .catch(err => console.error(err));
    }
  };

  
  const handleEdit = (v) => {
    setEditingId(v.id);
    setFormData({ 
      name: v.name, 
      location: v.location, 
      capacity: v.capacity,
      date: v.date || "",
      isAvailable: v.isAvailable ?? true
    });
  };

  
  const handleDelete = (id) => {
    if (window.confirm("Delete this venue?")) {
      axios.delete(`${BASE_URL}/${id}`).then(() => loadVenues());
    }
  };

  
  const resetForm = () => {
    setFormData({ name: "", location: "", capacity: "", date: "", isAvailable: true });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center text-indigo-950 mb-12 uppercase tracking-tighter">
          Venue Management Center 🏛️
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          
          <div className="lg:col-span-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl border border-indigo-50 sticky top-10">
              <h2 className="text-2xl font-bold mb-6 text-indigo-900">
                {editingId ? "Update Venue 📝" : "Add New Venue ➕"}
              </h2>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Venue Name"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
                
                
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />

               
                <div className="flex items-center gap-3 p-2 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <input
                    type="checkbox"
                    id="available"
                    className="w-6 h-6 accent-indigo-600 rounded-lg cursor-pointer"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  />
                  <label htmlFor="available" className="text-gray-700 font-bold cursor-pointer select-none">
                    Currently Available
                  </label>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button 
                    type="submit" 
                    className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg active:scale-95 transition-all ${
                      editingId ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                    }`}
                  >
                    {editingId ? "Update Details" : "Save Venue"}
                  </button>
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="px-6 bg-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-900 text-white">
                    <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider">Venue Details</th>
                    <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider">Capacity & Date</th>
                    <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-center">Status</th>
                    <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {venues.map((v) => (
                    <tr key={v.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-gray-800 text-lg leading-tight">{v.name}</span>
                          <span className="text-gray-500 text-sm mt-1">📍 {v.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black inline-block">
                            {v.capacity} PAX
                          </span>
                          <div className="text-gray-600 text-sm font-medium flex items-center gap-1">
                            📅 {v.date || "Not set"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {v.isAvailable ? (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                            <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                            Booked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEdit(v)}
                            className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-100 transition-all active:scale-90"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(v.id)}
                            className="bg-rose-50 text-rose-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all active:scale-90"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {venues.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">
                        No venues registered yet. Use the form to add one! 🏛️
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Users, Mail, Edit, Save, X } from 'lucide-react';

const API_URL = "http://localhost:8080/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) { console.error("Fetching error:", err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editUserId}`, formData);
        setIsEditing(false);
        setEditUserId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', email: '', role: '' });
      fetchUsers();
    } catch (err) { console.error("Submission error:", err); }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
          <Users className="text-blue-400" size={40} /> User Management System
        </h1>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl mb-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            {isEditing ? <Edit className="text-orange-400" /> : <UserPlus className="text-emerald-400" />}
            {isEditing ? "Update User Details" : "Register New User"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 ml-1">Name</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 ml-1">Email</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="w-48">
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 ml-1">Role</label>
              <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none cursor-pointer" 
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isEditing ? <><Save size={18}/> Update</> : <><UserPlus size={18}/> Add User</>}
              </button>
              {isEditing && (
                <button type="button" onClick={() => {setIsEditing(false); setFormData({name:'', email:'', role:''})}} 
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl">
                  <X size={18}/>
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-700/50 text-slate-300">
              <tr>
                <th className="p-4 font-bold uppercase text-xs tracking-widest">User Info</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest">Email</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest text-center">Role</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-blue-100">{user.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-500 flex items-center gap-1"><Mail size={14}/> {user.email}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(user)} className="p-2 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white rounded-lg transition-all">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

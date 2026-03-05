import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Users, Mail, Edit, Save, X, Phone, MapPin, Building2, Search } from 'lucide-react';

const API_URL = "http://localhost:8080/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: '', 
    phoneNumber: '', 
    address: '', 
    city: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  
  // Search state එක
  const [searchId, setSearchId] = useState('');

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
      setFormData({ name: '', email: '', role: '', phoneNumber: '', address: '', city: '' });
      fetchUsers();
    } catch (err) { console.error("Submission error:", err); }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      role: user.role,
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      city: user.city || ''
    });
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    }
  };

  
  const filteredUsers = users.filter(user => 
    user.id.toString().includes(searchId)
  );

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
          <Users className="text-blue-400" size={40} /> User Management System
        </h1>

        
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl mb-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            {isEditing ? <Edit className="text-orange-400" /> : <UserPlus className="text-emerald-400" />}
            {isEditing ? "Update User Details" : "Register New User"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">Name</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">Email</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                placeholder="07xxxxxxxx" value={formData.phoneNumber} 
                onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">City</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="City Name" value={formData.city} 
                onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">Address</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Street Address" value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-slate-400 ml-1">Role</label>
              <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none cursor-pointer" 
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className={`flex-1 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isEditing ? <><Save size={18}/> Update</> : <><UserPlus size={18}/> Add User</>}
              </button>
              {isEditing && (
                <button type="button" onClick={() => {setIsEditing(false); setFormData({name:'', email:'', role:'', phoneNumber:'', address:'', city:''})}} 
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl">
                  <X size={18}/>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Section */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by ID..."
              className="w-full bg-slate-800 border border-slate-700 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 shadow-lg"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-700/50 text-slate-300">
              <tr>
                <th className="p-4 font-bold uppercase text-xs tracking-widest border-b border-slate-700">User Info</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest border-b border-slate-700">Contact</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest border-b border-slate-700">Location</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest text-center border-b border-slate-700">Role</th>
                <th className="p-4 font-bold uppercase text-xs tracking-widest text-right border-b border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4">
                      <div className="text-[10px] text-blue-400 font-mono mb-1 tracking-tighter">ID: #{user.id}</div>
                      <div className="font-semibold text-blue-100">{user.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-400 flex items-center gap-2 mb-1"><Mail size={14} className="text-blue-400"/> {user.email}</div>
                      <div className="text-sm text-slate-400 flex items-center gap-2"><Phone size={14} className="text-emerald-400"/> {user.phoneNumber || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-400 flex items-center gap-2 mb-1"><MapPin size={14} className="text-red-400"/> {user.address || 'N/A'}</div>
                      <div className="text-sm text-slate-400 flex items-center gap-2"><Building2 size={14} className="text-purple-400"/> {user.city || 'N/A'}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(user)} className="p-2 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white rounded-lg transition-all shadow-sm">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500 italic">
                    No users found matching ID: "{searchId}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

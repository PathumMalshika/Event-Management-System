import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge, roleBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function UsersPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const users = data.users.filter(u =>
    (filter === "All" || u.role === filter) &&
    (u.name.toLowerCase().includes(searchQ.toLowerCase()) ||
     u.email.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const deleteUser = (id) => openModal({
    content: (
      <ConfirmDialog
        title="Delete User"
        body="This will permanently remove the user and all associated data."
        icon="🗑️"
        onConfirm={() => { setData(d => ({ ...d, users: d.users.filter(u => u.id !== id) })); addToast("User deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = (user = null) => {
    let form = user
      ? { ...user }
      : { name: "", email: "", role: "CUSTOMER", status: "active", phone: "" };

    const save = () => {
      if (!form.name || !form.email) { addToast("Name and email required.", "error"); return; }
      if (user) {
        setData(d => ({ ...d, users: d.users.map(u => u.id === user.id ? { ...u, ...form } : u) }));
        addToast("User updated.");
      } else {
        setData(d => ({ ...d, users: [...d.users, { ...form, id: uid(), joined: "Mar 2026", avatar: "#9b6ef5" }] }));
        addToast("User created.");
      }
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">{user ? "Edit User" : "Add User"}</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg"><label className="fl">Full Name</label><input className="fi" defaultValue={form.name} onChange={e => form.name = e.target.value} placeholder="e.g. Saman Perera" /></div>
              <div className="fg"><label className="fl">Email</label><input className="fi" type="email" defaultValue={form.email} onChange={e => form.email = e.target.value} placeholder="email@example.com" /></div>
              <div className="fg"><label className="fl">Phone</label><input className="fi" defaultValue={form.phone} onChange={e => form.phone = e.target.value} placeholder="+94 77 ..." /></div>
              <div className="fg">
                <label className="fl">Role</label>
                <select className="fs" defaultValue={form.role} onChange={e => form.role = e.target.value}>
                  {["CUSTOMER", "ORGANIZER", "ATTENDEE", "ADMIN"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" defaultValue={form.status} onChange={e => form.status = e.target.value}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{user ? "Save Changes" : "Create User"}</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="User Service" title="Users" sub="Manage organizers, customers and attendees."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Add User</button>}
      />

      <div className="stats-row">
        {[
          ["👥", "All",        data.users.length],
          ["🎪", "Organizers", data.users.filter(u => u.role === "ORGANIZER").length],
          ["🎟️", "Customers",  data.users.filter(u => u.role === "CUSTOMER").length],
          ["🚫", "Inactive",   data.users.filter(u => u.status === "inactive").length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val">{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Users ({users.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "CUSTOMER", "ORGANIZER", "ATTENDEE", "ADMIN"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All Roles" : f}
              </span>
            ))}
          </div>
        </div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr><th>User</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div className="av" style={{ background: u.avatar }}>{u.name.charAt(0)}</div>
                      <span style={{ fontWeight: 500 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--tx2)" }}>{u.email}</td>
                  <td style={{ color: "var(--tx2)" }}>{u.phone}</td>
                  <td><span className={`badge ${roleBadge(u.role)}`}>{u.role}</span></td>
                  <td><span className={`badge ${statusBadge(u.status)}`}>{u.status}</span></td>
                  <td style={{ color: "var(--tx2)" }}>{u.joined}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon edit" onClick={() => openForm(u)}>{Icons.edit}</button>
                      <button className="btn-icon del"  onClick={() => deleteUser(u.id)}>{Icons.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="empty-state"><div className="empty-ico">👥</div><div className="empty-title">No users found</div></div>}
        </div>
      </div>
    </>
  );
}

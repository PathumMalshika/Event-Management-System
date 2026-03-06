import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function BookingsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const bookings = data.bookings.filter(b =>
    (filter === "All" || b.status === filter) &&
    (b.user.toLowerCase().includes(searchQ.toLowerCase()) ||
     b.event.toLowerCase().includes(searchQ.toLowerCase()) ||
     b.id.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const updateStatus = (id, status) => {
    setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, status } : b) }));
    addToast(`Booking ${status}.`);
  };

  const deleteBooking = (id) => openModal({
    content: (
      <ConfirmDialog title="Cancel Booking" body="This booking will be permanently cancelled and removed." icon="🗑️"
        onConfirm={() => { setData(d => ({ ...d, bookings: d.bookings.filter(b => b.id !== id) })); addToast("Booking removed.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = () => {
    let form = { user: "", event: "", tickets: 1, status: "pending", payment: "pending" };
    const save = () => {
      if (!form.user || !form.event) { addToast("Select user and event.", "error"); return; }
      const ticket = data.tickets.find(t => t.event === form.event);
      const total  = ticket ? ticket.price * form.tickets : 0;
      const id     = "BK-" + String(uid()).padStart(3, "0");
      setData(d => ({ ...d, bookings: [{ ...form, id, date: "Mar 2026", total }, ...d.bookings] }));
      addToast("Booking created.");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Create Booking</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg">
                <label className="fl">User</label>
                <select className="fs" onChange={e => form.user = e.target.value}>
                  <option value="">Select user</option>
                  {data.users.filter(u => u.role !== "ADMIN").map(u => <option key={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Event</label>
                <select className="fs" onChange={e => form.event = e.target.value}>
                  <option value="">Select event</option>
                  {data.events.filter(e => e.status === "published").map(e => <option key={e.id}>{e.title}</option>)}
                </select>
              </div>
              <div className="fg"><label className="fl">Tickets</label><input className="fi" type="number" min="1" max="10" defaultValue={1} onChange={e => form.tickets = Number(e.target.value)} /></div>
              <div className="fg">
                <label className="fl">Payment</label>
                <select className="fs" onChange={e => form.payment = e.target.value}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Create Booking</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Booking Service" title="Bookings" sub="Manage all event reservations and their statuses."
        action={<button className="btn btn-primary" onClick={openForm}>{Icons.plus} New Booking</button>}
      />

      <div className="stats-row">
        {[
          ["✅", "Confirmed",       data.bookings.filter(b => b.status === "confirmed").length],
          ["⏳", "Pending",         data.bookings.filter(b => b.status === "pending").length],
          ["❌", "Cancelled",       data.bookings.filter(b => b.status === "cancelled").length],
          ["💰", "Total Revenue",   "Rs " + data.bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total, 0).toLocaleString()],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val" style={{ fontSize: lbl === "Total Revenue" ? "1.1rem" : "1.7rem" }}>{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Bookings ({bookings.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "confirmed", "pending", "cancelled"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead><tr><th>Booking ID</th><th>User</th><th>Event</th><th>Date</th><th>Tickets</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".8rem" }}>{b.id}</td>
                  <td style={{ fontWeight: 500 }}>{b.user}</td>
                  <td style={{ color: "var(--tx2)", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.event}</td>
                  <td style={{ color: "var(--tx2)" }}>{b.date}</td>
                  <td style={{ textAlign: "center" }}>{b.tickets}</td>
                  <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {b.total.toLocaleString()}</td>
                  <td><span className={`badge ${statusBadge(b.payment)}`}>{b.payment}</span></td>
                  <td><span className={`badge ${statusBadge(b.status)}`}>{b.status}</span></td>
                  <td>
                    <div className="action-btns">
                      {b.status === "pending" && (
                        <button className="btn btn-sm" style={{ background: "var(--tg)", color: "var(--teal)", border: "1px solid rgba(38,201,154,.3)", padding: "4px 9px", fontSize: ".7rem" }}
                          onClick={() => updateStatus(b.id, "confirmed")}>Confirm</button>
                      )}
                      {b.status !== "cancelled" && (
                        <button className="btn-icon del" onClick={() => deleteBooking(b.id)}>{Icons.trash}</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && <div className="empty-state"><div className="empty-ico">🎟️</div><div className="empty-title">No bookings found</div></div>}
        </div>
      </div>
    </>
  );
}

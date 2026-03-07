import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge, Stars } from "../../utils/helpers";
import Icons from "../../utils/icons";import * as notifService from "../../services/notificationService";
/* ── MY BOOKINGS ─────────────────────────────────────────── */
export function MyBookingsPage({ data, setData, addToast, openModal, closeModal, authUser }) {
  const MY = authUser.name;
  const [filter, setFilter] = useState("All");
  const myBookings = data.bookings.filter(b => b.user === MY);
  const shown = myBookings.filter(b => filter === "All" || b.status === filter);

  const cancel = (id) => openModal({
    content: (
      <ConfirmDialog title="Cancel Booking" body="Are you sure? A refund will be processed if payment was made." icon="🎟️"
        onConfirm={() => {
          setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, status: "cancelled", payment: "refunded" } : b) }));
          addToast("Booking cancelled. Refund initiated.", "info");
          closeModal();
        }}
        onCancel={closeModal}
      />
    ),
  });

  const confirmed = myBookings.filter(b => b.status === "confirmed").length;
  const spent     = myBookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total, 0);

  return (
    <>
      <SvcHeader eyebrow="My Account" title="My Bookings" sub="Track all your event reservations in one place." />

      <div className="stats-row">
        {[
          ["🎟️", "Total Booked", myBookings.length],
          ["✅", "Confirmed",    confirmed],
          ["⏳", "Pending",      myBookings.filter(b => b.status === "pending").length],
          ["💰", "Total Spent",  "Rs " + spent.toLocaleString()],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val" style={{ fontSize: lbl === "Total Spent" ? "1.1rem" : "1.7rem" }}>{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">Booking History ({shown.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "confirmed", "pending", "cancelled"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </span>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <div className="empty-state"><div className="empty-ico">🎟️</div><div className="empty-title">No bookings yet</div><div className="empty-sub">Browse events and make your first booking!</div></div>
        ) : (
          <div className="tbl-scroll">
            <table className="tbl">
              <thead><tr><th>Booking ID</th><th>Event</th><th>Date</th><th>Tickets</th><th>Total</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {shown.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".78rem" }}>{b.id}</td>
                    <td style={{ fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.event}</td>
                    <td style={{ color: "var(--tx2)" }}>{b.date}</td>
                    <td style={{ textAlign: "center" }}>{b.tickets}</td>
                    <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {b.total.toLocaleString()}</td>
                    <td><span className={`badge ${statusBadge(b.payment)}`}>{b.payment}</span></td>
                    <td><span className={`badge ${statusBadge(b.status)}`}>{b.status}</span></td>
                    <td>
                      {b.status === "pending" && <button className="btn btn-danger btn-sm" onClick={() => cancel(b.id)}>Cancel</button>}
                      {b.status === "confirmed" && <button className="btn btn-ghost btn-sm" onClick={() => addToast("Ticket download coming soon 📥", "info")}>🎟️ Ticket</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ── MY PAYMENTS ─────────────────────────────────────────── */
export function MyPaymentsPage({ data, authUser, addToast }) {
  const MY = authUser.name;
  const myPayments = data.payments.filter(p => p.user === MY);
  const total = myPayments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <SvcHeader eyebrow="My Account" title="My Payments" sub="View your complete payment history and receipts." />

      <div className="stats-row">
        {[
          ["💳", "Total Payments", myPayments.length],
          ["✅", "Completed",      myPayments.filter(p => p.status === "completed").length],
          ["↩️", "Refunded",       myPayments.filter(p => p.status === "refunded").length],
          ["💰", "Total Spent",    "Rs " + total.toLocaleString()],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val" style={{ fontSize: lbl === "Total Spent" ? "1.1rem" : "1.7rem" }}>{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><span className="card-head-title">Payment History</span></div>
        {myPayments.length === 0 ? (
          <div className="empty-state"><div className="empty-ico">💳</div><div className="empty-title">No payments yet</div></div>
        ) : (
          <div className="tbl-scroll">
            <table className="tbl">
              <thead><tr><th>Payment ID</th><th>Booking</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Receipt</th></tr></thead>
              <tbody>
                {myPayments.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".78rem" }}>{p.id}</td>
                    <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".78rem" }}>{p.booking}</td>
                    <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {p.amount.toLocaleString()}</td>
                    <td><span className="badge b-blue">{p.method}</span></td>
                    <td style={{ color: "var(--tx2)" }}>{p.date}</td>
                    <td><span className={`badge ${statusBadge(p.status)}`}>{p.status}</span></td>
                    <td><button className="btn-icon view" onClick={() => addToast("Receipt download ready 📄", "info")}>{Icons.download}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ── MY FEEDBACK ─────────────────────────────────────────── */
export function MyFeedbackPage({ data, setData, addToast, openModal, closeModal, authUser }) {
  const MY = authUser.name;
  const myFeedback  = data.feedback.filter(f => f.user === MY);
  const myBookings  = data.bookings.filter(b => b.user === MY && b.status === "confirmed");
  const avg         = myFeedback.length
    ? (myFeedback.reduce((s, f) => s + f.rating, 0) / myFeedback.length).toFixed(1)
    : "—";

  const openForm = () => {
    let form = { user: MY, event: "", rating: 5, comment: "", status: "pending", date: "Mar 2026" };
    let localRating = 5;

    const save = () => {
      if (!form.event || !form.comment) { addToast("Event and comment required.", "error"); return; }
      setData(d => ({ ...d, feedback: [...d.feedback, { ...form, id: Date.now(), rating: localRating }] }));
      addToast("Review submitted! Thank you 🙏");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head"><span className="modal-title">Write a Review</span><button className="modal-close" onClick={closeModal}>{Icons.close}</button></div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg full">
                <label className="fl">Event You Attended</label>
                <select className="fs" onChange={e => form.event = e.target.value}>
                  <option value="">Select an event</option>
                  {myBookings.map(b => <option key={b.id}>{b.event}</option>)}
                </select>
              </div>
              <div className="fg full">
                <label className="fl">Your Rating</label>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }} id="star-row">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ fontSize: "1.8rem", cursor: "pointer", opacity: s <= localRating ? 1 : 0.25, transition: "transform .12s" }}
                      onClick={() => {
                        localRating = s; form.rating = s;
                        document.querySelectorAll("#star-row span").forEach((el, i) => { el.style.opacity = i < s ? "1" : "0.25"; });
                      }}>⭐</span>
                  ))}
                </div>
              </div>
              <div className="fg full">
                <label className="fl">Your Review</label>
                <textarea className="fta" style={{ minHeight: 110 }} onChange={e => form.comment = e.target.value} placeholder="Share your experience — what did you love? What could be better?" />
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Submit Review</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="My Account" title="My Reviews" sub="Share your experiences and help others discover great events."
        action={myBookings.length > 0 && <button className="btn btn-primary" onClick={openForm}>{Icons.plus} Write Review</button>}
      />

      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {[
          ["⭐", "Reviews Written", myFeedback.length],
          ["📊", "Avg Rating",      avg],
          ["✅", "Published",       myFeedback.filter(f => f.status === "published").length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      {myFeedback.length === 0 ? (
        <div className="empty-state" style={{ background: "var(--surf)", border: "1px solid var(--b1)", borderRadius: 14, padding: "3rem" }}>
          <div className="empty-ico">💬</div>
          <div className="empty-title">No reviews yet</div>
          <div className="empty-sub">Attend an event and share your experience!</div>
          {myBookings.length > 0 && <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={openForm}>Write Your First Review</button>}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {myFeedback.map(f => (
            <div key={f.id} className="card" style={{ padding: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: ".6rem" }}>
                <div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "1rem" }}>{f.event}</div>
                  <div style={{ fontSize: ".74rem", color: "var(--tx2)", marginTop: 2 }}>{f.date}</div>
                </div>
                <span className={`badge ${statusBadge(f.status)}`}>{f.status}</span>
              </div>
              <Stars n={f.rating} />
              <div style={{ fontSize: ".875rem", color: "var(--tx2)", marginTop: ".6rem", lineHeight: 1.6 }}>{f.comment}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ── MY NOTIFICATIONS ────────────────────────────────────── */
export function MyNotificationsPage({ data, setData, authUser, addToast }) {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const notifs = (data?.notifications || []).filter(n =>
    (filter === "All" || (filter === "Unread" && !n.read) || (filter === "Read" && n.read)) &&
    (n?.message || "").toLowerCase().includes("")
  );

  const markAsRead = async (id) => {
    try {
      setLoading(true);
      await notifService.markAsRead(id);
      setData(d => ({ ...d, notifications: d.notifications.map(x => x.id === id ? { ...x, read: true } : x) }));
    } catch (error) {
      addToast("Failed to mark as read", "error");
      console.error("Error marking notification as read:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SvcHeader
        eyebrow="My Account" title="Notifications" sub="Stay up to date with your bookings, events and offers."
        action={(data?.notifications || []).some(n => !n.read) && (
          <button className="btn btn-ghost" onClick={() => setData(d => ({ ...d, notifications: d.notifications.map(n => ({ ...n, read: true })) }))}>
            Mark All Read
          </button>
        )}
      />

      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {[
          ["🔔", "Total",  (data?.notifications || []).length],
          ["🔴", "Unread", (data?.notifications || []).filter(n => !n.read).length],
          ["✅", "Read",   (data?.notifications || []).filter(n => n.read).length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Notifications</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "Unread", "Read"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</span>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="empty-state"><div className="empty-lbl">Loading…</div></div>
        ) : notifs.length === 0 ? (
          <div className="empty-state"><div className="empty-ico">🔔</div><div className="empty-title">No notifications</div></div>
        ) : (
          <div style={{ padding: "6px" }}>
            {notifs.map(n => (
              <div key={n.id}
                className={`np-item${n.read ? "" : " unread"}`}
                style={{ marginBottom: 2, borderRadius: 10 }}
                onClick={() => markAsRead(n.id)}>
                <div className="np-ico">🔔</div>
                <div className="np-info">
                  <div className="np-name">Notification</div>
                  <div className="np-body">{n.message || ""}</div>
                  <div className="np-time">{!n.read && <span className="unread-pip" />}{n.createdAt ? new Date(n.createdAt).toLocaleString() : "Just now"}</div>
                </div>
                <button className="btn-icon del"
                  onClick={e => { e.stopPropagation(); setData(d => ({ ...d, notifications: d.notifications.filter(x => x.id !== n.id) })); }}>
                  {Icons.trash}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ── MY PROFILE ──────────────────────────────────────────── */
export function MyProfilePage({ data, setData, addToast, authUser }) {
  const me = data.users.find(u => u.name === authUser.name) || {
    name: authUser.name, email: "customer@demo.com", phone: "+94 77 123 4567", joined: "Jan 2026", avatar: "#26c99a",
  };
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: me.name, email: me.email, phone: me.phone || "" });

  const myBookings = data.bookings.filter(b => b.user === authUser.name);
  const myPayments = data.payments.filter(p => p.user === authUser.name);
  const myFeedback = data.feedback.filter(f => f.user === authUser.name);
  const totalSpent = myPayments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);

  const save = () => {
    setData(d => ({ ...d, users: d.users.map(u => u.name === authUser.name ? { ...u, ...form } : u) }));
    addToast("Profile updated successfully.");
    setEditing(false);
  };

  return (
    <>
      <SvcHeader eyebrow="My Account" title="My Profile" sub="Manage your personal information and preferences." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.2rem", alignItems: "start" }}>
        {/* Avatar card */}
        <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: me.avatar || "#9b6ef5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 700, color: "#000", margin: "0 auto 1rem", boxShadow: `0 0 24px ${me.avatar}66` }}>
            {me.name.charAt(0)}
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: 4 }}>{me.name}</div>
          <span className="badge b-green" style={{ marginBottom: ".8rem", display: "inline-flex" }}>CUSTOMER</span>
          <div style={{ fontSize: ".78rem", color: "var(--tx2)", lineHeight: 2, borderTop: "1px solid var(--b1)", paddingTop: ".8rem", marginTop: ".4rem" }}>
            <div>📧 {me.email}</div>
            <div>📱 {me.phone}</div>
            <div>📅 Joined {me.joined}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {/* Mini stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[
              ["🎟️", "Bookings",  myBookings.length],
              ["✅", "Confirmed", myBookings.filter(b => b.status === "confirmed").length],
              ["💬", "Reviews",   myFeedback.length],
              ["💰", "Spent",     "Rs " + totalSpent.toLocaleString()],
            ].map(([ico, lbl, val]) => (
              <div key={lbl} className="stat-tile" style={{ padding: "1rem" }}>
                <div className="st-icon" style={{ fontSize: "1.1rem" }}>{ico}</div>
                <div className="st-val" style={{ fontSize: lbl === "Spent" ? "1rem" : "1.5rem" }}>{val}</div>
                <div className="st-lbl">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Edit form */}
          <div className="card">
            <div className="card-head">
              <span className="card-head-title">Personal Information</span>
              {!editing
                ? <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>{Icons.edit} Edit</button>
                : <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={save}>Save Changes</button>
                  </div>
              }
            </div>
            <div style={{ padding: "1.2rem" }}>
              <div className="form-grid">
                {[
                  ["Full Name",     "name",  "text"],
                  ["Email Address", "email", "email"],
                  ["Phone Number",  "phone", "text"],
                ].map(([lbl, key, type]) => (
                  <div key={key} className="fg">
                    <label className="fl">{lbl}</label>
                    {editing
                      ? <input className="fi" type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                      : <div style={{ fontSize: ".875rem", padding: "9px 0", color: "var(--tx)" }}>{me[key] || "—"}</div>
                    }
                  </div>
                ))}
                <div className="fg">
                  <label className="fl">Member Since</label>
                  <div style={{ fontSize: ".875rem", padding: "9px 0", color: "var(--tx2)" }}>{me.joined}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card">
            <div className="card-head"><span className="card-head-title">Security</span></div>
            <div style={{ padding: "1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: ".875rem" }}>Password</div>
                <div style={{ fontSize: ".78rem", color: "var(--tx2)", marginTop: 2 }}>Last changed 30 days ago</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => addToast("Password reset email sent 📧", "info")}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

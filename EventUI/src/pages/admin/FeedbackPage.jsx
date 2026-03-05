import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge, Stars } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function FeedbackPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const feedback = data.feedback.filter(f =>
    (filter === "All" || f.status === filter) &&
    (f.user.toLowerCase().includes(searchQ.toLowerCase()) ||
     f.event.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const updateStatus = (id, status) => {
    setData(d => ({ ...d, feedback: d.feedback.map(f => f.id === id ? { ...f, status } : f) }));
    addToast(`Feedback ${status}.`);
  };

  const deleteFeedback = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Feedback" body="This review will be permanently removed." icon="💬"
        onConfirm={() => { setData(d => ({ ...d, feedback: d.feedback.filter(f => f.id !== id) })); addToast("Feedback deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = () => {
    let form = { user: "", event: "", rating: 5, comment: "", status: "pending" };
    const save = () => {
      if (!form.user || !form.event || !form.comment) { addToast("All fields required.", "error"); return; }
      setData(d => ({ ...d, feedback: [...d.feedback, { ...form, id: uid(), date: "Mar 2026" }] }));
      addToast("Feedback added.");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Add Feedback</span>
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
                  {data.events.map(e => <option key={e.id}>{e.title}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Rating</label>
                <select className="fs" onChange={e => form.rating = Number(e.target.value)}>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" onChange={e => form.status = e.target.value}>
                  <option value="pending">Pending</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="fg full"><label className="fl">Comment</label><textarea className="fta" onChange={e => form.comment = e.target.value} placeholder="Share your experience…" /></div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Submit Feedback</button>
          </div>
        </>
      ),
    });
  };

  const avg = feedback.length
    ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
    : "—";

  return (
    <>
      <SvcHeader
        eyebrow="Feedback Service" title="Reviews & Ratings" sub="Moderate and manage attendee feedback."
        action={<button className="btn btn-primary" onClick={openForm}>{Icons.plus} Add Feedback</button>}
      />

      <div className="stats-row">
        {[
          ["💬", "Total",      data.feedback.length],
          ["⭐", "Avg Rating", avg],
          ["✅", "Published",  data.feedback.filter(f => f.status === "published").length],
          ["⏳", "Pending",    data.feedback.filter(f => f.status === "pending").length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Reviews ({feedback.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "published", "pending"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {feedback.map(f => (
          <div key={f.id} style={{ display: "flex", gap: 14, padding: "1rem 1.25rem", borderBottom: "1px solid var(--b1)" }}>
            <div className="av" style={{ background: "#9b6ef5", width: 34, height: 34, flexShrink: 0 }}>{f.user.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: ".875rem" }}>{f.user}</span>
                <span style={{ fontSize: ".75rem", color: "var(--tx2)" }}>on</span>
                <span style={{ fontSize: ".8rem", color: "var(--tx2)" }}>{f.event}</span>
                <span className={`badge ${statusBadge(f.status)}`}>{f.status}</span>
                <span style={{ marginLeft: "auto", fontSize: ".72rem", color: "var(--tx3)" }}>{f.date}</span>
              </div>
              <Stars n={f.rating} />
              <div style={{ fontSize: ".84rem", color: "var(--tx2)", marginTop: 5, lineHeight: 1.55 }}>{f.comment}</div>
            </div>
            <div className="action-btns" style={{ flexDirection: "column", gap: 4 }}>
              {f.status === "pending" && (
                <button className="btn btn-sm" style={{ background: "var(--tg)", color: "var(--teal)", border: "1px solid rgba(38,201,154,.3)", padding: "4px 9px", fontSize: ".7rem" }}
                  onClick={() => updateStatus(f.id, "published")}>Publish</button>
              )}
              <button className="btn-icon del" onClick={() => deleteFeedback(f.id)}>{Icons.trash}</button>
            </div>
          </div>
        ))}

        {feedback.length === 0 && <div className="empty-state"><div className="empty-ico">💬</div><div className="empty-title">No feedback found</div></div>}
      </div>
    </>
  );
}

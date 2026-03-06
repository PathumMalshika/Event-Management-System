import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function CheckInPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const checkins = data.checkins.filter(c =>
    (filter === "All" || c.status === filter) &&
    (c.user.toLowerCase().includes(searchQ.toLowerCase()) ||
     c.event.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const deleteCheckin = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Record" body="This attendance record will be permanently removed." icon="🗑️"
        onConfirm={() => { setData(d => ({ ...d, checkins: d.checkins.filter(c => c.id !== id) })); addToast("Record deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openCheckinForm = () => {
    let form = { user: "", event: "", method: "QR", status: "present" };
    const save = () => {
      if (!form.user || !form.event) { addToast("User and event required.", "error"); return; }
      const now = new Date();
      setData(d => ({ ...d, checkins: [...d.checkins, { ...form, id: uid(), checkinTime: now.toLocaleString() }] }));
      addToast("Check-in recorded! ✅");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Record Check-In</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="scan-area" onClick={() => addToast("QR scanner would activate here 📷", "info")}>
              <div className="scan-icon">{Icons.qr}</div>
              <div className="scan-text">Click to scan QR code</div>
              <div style={{ fontSize: ".75rem", color: "var(--tx3)", marginTop: 4 }}>or fill in manually below</div>
            </div>
            <div className="form-grid">
              <div className="fg">
                <label className="fl">Attendee</label>
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
              <div className="fg">
                <label className="fl">Method</label>
                <select className="fs" onChange={e => form.method = e.target.value}>
                  <option>QR</option><option>Manual</option><option>NFC</option>
                </select>
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" onChange={e => form.status = e.target.value}>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Record Check-In</button>
          </div>
        </>
      ),
    });
  };

  const byEvent = data.events
    .filter(e => e.status === "published")
    .map(e => ({
      title:   e.title,
      total:   e.sold,
      present: data.checkins.filter(c => c.event === e.title && c.status === "present").length,
    }))
    .filter(e => e.total > 0);

  return (
    <>
      <SvcHeader
        eyebrow="Check-In Service" title="Attendance" sub="Track and manage event attendance in real-time."
        action={<button className="btn btn-primary" onClick={openCheckinForm}>{Icons.plus} Check-In</button>}
      />

      <div className="stats-row">
        {[
          ["✅", "Present",   data.checkins.filter(c => c.status === "present").length],
          ["❌", "Absent",    data.checkins.filter(c => c.status === "absent").length],
          ["📱", "QR Scans",  data.checkins.filter(c => c.method === "QR").length],
          ["📊", "Avg Rate",  data.checkins.length ? Math.round(data.checkins.filter(c => c.status === "present").length / data.checkins.length * 100) + "%" : "—"],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.2rem" }}>
        <div className="card">
          <div className="card-head">
            <span className="card-head-title">Attendance Records ({checkins.length})</span>
            <div className="filter-bar" style={{ margin: 0 }}>
              {["All", "present", "absent"].map(f => (
                <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                  {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="tbl-scroll">
            <table className="tbl">
              <thead><tr><th>Attendee</th><th>Event</th><th>Check-In Time</th><th>Method</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {checkins.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500 }}>{c.user}</td>
                    <td style={{ color: "var(--tx2)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.event}</td>
                    <td style={{ color: "var(--tx2)", fontSize: ".78rem" }}>{c.checkinTime}</td>
                    <td><span className="badge b-blue">{c.method}</span></td>
                    <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon del" onClick={() => deleteCheckin(c.id)}>{Icons.trash}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {checkins.length === 0 && <div className="empty-state"><div className="empty-ico">📋</div><div className="empty-title">No records</div></div>}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><span className="card-head-title">Attendance by Event</span></div>
          <div style={{ padding: "1rem" }}>
            {byEvent.map(e => {
              const pct = e.total ? Math.round(e.present / e.total * 100) : 0;
              return (
                <div key={e.title} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", marginBottom: 4 }}>
                    <span style={{ color: "var(--tx)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{e.title}</span>
                    <span style={{ color: "var(--tx2)", flexShrink: 0 }}>{e.present}/{e.total} ({pct}%)</span>
                  </div>
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: `${pct}%`, background: pct > 70 ? "var(--teal)" : pct > 40 ? "var(--amber)" : "var(--rose)" }} />
                  </div>
                </div>
              );
            })}
            {byEvent.length === 0 && <div style={{ color: "var(--tx3)", fontSize: ".82rem", textAlign: "center", padding: "1rem" }}>No data available</div>}
          </div>
        </div>
      </div>
    </>
  );
}

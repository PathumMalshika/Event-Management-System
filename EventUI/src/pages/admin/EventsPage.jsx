import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function EventsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const events = data.events.filter(e =>
    (filter === "All" || e.status === filter) &&
    (e.title.toLowerCase().includes(searchQ.toLowerCase()) ||
     e.category.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const deleteEvent = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Event" body="This will remove the event and all its tickets and bookings." icon="🗑️"
        onConfirm={() => { setData(d => ({ ...d, events: d.events.filter(e => e.id !== id) })); addToast("Event deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = (ev = null) => {
    let form = ev
      ? { ...ev }
      : { title: "", category: "Music", venue: "", date: "", time: "", status: "draft", capacity: 100, organizer: "" };

    const save = () => {
      if (!form.title || !form.venue) { addToast("Title and venue required.", "error"); return; }
      if (ev) {
        setData(d => ({ ...d, events: d.events.map(e => e.id === ev.id ? { ...e, ...form } : e) }));
        addToast("Event updated.");
      } else {
        setData(d => ({ ...d, events: [...d.events, { ...form, id: uid(), sold: 0 }] }));
        addToast("Event created.");
      }
      closeModal();
    };

    openModal({
      lg: true,
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">{ev ? "Edit Event" : "Create Event"}</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg full"><label className="fl">Event Title</label><input className="fi" defaultValue={form.title} onChange={e => form.title = e.target.value} placeholder="e.g. Colombo Jazz Festival" /></div>
              <div className="fg">
                <label className="fl">Category</label>
                <select className="fs" defaultValue={form.category} onChange={e => form.category = e.target.value}>
                  {data.categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Venue</label>
                <select className="fs" defaultValue={form.venue} onChange={e => form.venue = e.target.value}>
                  <option value="">Select venue</option>
                  {data.venues.map(v => <option key={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="fg"><label className="fl">Date</label><input className="fi" type="date" defaultValue={form.date} onChange={e => form.date = e.target.value} /></div>
              <div className="fg"><label className="fl">Time</label><input className="fi" type="time" defaultValue={form.time} onChange={e => form.time = e.target.value} /></div>
              <div className="fg"><label className="fl">Capacity</label><input className="fi" type="number" defaultValue={form.capacity} onChange={e => form.capacity = Number(e.target.value)} /></div>
              <div className="fg"><label className="fl">Organizer</label><input className="fi" defaultValue={form.organizer} onChange={e => form.organizer = e.target.value} placeholder="Organizer name" /></div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" defaultValue={form.status} onChange={e => form.status = e.target.value}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{ev ? "Save Changes" : "Create Event"}</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Event Service" title="Events" sub="Create and manage all events on the platform."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Create Event</button>}
      />

      <div className="stats-row">
        {[
          ["✅", "Published", data.events.filter(e => e.status === "published").length],
          ["📝", "Draft",     data.events.filter(e => e.status === "draft").length],
          ["❌", "Cancelled", data.events.filter(e => e.status === "cancelled").length],
          ["🎟️", "Total Sold", data.events.reduce((s, e) => s + e.sold, 0)],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Events ({events.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "published", "draft", "cancelled"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead><tr><th>Event</th><th>Category</th><th>Date</th><th>Venue</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {events.map(e => {
                const pct = Math.round(e.sold / e.capacity * 100);
                return (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 500, maxWidth: 200 }}>{e.title}</td>
                    <td><span className="badge b-blue">{e.category}</span></td>
                    <td style={{ color: "var(--tx2)", whiteSpace: "nowrap" }}>{e.date}</td>
                    <td style={{ color: "var(--tx2)", fontSize: ".78rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.venue}</td>
                    <td>
                      <div style={{ minWidth: 80 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".7rem", color: "var(--tx2)", marginBottom: 3 }}>
                          <span>{e.sold}/{e.capacity}</span><span>{pct}%</span>
                        </div>
                        <div className="prog-bar">
                          <div className="prog-fill" style={{ width: `${pct}%`, background: pct > 80 ? "var(--rose)" : pct > 60 ? "var(--amber)" : "var(--teal)" }} />
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${statusBadge(e.status)}`}>{e.status}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon edit" onClick={() => openForm(e)}>{Icons.edit}</button>
                        <button className="btn-icon del"  onClick={() => deleteEvent(e.id)}>{Icons.trash}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {events.length === 0 && <div className="empty-state"><div className="empty-ico">🎪</div><div className="empty-title">No events found</div></div>}
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { SvcHeader } from "../../components/common/SvcHeader";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function NotificationsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const notifs = data.notifications.filter(n =>
    (filter === "All" || (filter === "Unread" && !n.read) || (filter === "Read" && n.read)) &&
    n.title.toLowerCase().includes(searchQ.toLowerCase())
  );

  const deleteNotif = (id) => {
    setData(d => ({ ...d, notifications: d.notifications.filter(n => n.id !== id) }));
    addToast("Notification deleted.", "info");
  };

  const openForm = () => {
    let form = { title: "", body: "", type: "system", icon: "📢", iconBg: "rgba(91,142,245,.15)", iconColor: "#5b8ef5", read: false };
    const save = () => {
      if (!form.title || !form.body) { addToast("Title and message required.", "error"); return; }
      setData(d => ({ ...d, notifications: [{ ...form, id: uid(), time: "Just now" }, ...d.notifications] }));
      addToast("Notification created.");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Create Notification</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg full"><label className="fl">Title</label><input className="fi" onChange={e => form.title = e.target.value} placeholder="Notification title" /></div>
              <div className="fg full"><label className="fl">Message</label><textarea className="fta" onChange={e => form.body = e.target.value} placeholder="Notification body message…" /></div>
              <div className="fg">
                <label className="fl">Type</label>
                <select className="fs" onChange={e => form.type = e.target.value}>
                  {["system", "booking", "reminder", "promo", "payment", "feedback"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="fg"><label className="fl">Icon</label><input className="fi" defaultValue={form.icon} onChange={e => form.icon = e.target.value} placeholder="📢" /></div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Send Notification</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Notification Service" title="Notifications" sub="Manage and send platform notifications."
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => setData(d => ({ ...d, notifications: d.notifications.map(n => ({ ...n, read: true })) }))}>
              Mark All Read
            </button>
            <button className="btn btn-primary" onClick={openForm}>{Icons.plus} Create</button>
          </div>
        }
      />

      <div className="stats-row">
        {[
          ["🔔", "Total",  data.notifications.length],
          ["🔴", "Unread", data.notifications.filter(n => !n.read).length],
          ["✅", "Read",   data.notifications.filter(n => n.read).length],
          ["📢", "Types",  new Set(data.notifications.map(n => n.type)).size],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">All Notifications ({notifs.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "Unread", "Read"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: "6px" }}>
          {notifs.length === 0
            ? <div className="empty-state"><div className="empty-ico">🔔</div><div className="empty-title">No notifications</div></div>
            : notifs.map(n => (
              <div
                key={n.id}
                className={`np-item${n.read ? "" : " unread"}`}
                style={{ marginBottom: 2 }}
                onClick={() => setData(d => ({ ...d, notifications: d.notifications.map(x => x.id === n.id ? { ...x, read: true } : x) }))}
              >
                <div className="np-ico" style={{ background: n.iconBg }}>{n.icon}</div>
                <div className="np-info">
                  <div className="np-name">{n.title}</div>
                  <div className="np-body">{n.body}</div>
                  <div className="np-time" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {!n.read && <span className="unread-pip" />}
                    <span>{n.time}</span>
                    <span className="badge b-gray" style={{ fontSize: ".6rem" }}>{n.type}</span>
                  </div>
                </div>
                <button className="btn-icon del" onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}>{Icons.trash}</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

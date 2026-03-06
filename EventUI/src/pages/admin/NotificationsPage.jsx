import { useState, useEffect } from "react";
import { SvcHeader } from "../../components/common/SvcHeader";
import Icons from "../../utils/icons";
import * as notifService from "../../services/notificationService";

export default function NotificationsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notifService.getNotifications();
      setData(d => ({ ...d, notifications: response.data }));
    } catch (error) {
      addToast("Failed to load notifications", "error");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const notifs = (data?.notifications || []).filter(n =>
    (filter === "All" || (filter === "Unread" && !n.read) || (filter === "Read" && n.read)) &&
    (n?.message || "").toLowerCase().includes(searchQ.toLowerCase())
  );

  const deleteNotif = async (id) => {
    try {
      await notifService.deleteNotification(id);
      setData(d => ({ ...d, notifications: d.notifications.filter(n => n.id !== id) }));
      addToast("Notification deleted.", "info");
    } catch (error) {
      addToast("Failed to delete notification", "error");
      console.error("Error deleting notification:", error);
    }
  };

  const markAsReadHandler = async (id) => {
    try {
      await notifService.markAsRead(id);
      setData(d => ({ ...d, notifications: d.notifications.map(x => x.id === id ? { ...x, read: true } : x) }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const openForm = () => {
    let form = { message: "", userId: 1 };
    const save = async () => {
      if (!form.message) { addToast("Message required.", "error"); return; }
      try {
        const response = await notifService.createNotification(form);
        setData(d => ({ ...d, notifications: [response.data, ...d.notifications] }));
        addToast("Notification created.");
        closeModal();
      } catch (error) {
        addToast("Failed to create notification", "error");
        console.error("Error creating notification:", error);
      }
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
              <div className="fg full"><label className="fl">User ID</label><input className="fi" type="number" defaultValue="1" onChange={e => form.userId = parseInt(e.target.value)} placeholder="Recipient user ID" /></div>
              <div className="fg full"><label className="fl">Message</label><textarea className="fta" onChange={e => form.message = e.target.value} placeholder="Notification message…" /></div>
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
          ["🔔", "Total",  (data?.notifications || []).length],
          ["🔴", "Unread", (data?.notifications || []).filter(n => !n.read).length],
          ["✅", "Read",   (data?.notifications || []).filter(n => n.read).length],
          ["📢", "Users",  new Set((data?.notifications || []).map(n => n.userId)).size],
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
          {loading
            ? <div className="empty-state"><div className="empty-lbl">Loading notifications…</div></div>
            : notifs.length === 0
            ? <div className="empty-state"><div className="empty-ico">🔔</div><div className="empty-title">No notifications</div></div>
            : notifs.map(n => (
              <div
                key={n.id}
                className={`np-item${n.read ? "" : " unread"}`}
                style={{ marginBottom: 2 }}
                onClick={() => markAsReadHandler(n.id)}
              >
                <div className="np-ico">🔔</div>
                <div className="np-info">
                  <div className="np-name">User {n.userId}</div>
                  <div className="np-body">{n.message}</div>
                  <div className="np-time" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {!n.read && <span className="unread-pip" />}
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
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

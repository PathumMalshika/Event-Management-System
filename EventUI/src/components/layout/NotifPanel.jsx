import Icons from "../../utils/icons";

export default function NotifPanel({ open, onClose, notifications, setData, addToast, notifTab, setNT }) {
  const markAllRead = () =>
    setData(d => ({ ...d, notifications: d.notifications.map(n => ({ ...n, read: true })) }));

  const markOneRead = (id) =>
    setData(d => ({ ...d, notifications: d.notifications.map(n => n.id === id ? { ...n, read: true } : n) }));

  const deleteOne = (id) =>
    setData(d => ({ ...d, notifications: d.notifications.filter(n => n.id !== id) }));

  const unread = notifications.filter(n => !n.read).length;
  const visible = notifTab === "all" ? notifications : notifications.filter(n => !n.read);

  return (
    <div className={`notif-panel${open ? " open" : ""}`}>
      <div className="np-head">
        <span className="np-title">Notifications</span>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {unread > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={markAllRead} style={{ fontSize:".7rem", padding:"4px 9px" }}>
              Mark all read
            </button>
          )}
          <button className="btn-icon" onClick={onClose}>{Icons.close}</button>
        </div>
      </div>

      <div className="np-tabs">
        {[["all","All"],["unread","Unread"]].map(([k,l]) => (
          <div key={k} className={`np-tab${notifTab === k ? " active" : ""}`} onClick={() => setNT(k)}>{l}</div>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="np-empty">
          <div className="np-empty-ico">🔔</div>
          <div className="np-empty-txt">No notifications</div>
        </div>
      ) : (
        <div className="np-list">
          {visible.map(n => (
            <div
              key={n.id}
              className={`np-item${n.read ? "" : " unread"}`}
              onClick={() => markOneRead(n.id)}
            >
              <div className="np-ico" style={{ background: n.iconBg }}>{n.icon}</div>
              <div className="np-info">
                <div className="np-name">{n.title}</div>
                <div className="np-body">{n.body}</div>
                <div className="np-time">
                  {!n.read && <span className="unread-pip" />}
                  {n.time}
                </div>
              </div>
              <button
                className="btn-icon del"
                style={{ width:24, height:24 }}
                onClick={e => { e.stopPropagation(); deleteOne(n.id); }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="np-foot">
        <button
          className="btn btn-ghost btn-sm"
          style={{ flex:1, justifyContent:"center" }}
          onClick={() => { setData(d => ({ ...d, notifications: [] })); addToast("Notifications cleared"); }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

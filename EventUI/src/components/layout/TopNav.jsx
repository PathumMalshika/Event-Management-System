import Icons from "../../utils/icons";

export default function TopNav({ authUser, isAdmin, unread, notifOpen, setNO, sidebarCollapsed, searchQ, setSearchQ, onLogout }) {
  return (
    <nav className="topnav">
      <div className="nav-brand">
        <div className="brand-gem">✦</div>
        {!sidebarCollapsed && <span className="brand-name">Event<b>Master</b></span>}
      </div>

      <div className="nav-search">
        <span style={{ color: "var(--tx3)", fontSize: ".85rem" }}>🔍</span>
        <input
          placeholder="Search anything…"
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
        />
      </div>

      <div className="nav-right-cluster">
        <div
          className={`icon-circle${notifOpen ? " active" : ""}`}
          onClick={() => setNO(o => !o)}
          title="Notifications"
        >
          {Icons.bell}
          {unread > 0 && <div className="badge-dot">{unread > 9 ? "9+" : unread}</div>}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:7, background:"var(--surf)", border:"1px solid var(--b2)", borderRadius:100, padding:"3px 12px 3px 3px" }}>
          <div className="nav-avatar" title={authUser.name}>{authUser.name.charAt(0)}</div>
          <span style={{ fontSize:".78rem", fontWeight:500, maxWidth:110, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{authUser.name}</span>
          <span className={`badge ${isAdmin ? "b-violet" : "b-green"}`} style={{ fontSize:".58rem" }}>{authUser.role}</span>
        </div>

        <button className="btn btn-ghost btn-sm" onClick={onLogout} style={{ gap: 4 }}>
          {Icons.logout} Logout
        </button>
      </div>
    </nav>
  );
}

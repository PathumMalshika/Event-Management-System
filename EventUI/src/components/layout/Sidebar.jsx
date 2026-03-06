import Icons from "../../utils/icons";

export default function Sidebar({ navItems, page, setPage, collapsed, setCollapsed, onLogout }) {
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sb-top">
        {!collapsed && (
          <span style={{ fontSize:".72rem", color:"var(--tx3)", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase" }}>
            Navigation
          </span>
        )}
        <button className="sb-toggle" onClick={() => setCollapsed(c => !c)} title="Toggle sidebar">
          {Icons.menu}
        </button>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"0 6px 8px" }}>
        {navItems.map(item => (
          <div
            key={item.key}
            className={`sb-item${page === item.key ? " active" : ""}`}
            onClick={() => setPage(item.key)}
            title={collapsed ? item.label : ""}
          >
            <span className="sb-icon">{item.icon}</span>
            <span className="sb-text">{item.label}</span>
            {item.badge > 0 && <span className="sb-pip" />}
          </div>
        ))}
      </div>

      <div className="sb-divider" />
      <div style={{ padding:"8px 6px 12px" }}>
        <div className="sb-item" onClick={onLogout}>
          <span className="sb-icon">🚪</span>
          <span className="sb-text">Sign Out</span>
        </div>
      </div>
    </aside>
  );
}

import { SvcHeader } from "../../components/common/SvcHeader";

export default function DashboardPage({ data }) {
  const totalRevenue = data.payments
    .filter(p => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0);

  const stats = [
    { icon: "👥", val: data.users.length,       lbl: "Total Users",    delta: "+4 this week",      up: true  },
    { icon: "🎪", val: data.events.length,       lbl: "Active Events",  delta: "+2 this month",     up: true  },
    { icon: "🎟️", val: data.bookings.length,     lbl: "Total Bookings", delta: "+12 this week",     up: true  },
    { icon: "💰", val: `Rs ${(totalRevenue / 1000).toFixed(0)}K`, lbl: "Revenue (MTD)", delta: "-3% vs last month", up: false },
  ];

  const catData = data.categories.map(c => ({
    name: c.name,
    pct: Math.round(Math.random() * 60 + 20),
    color: c.color,
  }));

  return (
    <>
      <SvcHeader eyebrow="Overview" title="Dashboard" sub="Real-time summary of your event management platform." />

      <div className="stats-row">
        {stats.map(s => (
          <div key={s.lbl} className="stat-tile">
            <div className="st-icon">{s.icon}</div>
            <div className="st-val">{s.val}</div>
            <div className="st-lbl">{s.lbl}</div>
            <div className={`st-delta ${s.up ? "delta-up" : "delta-dn"}`}>
              {s.up ? "↑" : "↓"} {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        {/* Category bar chart */}
        <div className="card">
          <div className="card-head">
            <span className="card-head-title">Bookings by Category</span>
            <span style={{ fontSize: ".72rem", color: "var(--tx3)" }}>This month</span>
          </div>
          <div style={{ padding: "1.2rem" }}>
            {catData.map(c => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: ".78rem", width: 70, color: "var(--tx2)", flexShrink: 0 }}>{c.name}</span>
                <div className="prog-bar" style={{ flex: 1 }}>
                  <div className="prog-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
                <span style={{ fontSize: ".74rem", color: "var(--tx2)", width: 32, textAlign: "right" }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card">
          <div className="card-head">
            <span className="card-head-title">Recent Activity</span>
            <span style={{ fontSize: ".65rem", color: "var(--teal)" }}>● LIVE</span>
          </div>
          <div style={{ padding: ".8rem" }}>
            {[
              { name: "Saman booked Jazz Festival",  time: "2 min ago",  color: "#26c99a", amt: "Rs 5,000" },
              { name: "New user: Asha Mendis",        time: "8 min ago",  color: "#9b6ef5", amt: "—" },
              { name: "Payment PAY-002 completed",    time: "15 min ago", color: "#5b8ef5", amt: "Rs 5,000" },
              { name: "Feedback on Dance Gala (5★)",  time: "1 hr ago",   color: "#e8a230", amt: "—" },
              { name: "Roshan cancelled BK-005",      time: "2 hrs ago",  color: "#f0556a", amt: "-Rs 7,500" },
            ].map(a => (
              <div key={a.name} className="activity-item">
                <div className="act-dot" style={{ background: a.color }} />
                <div className="act-info">
                  <div className="act-name">{a.name}</div>
                  <div className="act-time">{a.time}</div>
                </div>
                <div className="act-amount" style={{ color: a.amt.startsWith("-") ? "var(--rose)" : "var(--amber)" }}>
                  {a.amt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom summary panels */}
      <div style={{ marginTop: "1.2rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }}>
        {[
          {
            title: "Upcoming Events",
            items: data.events.filter(e => e.status === "published").slice(0, 3).map(e => ({ label: e.title, sub: e.date, color: "#26c99a" })),
          },
          {
            title: "Pending Bookings",
            items: data.bookings.filter(b => b.status === "pending").map(b => ({ label: `${b.id} · ${b.user}`, sub: b.event, color: "#e8a230" })),
          },
          {
            title: "Pending Feedback",
            items: data.feedback.filter(f => f.status === "pending").map(f => ({ label: f.user, sub: f.event, color: "#9b6ef5" })),
          },
        ].map(panel => (
          <div key={panel.title} className="card">
            <div className="card-head"><span className="card-head-title">{panel.title}</span></div>
            <div style={{ padding: ".6rem .8rem" }}>
              {panel.items.length === 0
                ? <div style={{ padding: "1rem", textAlign: "center", fontSize: ".8rem", color: "var(--tx3)" }}>None pending</div>
                : panel.items.map((item, i) => (
                  <div key={i} className="activity-item">
                    <div className="act-dot" style={{ background: item.color }} />
                    <div className="act-info">
                      <div className="act-name" style={{ fontSize: ".8rem" }}>{item.label}</div>
                      <div className="act-time">{item.sub}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

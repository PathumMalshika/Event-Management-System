import { useState } from "react";
import Icons from "../../utils/icons";

const CAT_COLORS = { Music: "#26c99a", Tech: "#5b8ef5", Food: "#e8a230", Culture: "#e85f9f", Sports: "#f0556a", Art: "#9b6ef5" };

export default function BrowseEventsPage({ data, addToast, openModal, closeModal }) {
  const [filter, setFilter] = useState("All");
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const events = data.events.filter(e =>
    e.status === "published" &&
    (filter === "All" || e.category === filter)
  );

  const openBook = (ev) => {
    let qty = 1;
    const eventTickets = data.tickets.filter(t => t.event === ev.title && t.status === "active");
    const price = eventTickets[0]?.price ?? 2500;

    openModal({
      lg: true,
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Book Tickets</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            {/* Event summary */}
            <div style={{ background: "var(--bg3)", borderRadius: 12, padding: "1.2rem", marginBottom: "1.2rem", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(232,162,48,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>🎪</div>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{ev.title}</div>
                <div style={{ fontSize: ".78rem", color: "var(--tx2)", lineHeight: 1.7 }}>
                  📅 {ev.date} · {ev.time}<br />📍 {ev.venue}
                </div>
              </div>
            </div>

            {eventTickets.length > 0 ? (
              <>
                {/* Ticket type cards */}
                <div style={{ display: "flex", gap: 10, marginBottom: "1rem" }}>
                  {eventTickets.map(t => (
                    <div key={t.id} style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--b2)", borderRadius: 10, padding: "10px 12px" }}>
                      <div style={{ fontWeight: 700, fontSize: ".85rem" }}>{t.type}</div>
                      <div style={{ color: "var(--amber)", fontWeight: 700, fontSize: "1rem", marginTop: 2 }}>Rs {t.price.toLocaleString()}</div>
                      <div style={{ fontSize: ".7rem", color: "var(--tx3)", marginTop: 2 }}>{t.qty - t.sold} left</div>
                    </div>
                  ))}
                </div>

                {/* Selectors */}
                <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="fg">
                    <label className="fl">Ticket Type</label>
                    <select className="fs">
                      {eventTickets.map(t => <option key={t.id}>{t.type} — Rs {t.price.toLocaleString()}</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label className="fl">Quantity</label>
                    <select className="fs" onChange={e => qty = Number(e.target.value)}>
                      {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Price breakdown */}
                <div style={{ background: "rgba(232,162,48,.06)", border: "1px solid rgba(232,162,48,.2)", borderRadius: 10, padding: "1rem", marginTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".84rem", marginBottom: 6 }}>
                    <span style={{ color: "var(--tx2)" }}>Price per ticket</span><span>Rs {price.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".84rem", marginBottom: 6 }}>
                    <span style={{ color: "var(--tx2)" }}>Quantity</span><span>{qty}</span>
                  </div>
                  <div style={{ height: 1, background: "var(--b1)", margin: "8px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span>Total</span>
                    <span style={{ color: "var(--amber)" }}>Rs {(price * qty).toLocaleString()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ color: "var(--tx2)", fontSize: ".875rem", textAlign: "center", padding: "1rem" }}>
                No tickets available for this event.
              </div>
            )}
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={() => { addToast(`Booked "${ev.title}" ✅`); setBookingSuccess(ev.title); closeModal(); }}>
              Confirm Booking
            </button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,rgba(232,162,48,.08) 0%,transparent 60%)", border: "1px solid var(--b1)", borderRadius: 16, padding: "2rem 2rem 1.8rem", marginBottom: "1.8rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", fontSize: "5rem", opacity: .12, pointerEvents: "none" }}>🎪</div>
        <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--amber)", marginBottom: ".6rem" }}>Browse Events</div>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, letterSpacing: "-.02em", marginBottom: ".5rem" }}>
          Discover <span style={{ color: "var(--amber)" }}>Events</span> Near You
        </h1>
        <p style={{ fontSize: ".875rem", color: "var(--tx2)", maxWidth: 480, lineHeight: 1.7 }}>
          Explore concerts, tech talks, food festivals and more — all in one place. Book instantly and manage everything from your dashboard.
        </p>
        {bookingSuccess && (
          <div style={{ marginTop: "1rem", background: "rgba(38,201,154,.1)", border: "1px solid rgba(38,201,154,.3)", borderRadius: 8, padding: "8px 14px", display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".82rem", color: "var(--teal)" }}>
            ✅ <strong>{bookingSuccess}</strong> booked! Check <em>My Bookings</em> for details.
          </div>
        )}
      </div>

      {/* Category filters */}
      <div className="filter-bar">
        {["All", "Music", "Tech", "Food", "Culture", "Sports", "Art"].map(f => (
          <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</span>
        ))}
      </div>

      {/* Event grid */}
      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-ico">🔍</div>
          <div className="empty-title">No events found</div>
          <div className="empty-sub">Try a different filter or search term.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {events.map(ev => {
            const ticket    = data.tickets.find(t => t.event === ev.title && t.status === "active");
            const price     = ticket?.price;
            const spotsLeft = ev.capacity - ev.sold;
            const cc        = CAT_COLORS[ev.category] || "#e8a230";
            return (
              <div key={ev.id} className="card"
                style={{ cursor: "pointer", transition: "transform .2s,border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ height: 120, background: `linear-gradient(135deg,${cc}18,${cc}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", position: "relative" }}>
                  🎪
                  <span className="badge" style={{ position: "absolute", top: 10, right: 10, background: cc + "22", color: cc, border: `1px solid ${cc}44` }}>{ev.category}</span>
                  {spotsLeft < 20 && <span className="badge b-rose" style={{ position: "absolute", top: 10, left: 10 }}>⚡ {spotsLeft} left</span>}
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "1rem", marginBottom: ".5rem", lineHeight: 1.3 }}>{ev.title}</div>
                  <div style={{ fontSize: ".76rem", color: "var(--tx2)", lineHeight: 1.9, marginBottom: ".8rem" }}>
                    📅 {ev.date} · {ev.time}<br />📍 {ev.venue}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: ".8rem", borderTop: "1px solid var(--b1)" }}>
                    <div>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--amber)" }}>
                        {price ? "Rs " + price.toLocaleString() : "—"}
                      </div>
                      <div style={{ fontSize: ".68rem", color: "var(--tx3)" }}>per person</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => openBook(ev)}>Book Now</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

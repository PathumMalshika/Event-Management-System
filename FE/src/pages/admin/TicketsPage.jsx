import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function TicketsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const tickets = data.tickets.filter(t =>
    t.event.toLowerCase().includes(searchQ.toLowerCase()) ||
    t.type.toLowerCase().includes(searchQ.toLowerCase())
  );

  const deleteTicket = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Ticket Type" body="This ticket type will be permanently removed." icon="🎟️"
        onConfirm={() => { setData(d => ({ ...d, tickets: d.tickets.filter(t => t.id !== id) })); addToast("Ticket deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = (ticket = null) => {
    let form = ticket
      ? { ...ticket }
      : { event: "", type: "Regular", price: 1000, qty: 100, status: "active" };

    const save = () => {
      if (!form.event) { addToast("Select an event.", "error"); return; }
      if (ticket) {
        setData(d => ({ ...d, tickets: d.tickets.map(t => t.id === ticket.id ? { ...t, ...form } : t) }));
        addToast("Ticket updated.");
      } else {
        setData(d => ({ ...d, tickets: [...d.tickets, { ...form, id: uid(), sold: 0 }] }));
        addToast("Ticket type created.");
      }
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">{ticket ? "Edit Ticket" : "Create Ticket Type"}</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg full">
                <label className="fl">Event</label>
                <select className="fs" defaultValue={form.event} onChange={e => form.event = e.target.value}>
                  <option value="">Select event</option>
                  {data.events.map(ev => <option key={ev.id}>{ev.title}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Ticket Type</label>
                <select className="fs" defaultValue={form.type} onChange={e => form.type = e.target.value}>
                  {["VIP", "Regular", "Student", "Early Bird", "Group"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="fg"><label className="fl">Price (Rs)</label><input className="fi" type="number" defaultValue={form.price} onChange={e => form.price = Number(e.target.value)} /></div>
              <div className="fg"><label className="fl">Quantity</label><input className="fi" type="number" defaultValue={form.qty} onChange={e => form.qty = Number(e.target.value)} /></div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" defaultValue={form.status} onChange={e => form.status = e.target.value}>
                  <option value="active">Active</option>
                  <option value="sold_out">Sold Out</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{ticket ? "Save Changes" : "Create Ticket"}</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Ticket Service" title="Tickets" sub="Manage ticket types, pricing and availability."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Create Ticket</button>}
      />

      <div className="stats-row">
        {[
          ["🎟️", "Total Types",    data.tickets.length],
          ["💰", "Total Revenue",  "Rs " + data.tickets.reduce((s, t) => s + t.price * t.sold, 0).toLocaleString()],
          ["✅", "Active",         data.tickets.filter(t => t.status === "active").length],
          ["🔴", "Sold Out",       data.tickets.filter(t => t.status === "sold_out").length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val" style={{ fontSize: lbl === "Total Revenue" ? "1.1rem" : "1.7rem" }}>{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><span className="card-head-title">All Ticket Types ({tickets.length})</span></div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead><tr><th>Event</th><th>Type</th><th>Price</th><th>Sold / Total</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {tickets.map(t => {
                const pct = Math.round(t.sold / t.qty * 100);
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 500, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.event}</td>
                    <td><span className="badge b-violet">{t.type}</span></td>
                    <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {t.price.toLocaleString()}</td>
                    <td>
                      <div style={{ minWidth: 80 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".7rem", color: "var(--tx2)", marginBottom: 3 }}>
                          <span>{t.sold}/{t.qty}</span><span>{pct}%</span>
                        </div>
                        <div className="prog-bar">
                          <div className="prog-fill" style={{ width: `${pct}%`, background: pct >= 100 ? "var(--rose)" : pct > 70 ? "var(--amber)" : "var(--teal)" }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {(t.price * t.sold).toLocaleString()}</td>
                    <td><span className={`badge ${statusBadge(t.status)}`}>{t.status.replace("_", " ")}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon edit" onClick={() => openForm(t)}>{Icons.edit}</button>
                        <button className="btn-icon del"  onClick={() => deleteTicket(t.id)}>{Icons.trash}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

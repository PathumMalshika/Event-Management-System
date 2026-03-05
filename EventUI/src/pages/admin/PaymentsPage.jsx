import { useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function PaymentsPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const [filter, setFilter] = useState("All");

  const payments = data.payments.filter(p =>
    (filter === "All" || p.status === filter) &&
    (p.user.toLowerCase().includes(searchQ.toLowerCase()) ||
     p.id.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const updateStatus = (id, status) => {
    setData(d => ({ ...d, payments: d.payments.map(p => p.id === id ? { ...p, status } : p) }));
    addToast(`Payment marked as ${status}.`);
  };

  const deletePayment = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Payment" body="Remove this failed/refunded payment record?" icon="💳"
        onConfirm={() => { setData(d => ({ ...d, payments: d.payments.filter(p => p.id !== id) })); addToast("Payment deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = () => {
    let form = { booking: "", user: "", amount: 0, method: "Card", status: "pending" };
    const save = () => {
      if (!form.booking || !form.user) { addToast("Booking and user required.", "error"); return; }
      const id = "PAY-" + String(uid()).padStart(3, "0");
      setData(d => ({ ...d, payments: [{ ...form, id, date: "Mar 2026" }, ...d.payments] }));
      addToast("Payment created.");
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">Record Payment</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg">
                <label className="fl">Booking ID</label>
                <select className="fs" onChange={e => {
                  form.booking = e.target.value;
                  const b = data.bookings.find(b => b.id === e.target.value);
                  if (b) { form.user = b.user; form.amount = b.total; }
                }}>
                  <option value="">Select booking</option>
                  {data.bookings.map(b => <option key={b.id}>{b.id}</option>)}
                </select>
              </div>
              <div className="fg"><label className="fl">Amount (Rs)</label><input className="fi" type="number" defaultValue={0} onChange={e => form.amount = Number(e.target.value)} /></div>
              <div className="fg">
                <label className="fl">Method</label>
                <select className="fs" onChange={e => form.method = e.target.value}>
                  {["Card", "Cash", "Online", "Bank Transfer"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" onChange={e => form.status = e.target.value}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Record Payment</button>
          </div>
        </>
      ),
    });
  };

  const totalRevenue = data.payments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <SvcHeader
        eyebrow="Payment Service" title="Payments" sub="Track payments, refunds and transaction history."
        action={<button className="btn btn-primary" onClick={openForm}>{Icons.plus} Record Payment</button>}
      />

      <div className="stats-row">
        {[
          ["💰", "Total Revenue", "Rs " + totalRevenue.toLocaleString()],
          ["✅", "Completed",     data.payments.filter(p => p.status === "completed").length],
          ["⏳", "Pending",       data.payments.filter(p => p.status === "pending").length],
          ["↩️", "Refunded",      data.payments.filter(p => p.status === "refunded").length],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val" style={{ fontSize: lbl === "Total Revenue" ? "1.1rem" : "1.7rem" }}>{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-head-title">Transaction History ({payments.length})</span>
          <div className="filter-bar" style={{ margin: 0 }}>
            {["All", "completed", "pending", "refunded"].map(f => (
              <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead><tr><th>Payment ID</th><th>Booking</th><th>User</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".78rem" }}>{p.id}</td>
                  <td style={{ fontFamily: "monospace", color: "var(--tx2)", fontSize: ".78rem" }}>{p.booking}</td>
                  <td style={{ fontWeight: 500 }}>{p.user}</td>
                  <td style={{ color: "var(--amber)", fontWeight: 600 }}>Rs {p.amount.toLocaleString()}</td>
                  <td><span className="badge b-blue">{p.method}</span></td>
                  <td style={{ color: "var(--tx2)" }}>{p.date}</td>
                  <td><span className={`badge ${statusBadge(p.status)}`}>{p.status}</span></td>
                  <td>
                    <div className="action-btns">
                      {p.status === "pending" && (
                        <button className="btn btn-sm" style={{ background: "var(--tg)", color: "var(--teal)", border: "1px solid rgba(38,201,154,.3)", padding: "4px 9px", fontSize: ".7rem" }}
                          onClick={() => updateStatus(p.id, "completed")}>Complete</button>
                      )}
                      {(p.status === "failed" || p.status === "refunded") && (
                        <button className="btn-icon del" onClick={() => deletePayment(p.id)}>{Icons.trash}</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

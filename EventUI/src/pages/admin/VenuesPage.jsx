import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function VenuesPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const venues = data.venues.filter(v =>
    v.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    v.city.toLowerCase().includes(searchQ.toLowerCase())
  );

  const deleteVenue = (id) => openModal({
    content: (
      <ConfirmDialog title="Remove Venue" body="This venue will be permanently removed." icon="📍"
        onConfirm={() => { setData(d => ({ ...d, venues: d.venues.filter(v => v.id !== id) })); addToast("Venue removed.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = (venue = null) => {
    let form = venue
      ? { ...venue }
      : { name: "", city: "", capacity: 100, type: "Indoor", status: "available", contact: "" };

    const save = () => {
      if (!form.name || !form.city) { addToast("Name and city required.", "error"); return; }
      if (venue) {
        setData(d => ({ ...d, venues: d.venues.map(v => v.id === venue.id ? { ...v, ...form } : v) }));
        addToast("Venue updated.");
      } else {
        setData(d => ({ ...d, venues: [...d.venues, { ...form, id: uid() }] }));
        addToast("Venue added.");
      }
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">{venue ? "Edit Venue" : "Add Venue"}</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg full"><label className="fl">Venue Name</label><input className="fi" defaultValue={form.name} onChange={e => form.name = e.target.value} placeholder="e.g. BMICH" /></div>
              <div className="fg"><label className="fl">City</label><input className="fi" defaultValue={form.city} onChange={e => form.city = e.target.value} placeholder="Colombo" /></div>
              <div className="fg"><label className="fl">Capacity</label><input className="fi" type="number" defaultValue={form.capacity} onChange={e => form.capacity = Number(e.target.value)} /></div>
              <div className="fg">
                <label className="fl">Type</label>
                <select className="fs" defaultValue={form.type} onChange={e => form.type = e.target.value}>
                  {["Indoor", "Outdoor", "Gallery", "Stadium", "Conference"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" defaultValue={form.status} onChange={e => form.status = e.target.value}>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="fg"><label className="fl">Contact Email</label><input className="fi" defaultValue={form.contact} onChange={e => form.contact = e.target.value} placeholder="contact@venue.com" /></div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{venue ? "Save Changes" : "Add Venue"}</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Venue Service" title="Venues" sub="Manage event locations and their availability."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Add Venue</button>}
      />

      <div className="stats-row">
        {[
          ["📍", "Total",        data.venues.length],
          ["✅", "Available",    data.venues.filter(v => v.status === "available").length],
          ["📅", "Booked",       data.venues.filter(v => v.status === "booked").length],
          ["🏟️", "Max Capacity", Math.max(...data.venues.map(v => v.capacity)).toLocaleString()],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div><div className="st-val">{val}</div><div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><span className="card-head-title">All Venues ({venues.length})</span></div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead><tr><th>Venue</th><th>City</th><th>Type</th><th>Capacity</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {venues.map(v => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 500 }}>📍 {v.name}</td>
                  <td style={{ color: "var(--tx2)" }}>{v.city}</td>
                  <td><span className="badge b-blue">{v.type}</span></td>
                  <td>{v.capacity.toLocaleString()}</td>
                  <td style={{ color: "var(--tx2)", fontSize: ".78rem" }}>{v.contact}</td>
                  <td><span className={`badge ${statusBadge(v.status)}`}>{v.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon edit" onClick={() => openForm(v)}>{Icons.edit}</button>
                      <button className="btn-icon del"  onClick={() => deleteVenue(v.id)}>{Icons.trash}</button>
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

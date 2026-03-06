import { useEffect, useState } from "react";
import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import venueService from "../../services/venueService";

export default function VenuesPage({ addToast, openModal, closeModal, searchQ }) {
  const [venues, setVenues] = useState([]);

  // Fetch all venues from backend
  const fetchVenues = () => {
    venueService.getAll()
      .then(data => setVenues(data))
      .catch(() => addToast("Failed to load venues", "error"));
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const deleteVenue = (id) => openModal({
    content: (
      <ConfirmDialog
        title="Remove Venue"
        body="This venue will be permanently removed."
        icon="📍"
        onConfirm={() => {
          venueService.remove(id)
            .then(() => {
              setVenues(vs => vs.filter(v => v.id !== id));
              addToast("Venue removed.", "info");
              closeModal();
            })
            .catch(() => addToast("Failed to remove venue", "error"));
        }}
        onCancel={closeModal}
      />
    )
  });

  const openForm = (venue = null) => {
    let form = venue
      ? { ...venue }
      : { name: "", city: "", capacity: 100, type: "Indoor", status: "available", contact: "" };

    const save = () => {
      if (!form.name || !form.city) {
        addToast("Name and city required.", "error");
        return;
      }

      const action = venue
        ? venueService.update(venue.id, form)
        : venueService.add(form);

      action
        .then(() => {
          fetchVenues(); // refresh list
          addToast(venue ? "Venue updated." : "Venue added.");
          closeModal();
        })
        .catch(() => addToast(venue ? "Failed to update venue" : "Failed to add venue", "error"));
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
              <div className="fg full">
                <label className="fl">Venue Name</label>
                <input className="fi" defaultValue={form.name} onChange={e => form.name = e.target.value} placeholder="e.g. BMICH" />
              </div>
              <div className="fg">
                <label className="fl">City</label>
                <input className="fi" defaultValue={form.city} onChange={e => form.city = e.target.value} placeholder="Colombo" />
              </div>
              <div className="fg">
                <label className="fl">Capacity</label>
                <input className="fi" type="number" defaultValue={form.capacity} onChange={e => form.capacity = Number(e.target.value)} />
              </div>
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
              <div className="fg">
                <label className="fl">Contact Email</label>
                <input className="fi" defaultValue={form.contact} onChange={e => form.contact = e.target.value} placeholder="contact@venue.com" />
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{venue ? "Save Changes" : "Add Venue"}</button>
          </div>
        </>
      )
    });
  };

  const filteredVenues = venues.filter(v =>
    v.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    v.city.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <SvcHeader
        eyebrow="Venue Service"
        title="Venues"
        sub="Manage event locations and their availability."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Add Venue</button>}
      />

      <div className="stats-row">
        {[
          ["📍", "Total", filteredVenues.length],
          ["✅", "Available", filteredVenues.filter(v => v.status === "available").length],
          ["📅", "Booked", filteredVenues.filter(v => v.status === "booked").length],
          ["🏟️", "Max Capacity", Math.max(...filteredVenues.map(v => v.capacity || 0)).toLocaleString()],
        ].map(([ico, lbl, val]) => (
          <div key={lbl} className="stat-tile">
            <div className="st-icon">{ico}</div>
            <div className="st-val">{val}</div>
            <div className="st-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><span className="card-head-title">All Venues ({filteredVenues.length})</span></div>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr><th>Venue</th><th>City</th><th>Type</th><th>Capacity</th><th>Contact</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredVenues.map(v => (
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
                      <button className="btn-icon del" onClick={() => deleteVenue(v.id)}>{Icons.trash}</button>
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